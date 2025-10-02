import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@orchestrator/api-utils';
import { User } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrmUserService extends BaseRepository<User> {
    constructor(
        @InjectRepository(User)
        public userRepository: Repository<User>
    ) {
        super(
            userRepository.target,
            userRepository.manager,
            userRepository.queryRunner
        );
    }
}
