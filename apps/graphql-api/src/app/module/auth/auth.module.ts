import { Module } from '@nestjs/common';
import { AuthModule as APIAuthModule } from '@orchestrator/api-auth';
import { AuthResolver } from './resolver/auth.resolver';

@Module({
  imports: [APIAuthModule],
  providers: [AuthResolver],
})
export class AuthModule {}
