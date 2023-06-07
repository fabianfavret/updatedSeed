"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const course_entity_1 = require("../../../entities/course.entity");
const group_entity_1 = require("../../../entities/group.entity");
const tangerine_module_1 = require("../../../services/tangerine/tangerine.module");
const utils_service_1 = require("../../../utils/utils.service");
const discipline_module_1 = require("../discipline/discipline.module");
const course_service_1 = require("./course.service");
let CourseModule = class CourseModule {
};
CourseModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([course_entity_1.CourseEntity, group_entity_1.GroupEntity]), discipline_module_1.DisciplineModule, tangerine_module_1.TangerineModule],
        providers: [course_service_1.CourseService, utils_service_1.UtilsService],
        exports: [course_service_1.CourseService]
    })
], CourseModule);
exports.CourseModule = CourseModule;
//# sourceMappingURL=course.module.js.map