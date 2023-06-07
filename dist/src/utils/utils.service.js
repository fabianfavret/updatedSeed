"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var UtilsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilsService = void 0;
const common_1 = require("@nestjs/common");
let UtilsService = UtilsService_1 = class UtilsService {
    clearUrlPath(url) {
        return url.charAt(url.length - 1) === '/' ? url.substring(0, url.length - 1) : url;
    }
    getTangerineRol(papel) {
        switch (papel) {
            case 'aluno':
                return 'R01';
            case 'professor':
                return 'R02';
            case 'administrador':
            case 'colaborador':
            case 'coordenador':
            case 'diretor':
            case 'responsavel':
                return 'R04';
        }
    }
    getTimezone() {
        const d = new Date().toString();
        return (d.substring(d.search('GMT'), d.length).split(' ')[0].split('GMT')[1].substring(0, 3) +
            ':' +
            d.substring(d.search('GMT'), d.length).split(' ')[0].split('GMT')[1].substring(3));
    }
    getYYYYMMDDDateFormat(date, includeTime = true) {
        try {
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            return `${date.getFullYear()}-${month}-${day}${includeTime ? ` ${date.getUTCHours()}:${date.getMinutes()}:${date.getSeconds()}` : ''}`;
        }
        catch (error) {
            throw new Error(`${UtilsService_1.name}(getYYYYMMDDDateFormat): ${error.message}`);
        }
    }
    getFullURL(params) {
        let path = params.url.toString();
        if (params.path) {
            Object.keys(params.path).forEach((key) => {
                path = params.url.toString().replace(`{${key}}`, params.path[key]);
            });
        }
        const query = [];
        if (params.query) {
            Object.keys(params.query).forEach((key) => {
                query.push(`${key}=${params.query[key]}`);
            });
        }
        return this.clearUrlPath(params.baseURL) + path + (query.length ? `?${query.join('&')}` : '');
    }
    isObj1ContainedObj2(params) {
        let isEquals = true;
        if (isEquals) {
            Object.keys(params.obj2).forEach((key) => {
                var _a;
                if (!((_a = params.obj1) === null || _a === void 0 ? void 0 : _a.hasOwnProperty(key))) {
                    isEquals = false;
                }
            });
        }
        if (isEquals) {
            Object.keys(params.obj2).forEach((key) => {
                if (params.obj2[key] !== params.obj1[key]) {
                    isEquals = false;
                }
            });
        }
        return isEquals;
    }
};
UtilsService = UtilsService_1 = __decorate([
    (0, common_1.Injectable)()
], UtilsService);
exports.UtilsService = UtilsService;
//# sourceMappingURL=utils.service.js.map