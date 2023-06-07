import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from '../config/typeorm.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileLoadsModule } from './dto/fileLoads/fileLoads.module';
import { AuthModule } from './services/auth/auth.module';

// const envFilePath: string = getEnvPath(`${__dirname}/config/envs`);

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }), AuthModule, FileLoadsModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
