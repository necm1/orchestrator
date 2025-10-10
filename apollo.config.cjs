module.exports = {
  client: {
    service: {
      name: 'orchestrator-graphql-api',
      localSchemaFile: './schema.gql',
    },
    includes: ['**/*.{js,jsx,ts,tsx}'],
    excludes: ['**/src/graphql/**', 'node_modules/**'],
  },
};
