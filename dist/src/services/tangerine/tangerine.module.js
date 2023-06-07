"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TangerineModule = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const utils_module_1 = require("../../utils/utils.module");
const utils_service_1 = require("../../utils/utils.service");
const tangerine_service_1 = require("./tangerine.service");
let TangerineModule = class TangerineModule {
};
TangerineModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule, utils_module_1.UtilsModule],
        providers: [tangerine_service_1.TangerineService, utils_service_1.UtilsService],
        exports: [tangerine_service_1.TangerineService]
    })
], TangerineModule);
exports.TangerineModule = TangerineModule;
//# sourceMappingURL=tangerine.module.js.map