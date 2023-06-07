import { Controller, Get, HttpCode, HttpStatus, Inject, Logger, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileLoadsService } from './fileLoads.service';

@Controller('load-file')
@ApiTags('load-file')
export class FileLoadsController {
  private readonly logger = new Logger(FileLoadsController.name);
  @Inject(FileLoadsService)
  private readonly fileLoadsService: FileLoadsService;

  @Get('/excel')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Load File ' })
  async processExcelFile(@Query() query: any): Promise<any> {
    try {
      this.logger.debug('processExcelFile');

      const login = await this.fileLoadsService.post({
        url: 'users/auth/login',
        payload: {
          username: 'admin@oneclick.es',
          password: '123'
        }
      });
      this.logger.debug(login.data.accessToken);
      this.fileLoadsService.processExcelFile({ query: query, token: login.data.accessToken });
      return { status: 'success' };
    } catch (error) {}
  }
}
