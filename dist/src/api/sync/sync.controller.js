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
var SyncController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const default_controller_1 = require("../../defaults/default.controller");
const sync_entity_1 = require("../../entities/sync.entity");
const sync_service_1 = require("./sync.service");
let SyncController = SyncController_1 = class SyncController extends default_controller_1.DefaultController {
    constructor() {
        super(SyncController_1);
    }
    async periodicSync() {
        var _a, _b, _c;
        try {
            this.service.sync(sync_entity_1.SyncTypeEnum.PERIODICAL);
            return { message: 'Sync Begin' };
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException({ status: (_a = error.status) !== null && _a !== void 0 ? _a : common_1.HttpStatus.INTERNAL_SERVER_ERROR, error: (_b = error.message) !== null && _b !== void 0 ? _b : error }, (_c = error.status) !== null && _c !== void 0 ? _c : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
__decorate([
    (0, common_1.Inject)(sync_service_1.SyncService),
    __metadata("design:type", sync_service_1.SyncService)
], SyncController.prototype, "service", void 0);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Begin synchronize' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SyncController.prototype, "periodicSync", null);
SyncController = SyncController_1 = __decorate([
    (0, common_1.Controller)('sync'),
    __metadata("design:paramtypes", [])
], SyncController);
exports.SyncController = SyncController;
//# sourceMappingURL=sync.controller.js.map