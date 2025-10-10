import { gql } from '@apollo/client';
import { getClient } from '../lib/apollo';
import type { AuthCredentialInput, Mutation } from '../graphql';

// TODO: change return type
export async function signIn({
  name,
  password,
}: AuthCredentialInput): Promise<Mutation['signIn'] | undefined> {
  const { data } = await getClient().mutate<Mutation>({
    mutation: gql`
      mutation signIn($input: AuthCredentialInput!) {
        signIn(authCredentialInput: $input) {
          access_token
          user {
            id
            name
          }
        }
      }
    `,
    variables: {
      input: {
        name,
        password,
      },
    },
  });

  return data?.signIn;
}
