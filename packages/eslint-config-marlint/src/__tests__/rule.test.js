const fs = require('fs');
const path = require('path');
const { ESLint } = require('eslint');
const tempWrite = require('temp-write');

const DEFAULT_CONFIG = require.resolve('../../index');

async function runEslint(file, configFile = DEFAULT_CONFIG) {
  const str = fs.readFileSync(file, { encoding: 'utf-8' });
  const linter = new ESLint({
    useEslintrc: false,
    overrideConfigFile: configFile,
  });

  const results = await linter.lintText(str);

  return results[0].messages
    .filter((m) => !m.ruleId.startsWith('marlint'))
    .sort((m1, m2) => {
      // sort by line number first
      if (m1.line > m2.line) {
        return 1;
      }

      if (m1.line < m2.line) {
        return -1;
      }

      // same line number, sort by column
      if (m1.column > m2.column) {
        return 1;
      }

      if (m1.column < m2.column) {
        return -1;
      }

      // same line number, same column, sort by rule id
      if (m1.ruleId > m2.ruleId) {
        return 1;
      }

      return -1;
    });
}

it('block offending rule', async () => {
  const file = path.join(__dirname, './fixture-error.js');
  let errors = await runEslint(file);

  errors = errors.map((err) => ({
    ruleId: err.ruleId,
    severity: err.severity,
    line: err.line,
    column: err.column,
  }));

  expect(errors).toMatchSnapshot();
});

it('pass on correct code', async () => {
  const file = path.join(__dirname, './fixture-pass.js');
  const errors = await runEslint(file);

  expect(errors.length).toEqual(0);
});
