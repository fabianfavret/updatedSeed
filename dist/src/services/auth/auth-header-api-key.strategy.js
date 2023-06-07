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
var AuthHeaderApiKeyStrategy_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthHeaderApiKeyStrategy = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const passport_headerapikey_1 = require("passport-headerapikey");
let AuthHeaderApiKeyStrategy = AuthHeaderApiKeyStrategy_1 = class AuthHeaderApiKeyStrategy extends (0, passport_1.PassportStrategy)(passport_headerapikey_1.default, 'x-api-key') {
    constructor() {
        super({ header: 'x-api-key', prefix: '' }, true, (apiKey, done, request) => {
            return this.validate(apiKey, done, request);
        });
        this.logger = new common_1.Logger(AuthHeaderApiKeyStrategy_1.name);
        this.validate = (apiKey, done, request) => {
            const { ip, method, originalUrl } = request;
            const userAgent = request.get('user-agent') || '';
            const message = `${method} ${originalUrl} - ${userAgent} [${ip}]`;
            if (this.config.get('API_KEY') !== apiKey) {
                this.logger.error(`UNAUTHORIZED ${message}`);
                return done(new common_1.UnauthorizedException(), null);
            }
            if (originalUrl.replace(/\//g, '') !== this.config.get('BASEPATH').replace(/\//g, '')) {
                this.logger.log(`AUTHORIZED ${message}`);
            }
            done(null, true);
        };
    }
};
__decorate([
    (0, common_1.Inject)(config_1.ConfigService),
    __metadata("design:type", config_1.ConfigService)
], AuthHeaderApiKeyStrategy.prototype, "config", void 0);
AuthHeaderApiKeyStrategy = AuthHeaderApiKeyStrategy_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AuthHeaderApiKeyStrategy);
exports.AuthHeaderApiKeyStrategy = AuthHeaderApiKeyStrategy;
//# sourceMappingURL=auth-header-api-key.strategy.js.map