import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { OrmUserService } from './service/user.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [OrmUserService],
    exports: [OrmUserService],
})
export class OrmUserModule {}
