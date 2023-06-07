"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const LOGGER = new common_1.Logger('API');
if (!process.env.TZ) {
    LOGGER.error('Enviroment TZ is necessary');
    process.exit(0);
}
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: process.env.NODE_ENV === 'development' ? ['log', 'debug', 'error', 'verbose', 'warn'] : ['log', 'error', 'warn']
    });
    const config = app.get(config_1.ConfigService);
    const basepath = config.get('BASEPATH').charAt(process.env.BASEPATH.length - 1) === '/'
        ? config.get('BASEPATH').charAt(config.get('BASEPATH').length - 1)
        : config.get('BASEPATH');
    app.setGlobalPrefix(basepath);
    const configSwagger = new swagger_1.DocumentBuilder()
        .setTitle(config.get('DESCRIPTION'))
        .setVersion('1.0')
        .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header', description: 'API Key For External calls' })
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, configSwagger);
    swagger_1.SwaggerModule.setup(`${basepath}/api-docs`, app, document);
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
    await app.listen(config.get('PORT'));
    LOGGER.log(`API Time Zone - ${config.get('TZ')}`);
    LOGGER.log(`API Started - ${await app.getUrl()}/${basepath}`);
    LOGGER.log(`Swagger Docs - ${await app.getUrl()}/${basepath}/api-docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map