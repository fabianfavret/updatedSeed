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
var SchoolService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolService = void 0;
const common_1 = require("@nestjs/common");
const defatul_service_1 = require("../../../defaults/defatul.service");
const tangerine_service_1 = require("../../../services/tangerine/tangerine.service");
let SchoolService = SchoolService_1 = class SchoolService extends defatul_service_1.DefaultService {
    constructor() {
        super(SchoolService_1);
    }
    async _create(params) {
        try {
            this.logger.debug(`_create: ${params.school.guid}`);
            await this.tangerineService.post({ url: tangerine_service_1.TANGERINE_URL.POST_SCHOOL, payload: params.school });
        }
        catch (error) {
            throw new Error(`[_create]:${error.message}`);
        }
    }
    async sync(params) {
        var _a;
        try {
            const schools = await this.tangerineService.get({ url: tangerine_service_1.TANGERINE_URL.GET_SCHOOL, query: { guid: params.payload.guid } });
            if (schools.schools.length === 0) {
                (_a = params.payload).address || (_a.address = 'sem endereco');
                await this._create({ school: params.payload });
            }
        }
        catch (error) {
            throw new Error(`${SchoolService_1.name}(sync):${error.message}`);
        }
    }
};
__decorate([
    (0, common_1.Inject)(tangerine_service_1.TangerineService),
    __metadata("design:type", tangerine_service_1.TangerineService)
], SchoolService.prototype, "tangerineService", void 0);
SchoolService = SchoolService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SchoolService);
exports.SchoolService = SchoolService;
//# sourceMappingURL=school.service.js.map