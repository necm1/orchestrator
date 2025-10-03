import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '@orchestrator/api-auth';
import { AuthCredentialInput } from '../interface/auth-credential.input';
import { AuthResponse } from '../interface/auth-response.output';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  public async signIn(
    @Args('authCredentialInput') authCredentialInput: AuthCredentialInput
  ) {
    const user = await this.authService.validateUser(authCredentialInput);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    return this.authService.signIn(user);
  }
}
