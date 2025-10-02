import { Module } from '@nestjs/common';
import { OrmUserModule } from '@orchestrator/api-orm';
import { UserResolver } from './resolver/user.resolver';

@Module({
    imports: [OrmUserModule],
    providers: [UserResolver],
})
export class UserModule {}
