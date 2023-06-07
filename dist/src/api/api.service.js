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
var ApiService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const defatul_service_1 = require("../defaults/defatul.service");
const school_entity_1 = require("../entities/school.entity");
const hubpositivo_service_1 = require("../services/hubpositivo/hubpositivo.service");
const typeorm_2 = require("typeorm");
let ApiService = ApiService_1 = class ApiService extends defatul_service_1.DefaultService {
    constructor() {
        super(ApiService_1);
    }
    async addSchool(params) {
        try {
            for (const guid of params.guids) {
                const school = await this.hubService.get({ url: hubpositivo_service_1.HUBPOSITIVO_URL.GET_SCHOOL_EVENT, path: { org_id: guid } });
                await this.schoolRepository.save({ guid: guid, name: school.dados.nome_escola });
            }
        }
        catch (error) {
            throw new Error(`(addSchool):${error.message}`);
        }
    }
};
__decorate([
    (0, typeorm_1.InjectRepository)(school_entity_1.SchoolEntity),
    __metadata("design:type", typeorm_2.Repository)
], ApiService.prototype, "schoolRepository", void 0);
__decorate([
    (0, common_1.Inject)(hubpositivo_service_1.HubPositivoService),
    __metadata("design:type", hubpositivo_service_1.HubPositivoService)
], ApiService.prototype, "hubService", void 0);
ApiService = ApiService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ApiService);
exports.ApiService = ApiService;
//# sourceMappingURL=api.service.js.map