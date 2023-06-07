import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { AxiosError, AxiosRequestConfig } from 'axios';
import * as fs from 'fs';
import { catchError, firstValueFrom } from 'rxjs';
import * as xlsx from 'xlsx';

@Injectable()
export class FileLoadsService {
  private readonly logger = new Logger(FileLoadsService.name);
  @Inject(HttpService)
  private readonly httpService: HttpService;

  private readonly editorURL = 'http://localhost:3000/api/';
  // private readonly editorURL = 'https://editor-backoffice.tangerine-dev.oneclicklabs.es/api/';

  async processExcelFile(params: {
    query: { educationYearGuid?: string; educationDisciplineGuid?: string; langCode?: string; responsible?: string };
    token?: string;
  }): Promise<any[]> {
    try {
      params.query.educationDisciplineGuid = '09d34c20-71b9-475e-b42d-d677883700e9';

      //const dataJSON = [];
      const directoryPath = 'excel';
      const outputFilePath = `${directoryPath}/salida.txt`;

      const files = fs.readdirSync(directoryPath);
      for (const file of files) {
        this.logger.debug('file ---- ', file);
        // const dataJSON = [];
        let concatenatedString = '';
        if (file.endsWith('.xlsx')) {
          const filePath = `${directoryPath}/${file}`;

          const sheetName = 'Seeds';

          const workbook = xlsx.readFile(filePath); // Leer el archivo Excel

          // const columnName = 'JSON'; //  nombre de la columna a leer
          const xmlRowObject = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]); // Lee los datos de la hoja y convierte a un arreglo de objetos

          for (const row of xmlRowObject) {
            // dataJSON.push({ id: JSON.parse(row[columnName]).id, data: row[columnName] });
            await _update({
              $this: this,
              token: params.token,
              query: params.query,
              id: row['ID con idioma'],
              name: row['ID con idioma'],
              data: row['JSON'],
              node: row['ID'],
              phase: String(row['Proceso']).toLowerCase()
            });
            this.logger.debug(`row----- ${row['ID con idioma']}`);
          }
        }

        async function _update(params: {
          $this: FileLoadsService;
          token: string;
          query: {
            educationYearGuid?: string;
            educationDisciplineGuid?: string;
            langCode?: string;
            responsible?: string;
          };
          id: string;
          name: string;
          data: string;
          node: string;
          phase: string;
        }) {
          const seedData = await params.$this.get({
            url: 'seeds/',
            query: {
              pageSize: '1000',
              offset: '0',
              jsonID: params.id,
              orderBy: 'guid',
              orderType: 'ASC'
            },
            accessToken: params.token
          });

          if (seedData.count > 0) {
            //actualizar la semilla
            for (const seed of seedData.loSeed) {
              concatenatedString += seed.guid + '\n';

              const guids = String(seed.guid).split('_');

              let update = false;
              switch (params.query.langCode) {
                case 'PT':
                  update = guids[0].indexOf('ES') < 0 && guids[0].indexOf('EN') < 0;
                  break;
                case 'ES':
                  update = guids[0].indexOf('ES') > -1;
                  break;
                case 'EN':
                  update = guids[0].indexOf('EN') > -1;
                  break;
              }

              if (update) {
                params.$this.logger.debug(`UPDATE seed----- ${seed.guid}`);
                await params.$this.patch({
                  url: 'seeds/{seedGuid}',
                  path: { seedGuid: seed.guid },
                  payload: { name: params.name, data: params.data },
                  accessToken: params.token
                });
              }
            }
          } else {
            const payload = {
              name: params.name,
              data: params.data,
              status: 'done',
              educationYearGuid: params.query.educationYearGuid,
              educationDisciplineGuid: params.query.educationDisciplineGuid,
              responsible: params.query.responsible,
              langCode: params.query.langCode
            };
            //crear la semilla
            const nodes = await params.$this.get({ url: `nodes`, query: { search: `_${params.id}` }, accessToken: params.token });
            if (nodes.count) {
              for (const node of nodes.nodes) {
                params.$this.logger.debug(`NEW seed----- ${node.guid}`);
                await params.$this.post({
                  url: 'seeds',
                  payload: {
                    ...payload,
                    nodeGuid: node.guid,
                    phase: params.phase
                  },
                  accessToken: params.token
                });
              }
            } else {
              params.$this.logger.debug(`NEW seed-----`);
              await params.$this.post({
                url: 'seeds',
                payload: payload,
                accessToken: params.token
              });
            }
            //buscar LO like
          }
        }

        fs.writeFile(outputFilePath, concatenatedString, (error) => {
          if (error) {
            throw new Error(error.message);
          }
        });
      }

      return null;
    } catch (error) {
      throw new Error(error);
    }
  }

  private _getAxiosConfig(accessToken?: string): AxiosRequestConfig {
    return {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    };
  }

  async get(params: { url: string; path?: any; query?: any; accessToken?: string }): Promise<any> {
    const fullURL = this.getFullURL({ baseURL: this.editorURL, url: params.url, path: params.path, query: params.query });

    //this.logger.log(`GET ${fullURL}`);

    const { data } = await firstValueFrom(
      this.httpService.get<any>(fullURL, this._getAxiosConfig(params.accessToken)).pipe(
        catchError((error: AxiosError) => {
          this.logger.debug(error.response?.data || JSON.stringify(error));
          throw { status: 500, message: `${FileLoadsService.name}(get):${error.message}` };
        })
      )
    );

    return data.data;
  }

  async post(params: { url: string; path?: any; payload?: any; accessToken?: string }): Promise<any> {
    const fullURL = this.getFullURL({ baseURL: this.editorURL, url: params.url, path: params.path });
    //this.logger.log(`POST ${fullURL}`);

    const { data } = await firstValueFrom(
      this.httpService.post<any>(fullURL, params.payload, this._getAxiosConfig(params.accessToken)).pipe(
        catchError((error: AxiosError) => {
          this.logger.debug(error.response?.data || JSON.stringify(error));
          throw { status: 500, message: `${FileLoadsService.name}(post):${error.message}` };
        })
      )
    );
    return data;
  }

  async patch(params: { url: string; path?: any; payload?: any; accessToken?: string }) {
    const fullURL = this.getFullURL({ baseURL: this.editorURL, url: params.url, path: params.path });
    // this.logger.log(`patch ${fullURL}`);

    const { data } = await firstValueFrom(
      this.httpService.patch<any>(fullURL, params.payload, this._getAxiosConfig(params.accessToken)).pipe(
        catchError((error: AxiosError) => {
          this.logger.debug(error.response?.data || JSON.stringify(error));
          throw { status: 500, message: `${FileLoadsService.name}(put):${error.message}` };
        })
      )
    );
    return data;
  }

  getFullURL(params: { baseURL: string; url: string; path?: any; query?: any }): string {
    let path = params.url.toString();
    if (params.path) {
      Object.keys(params.path).forEach((key) => {
        path = params.url.toString().replace(`{${key}}`, params.path[key]);
      });
    }
    //this.logger.debug('path----', path);
    const query = [];
    if (params.query) {
      Object.keys(params.query).forEach((key) => {
        query.push(`${key}=${encodeURIComponent(params.query[key])}`);
      });
    }

    return params.baseURL + path + (query.length ? `?${query.join('&')}` : '');
  }
}
