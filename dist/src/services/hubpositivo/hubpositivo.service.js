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
var HubPositivoService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HubPositivoService = exports.HUBPOSITIVO_URL = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
const defatul_service_1 = require("../../defaults/defatul.service");
const utils_service_1 = require("../../utils/utils.service");
var HUBPOSITIVO_URL;
(function (HUBPOSITIVO_URL) {
    HUBPOSITIVO_URL["GET_SCHOOL"] = "/data/schools";
    HUBPOSITIVO_URL["GET_SCHOOL_EVENT"] = "/data/{org_id}";
})(HUBPOSITIVO_URL = exports.HUBPOSITIVO_URL || (exports.HUBPOSITIVO_URL = {}));
let HubPositivoService = HubPositivoService_1 = class HubPositivoService extends defatul_service_1.DefaultService {
    constructor() {
        super(HubPositivoService_1);
    }
    _getAxiosConfig() {
        return {
            headers: { 'x-api-key': this.config.get('API_KEY_HUB') }
        };
    }
    async get(params) {
        const fullURL = this.utils.getFullURL({ baseURL: this.config.get('API_URL_HUB'), url: params.url, path: params.path, query: params.query });
        this.logger.log(fullURL);
        const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.get(fullURL, this._getAxiosConfig()).pipe((0, rxjs_1.catchError)((error) => {
            var _a;
            this.logger.debug(((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || JSON.stringify(error));
            throw { status: 500, message: `${HubPositivoService_1.name}(get):${error.message}` };
        })));
        return data;
    }
};
__decorate([
    (0, common_1.Inject)(config_1.ConfigService),
    __metadata("design:type", config_1.ConfigService)
], HubPositivoService.prototype, "config", void 0);
__decorate([
    (0, common_1.Inject)(axios_1.HttpService),
    __metadata("design:type", axios_1.HttpService)
], HubPositivoService.prototype, "httpService", void 0);
__decorate([
    (0, common_1.Inject)(utils_service_1.UtilsService),
    __metadata("design:type", utils_service_1.UtilsService)
], HubPositivoService.prototype, "utils", void 0);
HubPositivoService = HubPositivoService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], HubPositivoService);
exports.HubPositivoService = HubPositivoService;
//# sourceMappingURL=hubpositivo.service.js.map