"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisciplineModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const discipline_entity_1 = require("../../../entities/discipline.entity");
const tangerine_module_1 = require("../../../services/tangerine/tangerine.module");
const utils_module_1 = require("../../../utils/utils.module");
const utils_service_1 = require("../../../utils/utils.service");
const discipline_service_1 = require("./discipline.service");
let DisciplineModule = class DisciplineModule {
};
DisciplineModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([discipline_entity_1.DisciplineEntity]), tangerine_module_1.TangerineModule, utils_module_1.UtilsModule],
        providers: [discipline_service_1.DisciplineService, utils_service_1.UtilsService],
        exports: [discipline_service_1.DisciplineService]
    })
], DisciplineModule);
exports.DisciplineModule = DisciplineModule;
//# sourceMappingURL=discipline.module.js.map