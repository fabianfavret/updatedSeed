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
var CourseService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const defatul_service_1 = require("../../../defaults/defatul.service");
const course_entity_1 = require("../../../entities/course.entity");
const group_entity_1 = require("../../../entities/group.entity");
const tangerine_service_1 = require("../../../services/tangerine/tangerine.service");
const utils_service_1 = require("../../../utils/utils.service");
const typeorm_2 = require("typeorm");
const discipline_service_1 = require("../discipline/discipline.service");
let CourseService = CourseService_1 = class CourseService extends defatul_service_1.DefaultService {
    constructor() {
        super(CourseService_1);
    }
    async _create(params) {
        try {
            this.logger.debug(`_create: 'id turma ' ${params.course.id_turma} -' id disc ' ${params.course.id_disciplina}`);
            const course = await this.courseRepository.findOne({
                where: { guidDiscipline: params.course.id_disciplina, guidTurma: params.course.id_turma }
            });
            if (course) {
                return await this._update({ course: params.course, courseGuid: course.guidCourse });
            }
            const discipline = await this.disciplineService.get({ guidHub: params.course.id_disciplina });
            const group = await this.groupRepository.findOne({ where: { guid: params.course.id_turma } });
            const getProgramTangerine = await this.tangerineService.get({
                url: tangerine_service_1.TANGERINE_URL.GET_COURSE,
                query: {
                    'educationYear[]': group.educationYearGuid,
                    'discipline[]': discipline.guidTng,
                    hasBlueberry: 1,
                    'type[]': 'template-1'
                }
            });
            if (!getProgramTangerine.courses.length) {
                return this.logger.log(`Discard Create Course - Program NOT_FOUND Discipline: ${discipline.guidTng} EducationYear: ${group.educationYearGuid}`);
            }
            const courseCreated = await this.tangerineService.post({
                url: tangerine_service_1.TANGERINE_URL.POST_COURSE,
                payload: {
                    name: group.name + ' - ' + params.course.nome_disciplina,
                    education_year_guid: group.educationYearGuid,
                    education_discipline_guid: discipline.guidTng,
                    school_group_guid: group.guid,
                    programs: [getProgramTangerine.courses[0].guid],
                    is_referenced: 1,
                    time_zone: this.utilsService.getTimezone(),
                    author_guid: params.course.id_professor
                }
            });
            this.logger.debug('Curso creado', courseCreated.data.guid);
            await this.courseRepository.save({ guidTurma: params.course.id_turma, guidDiscipline: params.course.id_disciplina, guidCourse: courseCreated.data.guid });
        }
        catch (error) {
            throw new Error(`[_create]:${error.message}`);
        }
    }
    async _update(params) {
        try {
            this.logger.debug(`_update: ${params.course.id_disciplina}`);
            await this.tangerineService.post({
                url: tangerine_service_1.TANGERINE_URL.POST_COURSE_USER,
                path: { courseGuid: params.courseGuid },
                payload: { guid: [params.course.id_professor] }
            });
        }
        catch (error) {
            throw new Error(`[_update]:${error.message}`);
        }
    }
    async _delete(params) {
        try {
            this.logger.debug(`_delete: ${params.course.id_disciplina}`);
            const course = await this.courseRepository.findOne({
                where: { guidDiscipline: params.course.id_disciplina, guidTurma: params.course.id_turma }
            });
            if (!course) {
                return this.logger.log(`Discard Delete Course Turma: ${params.course.id_turma} Discipline: ${params.course.id_disciplina}`);
            }
            const getUsers = await this.tangerineService.get({
                url: tangerine_service_1.TANGERINE_URL.GET_COURSE_USER,
                path: { courseGuid: course.guidCourse }
            });
            let canDelete = true;
            let changeOwner = '';
            for (const user of getUsers.users) {
                if (user.person_guid !== params.course.id_professor && user.role_guid !== 'R02') {
                    canDelete = false;
                }
                if (user.person_guid !== params.course.id_professor && user.role_guid === 'R02' && !user.is_owner) {
                    changeOwner = user.person_guid;
                }
            }
            if (!canDelete || changeOwner !== '') {
                if (!canDelete) {
                    await this.tangerineService.delete({
                        url: tangerine_service_1.TANGERINE_URL.DELETE_LINK_USERS_COURSE,
                        path: { courseGuid: course.guidCourse },
                        payload: { guid: [params.course.id_professor] }
                    });
                }
                if (changeOwner !== '') {
                    await this.tangerineService.put({
                        url: tangerine_service_1.TANGERINE_URL.PUT_OWNER_USERS_COURSE,
                        path: { courseGuid: course.guidCourse },
                        payload: { personGuid: changeOwner }
                    });
                }
                return this.logger.log(`Discard Delete Course Turma: ${params.course.id_turma} Discipline: ${params.course.id_disciplina}`);
            }
            await this.tangerineService.delete({ url: tangerine_service_1.TANGERINE_URL.DELETE_COURSE, path: { guid: course.guidCourse } });
            await this.courseRepository.delete({ guidCourse: course.guidCourse });
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
                        await this._create({ course: event.obj, schoolGuid: params.schoolGuid });
                        response.insert++;
                        break;
                    case 'delete':
                        await this._delete({ course: event.obj, schoolGuid: params.schoolGuid });
                        response.delete++;
                        break;
                }
            }
            return response;
        }
        catch (error) {
            throw new Error(`${CourseService_1.name}(sync):${error.message}`);
        }
    }
};
__decorate([
    (0, typeorm_1.InjectRepository)(course_entity_1.CourseEntity),
    __metadata("design:type", typeorm_2.Repository)
], CourseService.prototype, "courseRepository", void 0);
__decorate([
    (0, typeorm_1.InjectRepository)(group_entity_1.GroupEntity),
    __metadata("design:type", typeorm_2.Repository)
], CourseService.prototype, "groupRepository", void 0);
__decorate([
    (0, common_1.Inject)(discipline_service_1.DisciplineService),
    __metadata("design:type", discipline_service_1.DisciplineService)
], CourseService.prototype, "disciplineService", void 0);
__decorate([
    (0, common_1.Inject)(tangerine_service_1.TangerineService),
    __metadata("design:type", tangerine_service_1.TangerineService)
], CourseService.prototype, "tangerineService", void 0);
__decorate([
    (0, common_1.Inject)(utils_service_1.UtilsService),
    __metadata("design:type", utils_service_1.UtilsService)
], CourseService.prototype, "utilsService", void 0);
CourseService = CourseService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], CourseService);
exports.CourseService = CourseService;
//# sourceMappingURL=course.service.js.map