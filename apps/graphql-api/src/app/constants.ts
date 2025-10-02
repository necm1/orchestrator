import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

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
};
