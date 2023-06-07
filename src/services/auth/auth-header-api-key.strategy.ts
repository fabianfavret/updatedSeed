import { Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import Strategy from 'passport-headerapikey';

@Injectable()
export class AuthHeaderApiKeyStrategy extends PassportStrategy(Strategy, 'x-api-key') {
  @Inject(ConfigService)
  private readonly config: ConfigService;
  private readonly logger = new Logger(AuthHeaderApiKeyStrategy.name);

  constructor() {
    super({ header: 'x-api-key', prefix: '' }, true, (apiKey, done, request) => {
      return this.validate(apiKey, done, request);
    });
  }

  public validate = (apiKey: string, done: (error: Error, data) => any, request: Request) => {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';

    const message = `${method} ${originalUrl} - ${userAgent} [${ip}]`;

    if (this.config.get<string>('API_KEY') !== apiKey) {
      this.logger.error(`UNAUTHORIZED ${message}`);
      return done(new UnauthorizedException(), null);
    }

    if (originalUrl.replace(/\//g, '') !== this.config.get<string>('BASEPATH').replace(/\//g, '')) {
      this.logger.log(`AUTHORIZED ${message}`);
    }
    done(null, true);
  };
}
