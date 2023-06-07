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
var SchoolGroupService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolGroupService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const defatul_service_1 = require("../../../defaults/defatul.service");
const group_entity_1 = require("../../../entities/group.entity");
const tangerine_service_1 = require("../../../services/tangerine/tangerine.service");
const typeorm_2 = require("typeorm");
let SchoolGroupService = SchoolGroupService_1 = class SchoolGroupService extends defatul_service_1.DefaultService {
    constructor() {
        super(SchoolGroupService_1);
    }
    async _create(params) {
        try {
            this.logger.debug(`_create: ${params.schoolGroup.id}`);
            if (!params.noCheck) {
                const group = await this.groupRepository.findOne({ where: { guid: params.schoolGroup.id } });
                if (group) {
                    return this._update({ schoolGroup: params.schoolGroup, schoolGuid: params.schoolGuid, noCheck: false });
                }
            }
            this.logger.debug(`Create SchoolGroup: ${params.schoolGroup.id}`);
            const getEducationYears = await this.tangerineService.get({
                url: tangerine_service_1.TANGERINE_URL.GET_EDUCATION_YEAR,
                query: { 'year[]': params.schoolGroup.nome_serie }
            });
            if (!getEducationYears.length) {
                throw new Error(`[_create]:EducationYear NOT_EXIST`);
            }
            await this.tangerineService.post({
                url: tangerine_service_1.TANGERINE_URL.POST_SCHOOL_GROUP,
                path: { guid: params.schoolGuid },
                payload: {
                    guid: params.schoolGroup.id,
                    name: params.schoolGroup.nome_turma,
                    is_active: 1,
                    school_year_guid: params.schoolGroup.codigo_periodo,
                    education_year_guid: getEducationYears[0].guid
                }
            });
            await this.groupRepository.save({
                guid: params.schoolGroup.id,
                periodoGuid: params.schoolGroup.codigo_periodo,
                educationYearGuid: getEducationYears[0].guid,
                name: params.schoolGroup.nome_turma
            });
        }
        catch (error) {
            throw new Error(`[_create]:${error.message}`);
        }
    }
    async _update(params) {
        try {
            this.logger.debug(`_update: ${params.schoolGroup.id}`);
            if (!params.noCheck) {
                const group = await this.groupRepository.findOne({ where: { guid: params.schoolGroup.id } });
                if (!group) {
                    return await this._create({ schoolGroup: params.schoolGroup, schoolGuid: params.schoolGuid, noCheck: true });
                }
            }
            this.logger.debug(`Update SchoolGroup: ${params.schoolGroup.id}`);
            const getEducationYears = await this.tangerineService.get({
                url: tangerine_service_1.TANGERINE_URL.GET_EDUCATION_YEAR,
                query: { 'year[]': params.schoolGroup.nome_serie }
            });
            if (!getEducationYears.length) {
                throw new Error(`[_update]:EducationYear NOT_EXIST`);
            }
            await this.tangerineService.put({
                url: tangerine_service_1.TANGERINE_URL.PUT_SCHOOL_GROUP,
                path: { guid: params.schoolGuid },
                payload: {
                    guid: [params.schoolGroup.id],
                    data: {
                        name: params.schoolGroup.nome_turma,
                        education_year_guid: getEducationYears[0].guid,
                        school_year_guid: params.schoolGroup.codigo_periodo
                    }
                }
            });
            await this.groupRepository.update({ guid: params.schoolGroup.id }, { periodoGuid: params.schoolGroup.codigo_periodo, educationYearGuid: getEducationYears[0].guid, name: params.schoolGroup.nome_turma });
        }
        catch (error) {
            throw new Error(`[update]:${error.message}`);
        }
    }
    async _delete(params) {
        try {
            this.logger.debug(`_delete: ${params.schoolGroup.id}`);
            const group = await this.groupRepository.findOne({ where: { guid: params.schoolGroup.id } });
            if (!group) {
                return this.logger.log(`Discard Delete Group: ${params.schoolGroup.id}`);
            }
            this.logger.debug('Borrando SCHOOL GROUP');
            this.tangerineService.delete({
                url: tangerine_service_1.TANGERINE_URL.DELETE_SCHOOL_GROUP,
                path: { guid: params.schoolGuid },
                payload: { guid: [params.schoolGroup.id] }
            });
        }
        catch (error) {
            throw new Error(`[delete]:${error.message}`);
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
                        await this._create({ schoolGroup: event.obj, schoolGuid: params.schoolGuid });
                        response.insert++;
                        break;
                    case 'update':
                        await this._update({ schoolGroup: event.obj, schoolGuid: params.schoolGuid });
                        response.update++;
                        break;
                    case 'delete':
                        await this._delete({ schoolGroup: event.obj, schoolGuid: params.schoolGuid });
                        response.delete++;
                        break;
                }
            }
            return response;
        }
        catch (error) {
            throw new Error(`${SchoolGroupService_1.name}(sync):${error.message}`);
        }
    }
};
__decorate([
    (0, typeorm_1.InjectRepository)(group_entity_1.GroupEntity),
    __metadata("design:type", typeorm_2.Repository)
], SchoolGroupService.prototype, "groupRepository", void 0);
__decorate([
    (0, common_1.Inject)(tangerine_service_1.TangerineService),
    __metadata("design:type", tangerine_service_1.TangerineService)
], SchoolGroupService.prototype, "tangerineService", void 0);
SchoolGroupService = SchoolGroupService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SchoolGroupService);
exports.SchoolGroupService = SchoolGroupService;
//# sourceMappingURL=school-group.service.js.map