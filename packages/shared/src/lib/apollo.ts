// 'use client';
// import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
// import {
//   ApolloNextAppProvider,
//   SSRMultipartLink,
//   registerApolloClient,
// } from '@apollo/client-integration-nextjs';

// const createApolloClient = () => {
//   return new ApolloClient({
//     link: new HttpLink({
//       uri:
//         process.env.NEXT_PUBLIC_GRAPHQL_URL ?? 'http://localhost:3002/graphql',
//       credentials: 'include',
//     }),
//     cache: new InMemoryCache(),
//   });
// };

// export default createApolloClient;

import { HttpLink } from '@apollo/client';
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from '@apollo/client-integration-nextjs';

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri:
        process.env.NEXT_PUBLIC_GRAPHQL_URL ?? 'http://localhost:3002/graphql',
      fetchOptions: {},
    }),
  });
});
