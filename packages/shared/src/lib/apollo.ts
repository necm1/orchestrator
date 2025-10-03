'use client';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri:
        process.env.NEXT_PUBLIC_GRAPHQL_URL ?? 'http://localhost:3002/graphql',
      credentials: 'include',
    }),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
