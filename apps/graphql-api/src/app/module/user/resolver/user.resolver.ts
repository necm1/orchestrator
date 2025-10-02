import { Resolver, Query } from '@nestjs/graphql';
import { User, OrmUserService } from '@orchestrator/api-orm';

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: OrmUserService) {}

    @Query(() => [User], { name: 'users' })
    findAll() {
        return this.userService.find({});
    }
}
