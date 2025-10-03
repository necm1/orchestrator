import { gql } from '@apollo/client';
import { getClient } from '../lib/apollo';

export async function getUsers() {
  const { data } = await getClient().query({
    query: gql`
      query GetUsers {
        users {
          id
          name
        }
      }
    `,
  });

  return data;
}
