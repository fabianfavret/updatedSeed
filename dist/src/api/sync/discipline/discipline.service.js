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
var DisciplineService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisciplineService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const defatul_service_1 = require("../../../defaults/defatul.service");
const discipline_entity_1 = require("../../../entities/discipline.entity");
const tangerine_service_1 = require("../../../services/tangerine/tangerine.service");
const utils_service_1 = require("../../../utils/utils.service");
const typeorm_2 = require("typeorm");
let DisciplineService = DisciplineService_1 = class DisciplineService extends defatul_service_1.DefaultService {
    constructor() {
        super(DisciplineService_1);
    }
    async _create(params) {
        try {
            this.logger.debug(`_create: ${params.discipline.id}`);
            let discipline;
            if (!params.noCheck) {
                discipline = await this.disciplineRepository.findOne({ where: { guidHub: params.discipline.id } });
                if (discipline) {
                    return await this._update({ discipline: params.discipline, noCheck: true });
                }
            }
            this.logger.debug(`Create Discipline: ${params.discipline.id}`);
            const getDiscipline = await this.tangerineService.get({
                url: tangerine_service_1.TANGERINE_URL.GET_DISCIPLINE,
                query: { code: params.discipline.ccc }
            });
            if (!getDiscipline.length) {
                throw new Error(`[_create]:Discipline TANGERINE_NOT_EXIST`);
            }
            discipline = {
                guidHub: params.discipline.id,
                guidTng: getDiscipline[0].guid
            };
            await this.disciplineRepository.save(discipline);
        }
        catch (error) {
            throw new Error(`[_create]:${error.message}`);
        }
    }
    async _update(params) {
        try {
            this.logger.debug(`_update: ${params.discipline.id}`);
            const discipline = await this.disciplineRepository.findOne({ where: { guidHub: params.discipline.id } });
            if (!params.noCheck) {
                if (!discipline) {
                    return await this._create({ discipline: params.discipline, noCheck: true });
                }
            }
            this.logger.debug(`Update Discipline: ${params.discipline.id}`);
            const getDiscipline = await this.tangerineService.get({
                url: tangerine_service_1.TANGERINE_URL.GET_DISCIPLINE,
                query: { code: params.discipline.ccc }
            });
            if (!getDiscipline.length) {
                throw new Error(`[_update]:Discipline TANGERINE_NOT_EXIST`);
            }
            if (!this.utilsService.isObj1ContainedObj2({ obj1: discipline, obj2: { guidTng: getDiscipline[0].guid } })) {
                await this.disciplineRepository.update({ guidHub: params.discipline.id }, { guidTng: getDiscipline[0].guid });
            }
        }
        catch (error) {
            throw new Error(`[_update]:${error.message}`);
        }
    }
    async _delete(params) {
        try {
            this.logger.debug(`_delete: ${params.discipline.id}`);
            const discipline = await this.disciplineRepository.findOne({ where: { guidHub: params.discipline.id } });
            if (!discipline) {
                return this.logger.log(`Discard Delete Discipline: ${params.discipline.id}`);
            }
            this.logger.debug(`Delete Discipline: ${params.discipline.id}`);
            await this.disciplineRepository.delete({ guidHub: params.discipline.id });
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
                        await this._create({ discipline: event.obj });
                        response.insert++;
                        break;
                    case 'update':
                        await this._update({ discipline: event.obj });
                        response.update++;
                        break;
                    case 'delete':
                        await this._delete({ discipline: event.obj });
                        response.delete++;
                        break;
                }
            }
            return response;
        }
        catch (error) {
            throw new Error(`${DisciplineService_1.name}(sync):${error.message}`);
        }
    }
    async get(params) {
        try {
            const filter = {};
            if (params.guidHub) {
                filter.guidHub = params.guidHub;
            }
            if (params.guidTng) {
                filter.guidTng = params.guidTng;
            }
            return await this.disciplineRepository.findOneBy(filter);
        }
        catch (error) {
            throw new Error(`${DisciplineService_1.name}(get):${error.message}`);
        }
    }
};
__decorate([
    (0, typeorm_1.InjectRepository)(discipline_entity_1.DisciplineEntity),
    __metadata("design:type", typeorm_2.Repository)
], DisciplineService.prototype, "disciplineRepository", void 0);
__decorate([
    (0, common_1.Inject)(tangerine_service_1.TangerineService),
    __metadata("design:type", tangerine_service_1.TangerineService)
], DisciplineService.prototype, "tangerineService", void 0);
__decorate([
    (0, common_1.Inject)(utils_service_1.UtilsService),
    __metadata("design:type", utils_service_1.UtilsService)
], DisciplineService.prototype, "utilsService", void 0);
DisciplineService = DisciplineService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], DisciplineService);
exports.DisciplineService = DisciplineService;
//# sourceMappingURL=discipline.service.js.map