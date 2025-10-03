import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: '../../schema.gql',
  generates: {
    'src/graphql/types.ts': {
      plugins: ['typescript', 'typescript-operations', 'fragment-matcher'],
    },
  },
};

export default config;
