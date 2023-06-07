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
var SyncService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const defatul_service_1 = require("../../defaults/defatul.service");
const school_entity_1 = require("../../entities/school.entity");
const sync_entity_1 = require("../../entities/sync.entity");
const hubpositivo_service_1 = require("../../services/hubpositivo/hubpositivo.service");
const utils_service_1 = require("../../utils/utils.service");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const course_service_1 = require("./course/course.service");
const discipline_service_1 = require("./discipline/discipline.service");
const school_group_user_service_1 = require("./school-group-user/school-group-user.service");
const school_group_service_1 = require("./school-group/school-group.service");
const school_user_service_1 = require("./school-user/school-user.service");
const school_year_service_1 = require("./school-year/school-year.service");
const school_service_1 = require("./school/school.service");
const user_service_1 = require("./user/user.service");
let SyncService = SyncService_1 = class SyncService extends defatul_service_1.DefaultService {
    constructor() {
        super(SyncService_1);
    }
    async _createSync(params) {
        try {
            const sync = new sync_entity_1.SyncEntity();
            let exist = new sync_entity_1.SyncEntity();
            if (params.type === sync_entity_1.SyncTypeEnum.INITIAL) {
                exist = await this.syncRepository.findOne({
                    where: { type: sync_entity_1.SyncTypeEnum.INITIAL, state: sync_entity_1.SyncStateEnum.FINISHED, school: { guid: params.school.guid } }
                });
                if (exist) {
                    throw new Error(`Initial import READY_EXIST`);
                }
                exist = await this.syncRepository.findOne({
                    where: { type: sync_entity_1.SyncTypeEnum.INITIAL, state: (0, typeorm_2.In)([sync_entity_1.SyncStateEnum.PENDING]), school: { guid: params.school.guid } }
                });
                if (exist) {
                    this.logger.warn(`Initial import PENDING`);
                    return null;
                }
                sync.guid = (0, uuid_1.v1)();
                sync.school = params.school;
                sync.type = sync_entity_1.SyncTypeEnum.INITIAL;
                sync.to = new Date();
            }
            else {
                exist = await this.syncRepository.findOne({
                    where: { type: sync_entity_1.SyncTypeEnum.PERIODICAL, state: (0, typeorm_2.In)([sync_entity_1.SyncStateEnum.PENDING]), school: { guid: params.school.guid } }
                });
                if (exist) {
                    this.logger.warn(`Periodical import PENDING`);
                    return null;
                }
                const initialSync = await this.syncRepository.findOne({
                    where: { state: sync_entity_1.SyncStateEnum.FINISHED, type: sync_entity_1.SyncTypeEnum.INITIAL, school: { guid: params.school.guid } }
                });
                if (!initialSync) {
                    return await this._createSync({ type: sync_entity_1.SyncTypeEnum.INITIAL, school: params.school });
                }
                sync.guid = (0, uuid_1.v1)();
                sync.school = params.school;
                sync.type = sync_entity_1.SyncTypeEnum.PERIODICAL;
                sync.from = new Date(initialSync.to.getTime() + 1000);
                sync.to = new Date();
            }
            return await this.syncRepository.save(sync);
        }
        catch (error) {
            throw new Error(`[_createSync]:${error.message}`);
        }
    }
    async sync(type) {
        var _a;
        try {
            const schools = await this.schoolRepository.find();
            for (const school of schools) {
                const query = {};
                const sync = await this._createSync({ type: type, school: school });
                if (sync) {
                    try {
                        const payload = {};
                        payload.guid = school.guid;
                        payload.name = school.name;
                        await this.schoolService.sync({ payload: payload });
                        if (sync.type === sync_entity_1.SyncTypeEnum.PERIODICAL) {
                            query.min_date = this.utilsService.getYYYYMMDDDateFormat(sync.from);
                        }
                        const eventSchools = await this.hubService.get({
                            url: hubpositivo_service_1.HUBPOSITIVO_URL.GET_SCHOOL_EVENT,
                            path: { org_id: school.guid },
                            query: query
                        });
                        let response = await this.userService.sync({ events: eventSchools.dados.dat.usuario });
                        this.logger.debug(`USUARIOS: ${JSON.stringify(response)}`);
                        sync.usuario = JSON.stringify(response);
                        response = await this.schoolYearService.sync({ events: eventSchools.dados.dat.periodo, schoolGuid: school.guid });
                        this.logger.debug(`PERIODOS: ${JSON.stringify(response)}`);
                        sync.periodo = JSON.stringify(response);
                        await this.schoolUsersService.sync({ events: eventSchools.dados.dat.usuario, schoolGuid: school.guid });
                        response = await this.schoolGroupService.sync({ events: eventSchools.dados.dat.turma, schoolGuid: school.guid });
                        this.logger.debug(`TURMA: ${JSON.stringify(response)}`);
                        sync.turma = JSON.stringify(response);
                        response = await this.schoolGroupUserService.sync({ events: eventSchools.dados.dat.turmaAluno, schoolGuid: school.guid });
                        this.logger.debug(`TURMA_ALLUMNO: ${JSON.stringify(response)}`);
                        sync.turmaAluno = JSON.stringify(response);
                        response = await this.disciplineService.sync({ events: eventSchools.dados.dat.disciplina });
                        this.logger.debug(`DISCIPLINA: ${JSON.stringify(response)}`);
                        sync.disciplina = JSON.stringify(response);
                        response = await this.courseService.sync({ events: eventSchools.dados.dat.disciplinaProfessor, schoolGuid: school.guid });
                        this.logger.debug(`DISCIPLINA_PROFESOR: ${JSON.stringify(response)}`);
                        sync.disciplinaProfesor = JSON.stringify(response);
                    }
                    catch (error) {
                        sync.state = sync_entity_1.SyncStateEnum.STOPPED;
                        sync.error = (_a = error.message) !== null && _a !== void 0 ? _a : error.toString();
                        sync.finishedAt = new Date();
                        await this.syncRepository.update({ guid: sync.guid }, sync);
                        throw error;
                    }
                    this.logger.log(`Sync Compleate: ${sync.guid} (${sync.type}) / ` +
                        `${sync.from ? this.utilsService.getYYYYMMDDDateFormat(sync.from) : 'BEGIN'} - ${this.utilsService.getYYYYMMDDDateFormat(sync.to)}`);
                    sync.state = sync_entity_1.SyncStateEnum.FINISHED;
                    sync.finishedAt = new Date();
                    await this.syncRepository.update({ guid: sync.guid }, sync);
                }
            }
        }
        catch (error) {
            this.logger.error(error.message);
        }
    }
};
__decorate([
    (0, typeorm_1.InjectRepository)(sync_entity_1.SyncEntity),
    __metadata("design:type", typeorm_2.Repository)
], SyncService.prototype, "syncRepository", void 0);
__decorate([
    (0, typeorm_1.InjectRepository)(school_entity_1.SchoolEntity),
    __metadata("design:type", typeorm_2.Repository)
], SyncService.prototype, "schoolRepository", void 0);
__decorate([
    (0, common_1.Inject)(hubpositivo_service_1.HubPositivoService),
    __metadata("design:type", hubpositivo_service_1.HubPositivoService)
], SyncService.prototype, "hubService", void 0);
__decorate([
    (0, common_1.Inject)(utils_service_1.UtilsService),
    __metadata("design:type", utils_service_1.UtilsService)
], SyncService.prototype, "utilsService", void 0);
__decorate([
    (0, common_1.Inject)(school_service_1.SchoolService),
    __metadata("design:type", school_service_1.SchoolService)
], SyncService.prototype, "schoolService", void 0);
__decorate([
    (0, common_1.Inject)(user_service_1.UserService),
    __metadata("design:type", user_service_1.UserService)
], SyncService.prototype, "userService", void 0);
__decorate([
    (0, common_1.Inject)(discipline_service_1.DisciplineService),
    __metadata("design:type", discipline_service_1.DisciplineService)
], SyncService.prototype, "disciplineService", void 0);
__decorate([
    (0, common_1.Inject)(school_year_service_1.SchoolYearService),
    __metadata("design:type", school_year_service_1.SchoolYearService)
], SyncService.prototype, "schoolYearService", void 0);
__decorate([
    (0, common_1.Inject)(school_user_service_1.SchoolUsersService),
    __metadata("design:type", school_user_service_1.SchoolUsersService)
], SyncService.prototype, "schoolUsersService", void 0);
__decorate([
    (0, common_1.Inject)(school_group_service_1.SchoolGroupService),
    __metadata("design:type", school_group_service_1.SchoolGroupService)
], SyncService.prototype, "schoolGroupService", void 0);
__decorate([
    (0, common_1.Inject)(school_group_user_service_1.SchoolGroupUserService),
    __metadata("design:type", school_group_user_service_1.SchoolGroupUserService)
], SyncService.prototype, "schoolGroupUserService", void 0);
__decorate([
    (0, common_1.Inject)(course_service_1.CourseService),
    __metadata("design:type", course_service_1.CourseService)
], SyncService.prototype, "courseService", void 0);
SyncService = SyncService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SyncService);
exports.SyncService = SyncService;
//# sourceMappingURL=sync.service.js.map