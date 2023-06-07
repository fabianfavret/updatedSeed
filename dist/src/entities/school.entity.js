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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolEntity = void 0;
const typeorm_1 = require("typeorm");
const sync_entity_1 = require("./sync.entity");
let SchoolEntity = class SchoolEntity {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'varchar', length: 38 }),
    __metadata("design:type", String)
], SchoolEntity.prototype, "guid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200, nullable: false }),
    __metadata("design:type", String)
], SchoolEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], SchoolEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sync_entity_1.SyncEntity, (syncs) => syncs.school),
    __metadata("design:type", Array)
], SchoolEntity.prototype, "syncs", void 0);
SchoolEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'Schools' })
], SchoolEntity);
exports.SchoolEntity = SchoolEntity;
//# sourceMappingURL=school.entity.js.map