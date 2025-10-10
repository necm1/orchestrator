import { writeFileSync } from 'fs';
import { join } from 'path';
import { Project } from 'ts-morph';

export function generate() {
  const project: Project = new Project({
    tsConfigFilePath: 'tsconfig.base.json',
  });

  const sourceFiles = project.getSourceFiles(
    'apps/graphql-api/src/**/*.input.ts'
  );

  sourceFiles.forEach((sf) => {
    sf.getClasses().forEach((cls) => {
      if (!cls.getDecorator('InputType')) {
        return;
      }

      const name = cls.getName();
      const fields = cls.getProperties();

      // console.log(name, fields);

      const zodLines: string[] = [];

      zodLines.push(`export const ${name}Schema = z.object({`);

      fields.forEach((f) => {
        const propName = f.getName();
        const decorators = f.getDecorators();

        let line = `  ${propName}: z.string()`;

        decorators.forEach((d) => {
          const dName = d.getName();
          const args = d.getArguments().map((a) => a.getText());

          if (dName === 'MinLength') {
            line += `.min(${args[0]}, ${args[1] ?? `"MinLength ${propName}"`})`;
          }
          if (dName === 'MaxLength') {
            line += `.max(${args[0]}, ${args[1] ?? `"MaxLength ${propName}"`})`;
          }
          // weitere Dekoratoren: Matches, Length, etc.
        });

        line += ',';
        zodLines.push(line);
      });

      zodLines.push('});');
      const out = join('packages/shared/src/validation', `${name}.schema.ts`);
      writeFileSync(
        out,
        `import { z } from "zod";\n\n${zodLines.join('\n')}\n`
      );
    });
  });

  console.log(sourceFiles);
}
