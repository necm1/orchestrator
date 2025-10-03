import { IsNotEmpty, IsUUID, MaxLength, MinLength } from 'class-validator';

export class PayloadDto {
  @IsNotEmpty()
  @IsUUID('4')
  sub: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(10)
  username: string;
}
