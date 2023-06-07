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
var FileLoadsController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileLoadsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const fileLoads_service_1 = require("./fileLoads.service");
let FileLoadsController = FileLoadsController_1 = class FileLoadsController {
    constructor() {
        this.logger = new common_1.Logger(FileLoadsController_1.name);
    }
    async processExcelFile() {
        try {
            this.logger.debug('processExcelFile');
            const login = await this.fileLoadsService.post({
                url: 'users/auth/login',
                payload: {
                    username: 'admin@oneclick.es',
                    password: '123'
                }
            });
            this.logger.debug(login.data.accessToken);
            this.fileLoadsService.processExcelFile(login.data.accessToken);
            return { status: 'success' };
        }
        catch (error) { }
    }
};
__decorate([
    (0, common_1.Inject)(fileLoads_service_1.FileLoadsService),
    __metadata("design:type", fileLoads_service_1.FileLoadsService)
], FileLoadsController.prototype, "fileLoadsService", void 0);
__decorate([
    (0, common_1.Get)('/excel'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Load File ' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FileLoadsController.prototype, "processExcelFile", null);
FileLoadsController = FileLoadsController_1 = __decorate([
    (0, common_1.Controller)('load-file'),
    (0, swagger_1.ApiTags)('load-file')
], FileLoadsController);
exports.FileLoadsController = FileLoadsController;
//# sourceMappingURL=fileLoads.controller.js.map