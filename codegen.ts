import type { CodegenConfig } from '@graphql-codegen/cli';
const config: CodegenConfig = {
    schema: 'packages/shared-gql/schema.gql',
    documents: ['apps/web/**/*.{graphql,gql}'],
    generates: {
        'apps/web/src/gql/': { preset: 'client', plugins: [] },
    },
};
export default config;
