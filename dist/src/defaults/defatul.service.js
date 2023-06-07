"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultService = void 0;
const common_1 = require("@nestjs/common");
class DefaultService {
    constructor(object) {
        this.object = object;
        this.logger = new common_1.Logger(this.object.name);
    }
}
exports.DefaultService = DefaultService;
//# sourceMappingURL=defatul.service.js.map