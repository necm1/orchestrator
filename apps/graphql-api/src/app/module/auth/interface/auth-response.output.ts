import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '@orchestrator/api-orm';

@ObjectType()
export class AuthResponse {
  @Field()
  access_token: string;

  @Field(() => User, { nullable: true })
  user: User | null;
}
