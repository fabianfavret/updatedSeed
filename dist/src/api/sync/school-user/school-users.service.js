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
var SchoolUsersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolUsersService = void 0;
const common_1 = require("@nestjs/common");
const defatul_service_1 = require("../../../defaults/defatul.service");
const tangerine_service_1 = require("../../../services/tangerine/tangerine.service");
let SchoolUsersService = SchoolUsersService_1 = class SchoolUsersService extends defatul_service_1.DefaultService {
    constructor() {
        super(SchoolUsersService_1);
    }
    async _create(params) {
        try {
            this.logger.debug(`_create: ${params.users}`);
            await this.tangerineService.post(tangerine_service_1.TANGERINE_URL.POST_SCHOOL_USER, params.users, params.org_id);
        }
        catch (error) {
            throw new Error(`[_create]:${error.message}`);
        }
    }
    async sync(params) {
        const guids = [];
        try {
            params.events.forEach((event) => {
                if (event.operacao === 'insert' || event.operacao === 'update') {
                    guids.push(event.obj.id);
                }
            });
            await this._create({ users: { guid: guids }, org_id: params.org_id });
        }
        catch (error) {
            throw new Error(`${SchoolUsersService_1.name}(sync):${error.message}`);
        }
    }
};
__decorate([
    (0, common_1.Inject)(tangerine_service_1.TangerineService),
    __metadata("design:type", tangerine_service_1.TangerineService)
], SchoolUsersService.prototype, "tangerineService", void 0);
SchoolUsersService = SchoolUsersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SchoolUsersService);
exports.SchoolUsersService = SchoolUsersService;
//# sourceMappingURL=school-users.service.js.map