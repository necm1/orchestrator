import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
declare module 'graphql' {
  interface GraphQLFormattedErrorExtensions {
    originalError?: { message?: unknown[] };
    code?: number;
  }

  interface GraphQLFormattedError {
    originalError?: { message?: unknown[] };
  }
}

export const driverConfig: ApolloDriverConfig = {
  driver: ApolloDriver,
  autoSchemaFile: './schema.gql',
  debug: true,
  persistedQueries: false,
  context: ({
    req,
    res,
    connection,
  }: {
    req: unknown;
    res: unknown;
    connection: unknown;
  }) => {
    return { req, res };
  },
  // formatError: (formattedError: GraphQLFormattedError, error: unknown) => ({
  //   message: formattedError.extensions
  //     ? formattedError.extensions?.originalError?.message?.join(', ')
  //     : formattedError.message,
  //   path: formattedError.path,
  //   locations: formattedError.locations,
  //   extensions: {
  //     code: formattedError.extensions?.code,
  //   },
  // }),
};
