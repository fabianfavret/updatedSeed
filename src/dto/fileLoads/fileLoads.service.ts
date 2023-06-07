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

  async processExcelFile(token?: string): Promise<any[]> {
    try {
      //const dataJSON = [];
      const directoryPath = 'excel';
      const outputFilePath = `${directoryPath}/salida.txt`;

      const files = fs.readdirSync(directoryPath);
      for (const file of files) {
        this.logger.debug('file ---- ', file);
        const dataJSON = [];
        let concatenatedString = '';
        if (file.endsWith('.xlsx')) {
          const filePath = `${directoryPath}/${file}`;

          const sheetName = 'Seeds';

          const workbook = xlsx.readFile(filePath); // Leer el archivo Excel

          const columnName = 'JSON'; //  nombre de la columna a leer
          const xmlRowObject = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]); // Lee los datos de la hoja y convierte a un arreglo de objetos

          for (const row of xmlRowObject) {
            dataJSON.push({ id: JSON.parse(row[columnName]).id, data: row[columnName] });
            this.logger.debug('row----- ', row['Outcome']);
          }
        }

        for (const row of dataJSON) {
          const seedData = await this.get({
            url: 'seeds/',
            query: {
              pageSize: '1000',
              offset: '0',
              jsonID: row.id,
              orderBy: 'guid',
              orderType: 'ASC'
            },
            accessToken: token
          });

          if (seedData.count > 0) {
            //actualizar la semilla
            for (const seed of seedData.loSeed) {
              this.logger.debug('seed----- ', seed.guid);
              concatenatedString += seed.guid + '\n';

              const resul = await this.patch({ url: 'seeds/{seedGuid}', path: { seedGuid: seed.guid }, payload: { data: seed.data }, accessToken: token });
            }
          } else {
            //crear la semilla
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

  async post(params: { url: string; path?: any; payload?: any }): Promise<any> {
    const fullURL = this.getFullURL({ baseURL: this.editorURL, url: params.url, path: params.path });
    //this.logger.log(`POST ${fullURL}`);

    const { data } = await firstValueFrom(
      this.httpService.post<any>(fullURL, params.payload, this._getAxiosConfig()).pipe(
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
