import { Injectable } from '@nestjs/common';
import { OrmUserService, User } from '@orchestrator/api-orm';
import { AuthCredentialDto } from 'src/dto/auth-credential.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: OrmUserService,
    private readonly jwtService: JwtService
  ) {}

  public async validateUser({
    name,
    password,
  }: AuthCredentialDto): Promise<User | null> {
    const user = await this.userService.findOne({
      where: { name },
      select: ['id', 'name', 'password'],
    });

    if (!user || (await argon2.verify(user.password, password)) === false) {
      return null;
    }

    return user;
  }

  public async signIn(
    user: User
  ): Promise<{ user: User; access_token: string }> {
    const payload = {
      username: user.name,
      sub: user.id,
    };

    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
