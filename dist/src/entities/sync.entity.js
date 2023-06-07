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
exports.SyncEntity = exports.SyncStateEnum = exports.SyncTypeEnum = void 0;
const typeorm_1 = require("typeorm");
const school_entity_1 = require("./school.entity");
var SyncTypeEnum;
(function (SyncTypeEnum) {
    SyncTypeEnum["INITIAL"] = "initial";
    SyncTypeEnum["PERIODICAL"] = "periodical";
})(SyncTypeEnum = exports.SyncTypeEnum || (exports.SyncTypeEnum = {}));
var SyncStateEnum;
(function (SyncStateEnum) {
    SyncStateEnum["PENDING"] = "pending";
    SyncStateEnum["STOPPED"] = "stopped";
    SyncStateEnum["FINISHED"] = "finished";
})(SyncStateEnum = exports.SyncStateEnum || (exports.SyncStateEnum = {}));
let SyncEntity = class SyncEntity {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'varchar', length: 38 }),
    __metadata("design:type", String)
], SyncEntity.prototype, "guid", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => school_entity_1.SchoolEntity, (school) => school.guid, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ foreignKeyConstraintName: 'sincs_schools_fk' }),
    __metadata("design:type", school_entity_1.SchoolEntity)
], SyncEntity.prototype, "school", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], SyncEntity.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], SyncEntity.prototype, "turma", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], SyncEntity.prototype, "turmaAluno", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], SyncEntity.prototype, "disciplinaProfesor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], SyncEntity.prototype, "disciplina", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], SyncEntity.prototype, "periodo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: SyncTypeEnum, nullable: false }),
    __metadata("design:type", String)
], SyncEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], SyncEntity.prototype, "from", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: false, default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], SyncEntity.prototype, "to", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: SyncStateEnum, nullable: false, default: SyncStateEnum.PENDING }),
    __metadata("design:type", String)
], SyncEntity.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], SyncEntity.prototype, "error", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], SyncEntity.prototype, "finishedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], SyncEntity.prototype, "createdAt", void 0);
SyncEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'Syncs' })
], SyncEntity);
exports.SyncEntity = SyncEntity;
//# sourceMappingURL=sync.entity.js.map