import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { FileLoadsController } from './fileLoads.controller';
import { FileLoadsService } from './fileLoads.service';

@Module({
  imports: [HttpModule],
  providers: [FileLoadsService],
  controllers: [FileLoadsController]
})
export class FileLoadsModule {}
