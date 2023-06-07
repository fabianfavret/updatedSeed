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
var SchoolYearService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolYearService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const defatul_service_1 = require("../../../defaults/defatul.service");
const tangerine_service_1 = require("../../../services/tangerine/tangerine.service");
const utils_service_1 = require("../../../utils/utils.service");
let SchoolYearService = SchoolYearService_1 = class SchoolYearService extends defatul_service_1.DefaultService {
    constructor() {
        super(SchoolYearService_1);
    }
    async _create(params) {
        try {
            this.logger.debug(`_create: ${params.schoolYear.codigo}`);
            if (!params.noCheck) {
                const getSchoolYear = await this.tangerineService.get({
                    url: tangerine_service_1.TANGERINE_URL.GET_LICENSE_SCHOOL,
                    query: {
                        guid: params.schoolYear.codigo,
                        school_guid: params.schoolGuid
                    }
                });
                if (getSchoolYear.length) {
                    return await this._update({ schoolYear: params.schoolYear, schoolGuid: params.schoolGuid, noCheck: true });
                }
            }
            this.logger.debug(`Crea SchoolYear: ${params.schoolYear.codigo}`);
            await this.tangerineService.post({
                url: tangerine_service_1.TANGERINE_URL.POST_LICENSE_SCHOOL,
                payload: {
                    guid: params.schoolYear.codigo,
                    name: params.schoolYear.titulo,
                    school_year: params.schoolYear.titulo,
                    expired_at: this.utilsService.getYYYYMMDDDateFormat(new Date(params.schoolYear.fim), false),
                    is_active: params.schoolYear.status === 'inactive' ? 0 : 1,
                    school_guid: params.schoolGuid,
                    school_year_guid: params.schoolYear.codigo,
                    creator_guid: this.config.get('CREATOR_GUID')
                }
            });
        }
        catch (error) {
            throw new Error(`[_create]:${error.message}`);
        }
    }
    async _update(params) {
        try {
            this.logger.debug(`_update: ${params.schoolYear.codigo}`);
            if (!params.noCheck) {
                const getSchoolYear = await this.tangerineService.get({
                    url: tangerine_service_1.TANGERINE_URL.GET_LICENSE_SCHOOL,
                    query: {
                        guid: params.schoolYear.codigo,
                        school_guid: params.schoolGuid
                    }
                });
                if (!getSchoolYear.length) {
                    return await this._create({ schoolYear: params.schoolYear, schoolGuid: params.schoolGuid, noCheck: true });
                }
            }
            this.logger.debug(`Update schoolYear: ${params.schoolYear.codigo}`);
            await this.tangerineService.put({
                url: tangerine_service_1.TANGERINE_URL.PUT_LICENSE_SCHOOL,
                path: { guid: params.schoolYear.codigo },
                payload: {
                    name: params.schoolYear.titulo,
                    expired_at: this.utilsService.getYYYYMMDDDateFormat(new Date(params.schoolYear.fim), false),
                    is_active: params.schoolYear.status === 'inactive' ? 0 : 1
                }
            });
        }
        catch (error) {
            throw new Error(`[_update]:${error.message}`);
        }
    }
    async sync(params) {
        try {
            const response = {
                insert: 0,
                update: 0,
                delete: 0
            };
            for (const event of params.events) {
                switch (event.operacao) {
                    case 'insert':
                        await this._create({ schoolYear: event.obj, schoolGuid: params.schoolGuid });
                        response.insert++;
                        break;
                    case 'update':
                        await this._update({ schoolYear: event.obj, schoolGuid: params.schoolGuid });
                        response.update++;
                        break;
                    case 'delete':
                        response.delete++;
                        break;
                }
            }
            return response;
        }
        catch (error) {
            throw new Error(`${SchoolYearService_1.name}(sync):${error.message}`);
        }
    }
};
__decorate([
    (0, common_1.Inject)(tangerine_service_1.TangerineService),
    __metadata("design:type", tangerine_service_1.TangerineService)
], SchoolYearService.prototype, "tangerineService", void 0);
__decorate([
    (0, common_1.Inject)(utils_service_1.UtilsService),
    __metadata("design:type", utils_service_1.UtilsService)
], SchoolYearService.prototype, "utilsService", void 0);
__decorate([
    (0, common_1.Inject)(config_1.ConfigService),
    __metadata("design:type", config_1.ConfigService)
], SchoolYearService.prototype, "config", void 0);
SchoolYearService = SchoolYearService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SchoolYearService);
exports.SchoolYearService = SchoolYearService;
//# sourceMappingURL=school-year.service.js.map