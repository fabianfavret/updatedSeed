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
var TangerineService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TangerineService = exports.TANGERINE_URL = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
const defatul_service_1 = require("../../defaults/defatul.service");
const utils_service_1 = require("../../utils/utils.service");
var TANGERINE_URL;
(function (TANGERINE_URL) {
    TANGERINE_URL["GET_SCHOOL"] = "/schools";
    TANGERINE_URL["POST_SCHOOL"] = "/schools";
    TANGERINE_URL["GET_DISCIPLINE"] = "/disciplines";
    TANGERINE_URL["GET_USER"] = "/users";
    TANGERINE_URL["POST_USER"] = "/users";
    TANGERINE_URL["PUT_USER"] = "/users/{guid}";
    TANGERINE_URL["DELETE_USER"] = "/users/{guid}";
    TANGERINE_URL["GET_LICENSE_SCHOOL"] = "/licenses/schools";
    TANGERINE_URL["POST_LICENSE_SCHOOL"] = "/licenses/schools";
    TANGERINE_URL["PUT_LICENSE_SCHOOL"] = "/licenses/schools/{guid}";
    TANGERINE_URL["GET_SCHOOL_USER"] = "schools/{guid}/users";
    TANGERINE_URL["POST_SCHOOL_USER"] = "/schools/{guid}/users";
    TANGERINE_URL["POST_SCHOOL_GROUP_USERS"] = "/front/school-admin/{schoolGuid}/groups/{groupGuid}/users";
    TANGERINE_URL["DELETE_SCHOOL_GROUP_USERS"] = "/front/school-admin/{schoolGuid}/groups/{groupGuid}/users";
    TANGERINE_URL["GET_EDUCATION_YEAR"] = "/education-years";
    TANGERINE_URL["GET_SCHOOL_GROUP"] = "/front/school-admin/{guid}/groups";
    TANGERINE_URL["POST_SCHOOL_GROUP"] = "/front/school-admin/{guid}/groups";
    TANGERINE_URL["PUT_SCHOOL_GROUP"] = "/front/school-admin/{guid}/groups";
    TANGERINE_URL["DELETE_SCHOOL_GROUP"] = "/front/school-admin/{guid}/groups";
    TANGERINE_URL["POST_LINK_USERS_COURSE"] = "/front/courses/{courseGuid}/users";
    TANGERINE_URL["DELETE_LINK_USERS_COURSE"] = "/front/courses/{courseGuid}/users";
    TANGERINE_URL["PUT_OWNER_USERS_COURSE"] = "/front/courses/{courseGuid}/users/owner";
    TANGERINE_URL["POST_COURSE"] = "/front/courses";
    TANGERINE_URL["GET_COURSE"] = "/lms/courses";
    TANGERINE_URL["DELETE_COURSE"] = "/lms/courses/{guid}";
    TANGERINE_URL["POST_COURSE_USER"] = "/front/courses/{courseGuid}/users";
    TANGERINE_URL["GET_COURSE_USER"] = "/front/courses/{courseGuid}/users";
})(TANGERINE_URL = exports.TANGERINE_URL || (exports.TANGERINE_URL = {}));
let TangerineService = TangerineService_1 = class TangerineService extends defatul_service_1.DefaultService {
    constructor() {
        super(TangerineService_1);
    }
    _getAxiosConfig() {
        return {
            headers: {
                'x-api-key': this.config.get('API_KEY_TANGERINE')
            }
        };
    }
    async get(params) {
        const fullURL = this.utils.getFullURL({ baseURL: this.config.get('API_URL_TANGERINE'), url: params.url, path: params.path, query: params.query });
        this.logger.log(`GET ${fullURL}`);
        const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.get(fullURL, this._getAxiosConfig()).pipe((0, rxjs_1.catchError)((error) => {
            var _a;
            this.logger.debug(((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || JSON.stringify(error));
            throw { status: 500, message: `${TangerineService_1.name}(get):${error.message}` };
        })));
        return data.data;
    }
    async post(params) {
        const fullURL = this.utils.getFullURL({ baseURL: this.config.get('API_URL_TANGERINE'), url: params.url, path: params.path });
        this.logger.log(`POST ${fullURL}`);
        const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.post(fullURL, params.payload, this._getAxiosConfig()).pipe((0, rxjs_1.catchError)((error) => {
            var _a;
            this.logger.debug(((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || JSON.stringify(error));
            throw { status: 500, message: `${TangerineService_1.name}(post):${error.message}` };
        })));
        return data;
    }
    async put(params) {
        const fullURL = this.utils.getFullURL({ baseURL: this.config.get('API_URL_TANGERINE'), url: params.url, path: params.path });
        this.logger.log(`PUT ${fullURL}`);
        const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.put(fullURL, params.payload, this._getAxiosConfig()).pipe((0, rxjs_1.catchError)((error) => {
            var _a;
            this.logger.debug(((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || JSON.stringify(error));
            throw { status: 500, message: `${TangerineService_1.name}(put):${error.message}` };
        })));
        return data;
    }
    async delete(params) {
        const fullURL = this.utils.getFullURL({ baseURL: this.config.get('API_URL_TANGERINE'), url: params.url, path: params.path });
        this.logger.log(`DELETE ${fullURL}`);
        const config = this._getAxiosConfig();
        if (params.payload) {
            config.data = params.payload;
        }
        const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.delete(fullURL, config).pipe((0, rxjs_1.catchError)((error) => {
            var _a;
            this.logger.debug(((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || JSON.stringify(error));
            throw { status: 500, message: `${TangerineService_1.name}(delete):${error.message}` };
        })));
        return data;
    }
};
__decorate([
    (0, common_1.Inject)(config_1.ConfigService),
    __metadata("design:type", config_1.ConfigService)
], TangerineService.prototype, "config", void 0);
__decorate([
    (0, common_1.Inject)(axios_1.HttpService),
    __metadata("design:type", axios_1.HttpService)
], TangerineService.prototype, "httpService", void 0);
__decorate([
    (0, common_1.Inject)(utils_service_1.UtilsService),
    __metadata("design:type", utils_service_1.UtilsService)
], TangerineService.prototype, "utils", void 0);
TangerineService = TangerineService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], TangerineService);
exports.TangerineService = TangerineService;
//# sourceMappingURL=tangerine.service.js.map