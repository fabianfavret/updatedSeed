"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const school_entity_1 = require("../../entities/school.entity");
const sync_entity_1 = require("../../entities/sync.entity");
const hubpositivo_module_1 = require("../../services/hubpositivo/hubpositivo.module");
const utils_module_1 = require("../../utils/utils.module");
const utils_service_1 = require("../../utils/utils.service");
const course_module_1 = require("./course/course.module");
const discipline_module_1 = require("./discipline/discipline.module");
const school_group_user_module_1 = require("./school-group-user/school-group-user.module");
const school_group_module_1 = require("./school-group/school-group.module");
const school_user_module_1 = require("./school-user/school-user.module");
const school_year_module_1 = require("./school-year/school-year.module");
const school_module_1 = require("./school/school.module");
const sync_controller_1 = require("./sync.controller");
const sync_service_1 = require("./sync.service");
const user_module_1 = require("./user/user.module");
let SyncModule = class SyncModule {
};
SyncModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([sync_entity_1.SyncEntity, school_entity_1.SchoolEntity]),
            utils_module_1.UtilsModule,
            hubpositivo_module_1.HubPositivoModule,
            school_module_1.SchoolModule,
            user_module_1.UserModule,
            school_user_module_1.SchoolUsersModule,
            school_year_module_1.SchoolYearModule,
            school_group_module_1.SchoolGroupModule,
            school_group_user_module_1.SchoolGroupUserModule,
            course_module_1.CourseModule,
            discipline_module_1.DisciplineModule
        ],
        controllers: [sync_controller_1.SyncController],
        providers: [utils_service_1.UtilsService, sync_service_1.SyncService]
    })
], SyncModule);
exports.SyncModule = SyncModule;
//# sourceMappingURL=sync.module.js.map