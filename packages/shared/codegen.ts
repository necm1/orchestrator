import type { CodegenConfig } from '@graphql-codegen/cli';
import { join } from 'path';

const config: CodegenConfig = {
  overwrite: true,
  schema: join(process.cwd(), '../../schema.gql'),
  allowPartialOutputs: true,
  debug: true,
  generates: {
    'src/graphql/types.ts': {
      plugins: ['typescript', 'typescript-operations', 'fragment-matcher'],
      config: {
        // maybeValue: 'T | null',
        preResolveTypes: true,
        skipTypename: true,
        // extractAllFieldsToTypes: true,
        // enumsAsTypes: false,
        // namingConvention: 'keep',
        // declarationKind: 'interface',
      },
    },
    'src/graphql/validation.ts': {
      plugins: ['typescript-validation-schema'],
      config: {
        importFrom: './types',
        schema: 'zodv4',
        zodImportPath: 'zodv4',
        typeSuffix: 'Validation',
        schemaNamespacedImportName: 'types',
        validationSchemaExportType: 'const',
        scalarSchemas: {
          schema: 'zodv4',
          DateTime: 'z.string().datetime()',
          JSON: 'z.any()',
          UUID: 'z.string().uuid()',
          Upload: 'z.any()',
          Email: 'z.string().email()',
          defaultScalarSchema: 'z.unknown()',
        },
        directives: {
          required: {
            msg: 'required',
          },
          constraint: {
            minLength: ['min', '$1'],
            maxLength: ['max', '$1'],
            format: {
              uri: ['url'],
              email: ['email'],
            },
          },
        },
        //       directives:
        // constraint:
        //   minLength: min
        //   # Replace $1 with specified `startsWith` argument value of the constraint directive
        //   startsWith: [regex, /^$1/, message]
        //   format:
        //     # This example means `validation-schema: directive-arg`
        //     # directive-arg is supported String and Enum.
        //     email: email
      },
    },
    // 'src/graphql/react/': {
    //   preset: 'client',
    //   plugins: ['typescript', 'typescript-operations', 'fragment-matcher'],
    // },
  },
};

export default config;
