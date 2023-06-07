"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var FileLoadsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileLoadsService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const fs = require("fs");
const rxjs_1 = require("rxjs");
const xlsx = require("xlsx");
let FileLoadsService = FileLoadsService_1 = class FileLoadsService {
    constructor() {
        this.logger = new common_1.Logger(FileLoadsService_1.name);
        this.editorURL = 'http://localhost:3000/api/';
    }
    async processExcelFile(token) {
        try {
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
                    const workbook = xlsx.readFile(filePath);
                    const columnName = 'JSON';
                    const xmlRowObject = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
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
                        for (const seed of seedData.loSeed) {
                            this.logger.debug('seed----- ', seed.guid);
                            concatenatedString += seed.guid + '\n';
                            const resul = await this.patch({ url: 'seeds/{seedGuid}', path: { seedGuid: seed.guid }, payload: { data: seed.data }, accessToken: token });
                        }
                    }
                    else {
                    }
                }
                fs.writeFile(outputFilePath, concatenatedString, (error) => {
                    if (error) {
                        throw new Error(error.message);
                    }
                });
            }
            return null;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    _getAxiosConfig(accessToken) {
        return {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            }
        };
    }
    async get(params) {
        const fullURL = this.getFullURL({ baseURL: this.editorURL, url: params.url, path: params.path, query: params.query });
        const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.get(fullURL, this._getAxiosConfig(params.accessToken)).pipe((0, rxjs_1.catchError)((error) => {
            var _a;
            this.logger.debug(((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || JSON.stringify(error));
            throw { status: 500, message: `${FileLoadsService_1.name}(get):${error.message}` };
        })));
        return data.data;
    }
    async post(params) {
        const fullURL = this.getFullURL({ baseURL: this.editorURL, url: params.url, path: params.path });
        const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.post(fullURL, params.payload, this._getAxiosConfig()).pipe((0, rxjs_1.catchError)((error) => {
            var _a;
            this.logger.debug(((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || JSON.stringify(error));
            throw { status: 500, message: `${FileLoadsService_1.name}(post):${error.message}` };
        })));
        return data;
    }
    async patch(params) {
        const fullURL = this.getFullURL({ baseURL: this.editorURL, url: params.url, path: params.path });
        const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.patch(fullURL, params.payload, this._getAxiosConfig(params.accessToken)).pipe((0, rxjs_1.catchError)((error) => {
            var _a;
            this.logger.debug(((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || JSON.stringify(error));
            throw { status: 500, message: `${FileLoadsService_1.name}(put):${error.message}` };
        })));
        return data;
    }
    getFullURL(params) {
        let path = params.url.toString();
        if (params.path) {
            Object.keys(params.path).forEach((key) => {
                path = params.url.toString().replace(`{${key}}`, params.path[key]);
            });
        }
        const query = [];
        if (params.query) {
            Object.keys(params.query).forEach((key) => {
                query.push(`${key}=${encodeURIComponent(params.query[key])}`);
            });
        }
        return params.baseURL + path + (query.length ? `?${query.join('&')}` : '');
    }
};
__decorate([
    (0, common_1.Inject)(axios_1.HttpService),
    __metadata("design:type", axios_1.HttpService)
], FileLoadsService.prototype, "httpService", void 0);
FileLoadsService = FileLoadsService_1 = __decorate([
    (0, common_1.Injectable)()
], FileLoadsService);
exports.FileLoadsService = FileLoadsService;
//# sourceMappingURL=fileLoads.service.js.map