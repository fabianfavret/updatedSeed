"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolYearModule = void 0;
const common_1 = require("@nestjs/common");
const tangerine_module_1 = require("../../../services/tangerine/tangerine.module");
const utils_module_1 = require("../../../utils/utils.module");
const utils_service_1 = require("../../../utils/utils.service");
const school_year_service_1 = require("./school-year.service");
let SchoolYearModule = class SchoolYearModule {
};
SchoolYearModule = __decorate([
    (0, common_1.Module)({
        imports: [tangerine_module_1.TangerineModule, utils_module_1.UtilsModule],
        providers: [school_year_service_1.SchoolYearService, utils_service_1.UtilsService],
        exports: [school_year_service_1.SchoolYearService]
    })
], SchoolYearModule);
exports.SchoolYearModule = SchoolYearModule;
//# sourceMappingURL=school-year.module.js.map