import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AuthCredentialInput {
  @Field()
  name: string;

  @Field()
  password: string;
}
