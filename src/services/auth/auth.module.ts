import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthHeaderApiKeyStrategy } from './auth-header-api-key.strategy';

@Module({
  imports: [PassportModule],
  providers: [AuthHeaderApiKeyStrategy]
})
export class AuthModule {}
