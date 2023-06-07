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
var UserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const defatul_service_1 = require("../../../defaults/defatul.service");
const tangerine_service_1 = require("../../../services/tangerine/tangerine.service");
const utils_service_1 = require("../../../utils/utils.service");
let UserService = UserService_1 = class UserService extends defatul_service_1.DefaultService {
    constructor() {
        super(UserService_1);
    }
    async _create(params) {
        var _a;
        try {
            this.logger.debug(`_create: ${params.user.id}`);
            if (!params.noCheck) {
                const getUsers = await this.tangerineService.get({ url: tangerine_service_1.TANGERINE_URL.GET_USER, query: { guid: params.user.id } });
                if (getUsers.users.length) {
                    return await this._update({ user: params.user, noCheck: true });
                }
            }
            this.logger.debug(`Create User: ${params.user.id}`);
            await this.tangerineService.post({
                url: tangerine_service_1.TANGERINE_URL.POST_USER,
                payload: {
                    guid: params.user.id,
                    username: params.user.id,
                    name: (_a = params.user.nome_usuario) !== null && _a !== void 0 ? _a : params.user.codigo_usuario,
                    role: this.utilsService.getTangerineRol(params.user.papel),
                    noCreateSchool: 1
                }
            });
        }
        catch (error) {
            throw new Error(`[_create]:${error.message}`);
        }
    }
    async _update(params) {
        var _a, _b;
        try {
            this.logger.debug(`_update: ${params.user.id}`);
            const getUsers = await this.tangerineService.get({ url: tangerine_service_1.TANGERINE_URL.GET_USER, query: { guid: params.user.id } });
            if (!params.noCheck) {
                if (!getUsers.users.length) {
                    return await this._create({ user: params.user, noCheck: true });
                }
            }
            this.logger.debug(`Update User: ${params.user.id}`);
            const userTNG = getUsers.users[0];
            if (this.utilsService.isObj1ContainedObj2({ obj1: userTNG, obj2: { name: (_a = params.user.nome_usuario) !== null && _a !== void 0 ? _a : params.user.codigo_usuario } })) {
                this.logger.debug('Update User', params.user.id);
                await this.tangerineService.put({
                    url: tangerine_service_1.TANGERINE_URL.PUT_USER,
                    path: { guid: params.user.id },
                    payload: {
                        name: (_b = params.user.nome_usuario) !== null && _b !== void 0 ? _b : params.user.codigo_usuario,
                        noCreateSchool: 1
                    }
                });
            }
        }
        catch (error) {
            throw new Error(`[_update]:${error.message}`);
        }
    }
    async _delete(params) {
        try {
            this.logger.debug(`_delete: ${params.user.id}`);
            const getUsers = await this.tangerineService.get({ url: tangerine_service_1.TANGERINE_URL.GET_USER, query: { guid: params.user.id } });
            if (!getUsers.users.length) {
                return this.logger.log(`Discard Delete User: ${params.user.id}`);
            }
            const getCourses = await this.tangerineService.get({ url: tangerine_service_1.TANGERINE_URL.GET_COURSE, query: { 'users[]': params.user.id } });
            if (getCourses.courses.length) {
                for (const course of getCourses.courses) {
                    await this.tangerineService.delete({
                        url: tangerine_service_1.TANGERINE_URL.DELETE_LINK_USERS_COURSE,
                        path: { courseGuid: course.guid },
                        payload: { guid: [params.user.id] }
                    });
                }
            }
        }
        catch (error) {
            throw new Error(`[_delete]:${error.message}`);
        }
    }
    async sync(params) {
        try {
            const response = {
                insert: 0,
                update: 0,
                delete: 0
            };
            for (const event of params.events) {
                switch (event.operacao) {
                    case 'insert':
                        await this._create({ user: event.obj });
                        response.insert++;
                        break;
                    case 'update':
                        await this._update({ user: event.obj });
                        response.update++;
                        break;
                    case 'delete':
                        await this._delete({ user: event.obj });
                        response.delete++;
                        break;
                }
            }
            return response;
        }
        catch (error) {
            throw new Error(`${UserService_1.name}(sync):${error.message}`);
        }
    }
};
__decorate([
    (0, common_1.Inject)(tangerine_service_1.TangerineService),
    __metadata("design:type", tangerine_service_1.TangerineService)
], UserService.prototype, "tangerineService", void 0);
__decorate([
    (0, common_1.Inject)(utils_service_1.UtilsService),
    __metadata("design:type", utils_service_1.UtilsService)
], UserService.prototype, "utilsService", void 0);
UserService = UserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map