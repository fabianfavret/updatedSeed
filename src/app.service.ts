import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo(): any {
    return {
      description: 'Microservice API - OneClick ()',
      version: '1.1.1'
    };
  }
}
