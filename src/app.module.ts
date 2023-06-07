import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileLoadsModule } from './dto/fileLoads/fileLoads.module';
import { AuthModule } from './services/auth/auth.module';

// const envFilePath: string = getEnvPath(`${__dirname}/config/envs`);

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, FileLoadsModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
