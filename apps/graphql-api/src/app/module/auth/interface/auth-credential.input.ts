import { Field, InputType } from '@nestjs/graphql';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

@InputType()
export class AuthCredentialInput {
  @Field(() => String)
  @IsString()
  @MinLength(3, {
    message: 'Der Benutzername muss mindestens 3 Zeichen enthalten',
  })
  @MaxLength(50, {
    message: 'Der Benutzername darf höchstens 50 Zeichen enthalten',
  })
  name: string;

  @Field(() => String)
  @IsString()
  @MinLength(8, { message: 'Das Passwort muss mindestens 8 Zeichen enthalten' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d).+$/, {
    message:
      'Das Passwort muss mindestens einen Buchstaben und eine Zahl enthalten',
  })
  password: string;
}
