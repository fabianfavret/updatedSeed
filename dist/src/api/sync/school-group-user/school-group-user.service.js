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
var SchoolGroupUserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolGroupUserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const defatul_service_1 = require("../../../defaults/defatul.service");
const group_entity_1 = require("../../../entities/group.entity");
const tangerine_service_1 = require("../../../services/tangerine/tangerine.service");
const typeorm_2 = require("typeorm");
let SchoolGroupUserService = SchoolGroupUserService_1 = class SchoolGroupUserService extends defatul_service_1.DefaultService {
    constructor() {
        super(SchoolGroupUserService_1);
    }
    async _create(params) {
        try {
            this.logger.debug(`_create: ${params.schoolGroupUser.id_turma}`);
            const group = await this.groupRepository.findOne({ where: { guid: params.schoolGroupUser.id_turma } });
            const getCourses = await this.tangerineService.get({ url: tangerine_service_1.TANGERINE_URL.GET_COURSE, query: { 'group[]': group.guid } });
            if (getCourses.courses.length) {
                this.logger.debug(`Create SchoolGroupUser: ${params.schoolGuid} - ${params.schoolGroupUser.id_turma}`);
                for (const course of getCourses.courses) {
                    await this.tangerineService.post({
                        url: tangerine_service_1.TANGERINE_URL.POST_LINK_USERS_COURSE,
                        path: { courseGuid: course.guid },
                        payload: { guid: [params.schoolGroupUser.id_aluno] }
                    });
                }
            }
            else {
                this.logger.debug(`Create SchoolGroupUser: ${params.schoolGuid} - ${params.schoolGroupUser.id_turma}`);
                await this.tangerineService.post({
                    url: tangerine_service_1.TANGERINE_URL.POST_SCHOOL_GROUP_USERS,
                    path: { schoolGuid: params.schoolGuid, groupGuid: params.schoolGroupUser.id_turma },
                    payload: { guid: [params.schoolGroupUser.id_aluno] }
                });
            }
        }
        catch (error) {
            throw new Error(`[_create]:${error.message}`);
        }
    }
    async _delete(params) {
        try {
            this.logger.debug(`_delete id_turma : ${params.schoolGroupUser.id_turma}-${params.schoolGroupUser.id_aluno}`);
            const group = await this.groupRepository.findOne({ where: { guid: params.schoolGroupUser.id_turma } });
            if (!group) {
                return this.logger.log(`Discard Delete User From Group: ${params.schoolGroupUser.id_turma} - ${params.schoolGroupUser.id_aluno}`);
            }
            const getCourses = await this.tangerineService.get({ url: tangerine_service_1.TANGERINE_URL.GET_COURSE, query: { 'group[]': group.guid } });
            if (getCourses.courses.length) {
                for (const course of getCourses.courses) {
                    await this.tangerineService.delete({
                        url: tangerine_service_1.TANGERINE_URL.DELETE_LINK_USERS_COURSE,
                        path: { courseGuid: course.guid },
                        payload: { guid: [params.schoolGroupUser.id_aluno] }
                    });
                }
            }
            await this.tangerineService.delete({
                url: tangerine_service_1.TANGERINE_URL.POST_SCHOOL_GROUP_USERS,
                path: { schoolGuid: params.schoolGuid, groupGuid: params.schoolGroupUser.id_turma },
                payload: { guid: [params.schoolGroupUser.id_aluno] }
            });
        }
        catch (error) {
            throw new Error(`[_delete]:${error.message}`);
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
                    case 'update':
                        await this._create({ schoolGroupUser: event.obj, schoolGuid: params.schoolGuid });
                        if (event.operacao === 'insert') {
                            response.insert++;
                        }
                        else {
                            response.update++;
                        }
                        break;
                    case 'delete':
                        await this._delete({ schoolGroupUser: event.obj, schoolGuid: params.schoolGuid });
                        response.delete++;
                        break;
                }
            }
            return response;
        }
        catch (error) {
            throw new Error(`${SchoolGroupUserService_1.name}(sync):${error.message}`);
        }
    }
};
__decorate([
    (0, typeorm_1.InjectRepository)(group_entity_1.GroupEntity),
    __metadata("design:type", typeorm_2.Repository)
], SchoolGroupUserService.prototype, "groupRepository", void 0);
__decorate([
    (0, common_1.Inject)(tangerine_service_1.TangerineService),
    __metadata("design:type", tangerine_service_1.TangerineService)
], SchoolGroupUserService.prototype, "tangerineService", void 0);
SchoolGroupUserService = SchoolGroupUserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SchoolGroupUserService);
exports.SchoolGroupUserService = SchoolGroupUserService;
//# sourceMappingURL=school-group-user.service.js.map