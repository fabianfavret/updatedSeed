import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const LOGGER = new Logger('API');
if (!process.env.TZ) {
  LOGGER.error('Enviroment TZ is necessary');
  process.exit(0);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: process.env.NODE_ENV === 'development' ? ['log', 'debug', 'error', 'verbose', 'warn'] : ['log', 'error', 'warn']
  });
  const config: ConfigService = app.get(ConfigService);

  const basepath =
    config.get<string>('BASEPATH').charAt(process.env.BASEPATH.length - 1) === '/'
      ? config.get<string>('BASEPATH').charAt(config.get<string>('BASEPATH').length - 1)
      : config.get<string>('BASEPATH');
  app.setGlobalPrefix(basepath);

  const configSwagger = new DocumentBuilder()
    .setTitle(config.get<string>('DESCRIPTION'))
    .setVersion('1.0')
    .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header', description: 'API Key For External calls' })
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup(`${basepath}/api-docs`, app, document);

  // para poder usar class-validaror
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(config.get<number>('PORT'));

  LOGGER.log(`API Time Zone - ${config.get<string>('TZ')}`);
  LOGGER.log(`API Started - ${await app.getUrl()}/${basepath}`);
  LOGGER.log(`Swagger Docs - ${await app.getUrl()}/${basepath}/api-docs`);
}
bootstrap();
