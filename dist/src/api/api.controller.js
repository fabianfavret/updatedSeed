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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ApiController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const default_controller_1 = require("../defaults/default.controller");
const api_dto_1 = require("../dto/api.dto");
const api_service_1 = require("./api.service");
let ApiController = ApiController_1 = class ApiController extends default_controller_1.DefaultController {
    constructor() {
        super(ApiController_1);
    }
    async addSchool(body) {
        var _a, _b, _c;
        try {
            this.apiService.addSchool({ guids: body.guids });
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException({ status: (_a = error.status) !== null && _a !== void 0 ? _a : common_1.HttpStatus.INTERNAL_SERVER_ERROR, error: (_b = error.message) !== null && _b !== void 0 ? _b : error }, (_c = error.status) !== null && _c !== void 0 ? _c : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
__decorate([
    (0, common_1.Inject)(api_service_1.ApiService),
    __metadata("design:type", api_service_1.ApiService)
], ApiController.prototype, "apiService", void 0);
__decorate([
    (0, common_1.Post)('add/schools'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Add School for suncronize' }),
    (0, swagger_1.ApiBody)({ required: true, type: api_dto_1.AddSchoolApiDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [api_dto_1.AddSchoolApiDTO]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "addSchool", null);
ApiController = ApiController_1 = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [])
], ApiController);
exports.ApiController = ApiController;
//# sourceMappingURL=api.controller.js.map