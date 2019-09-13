const fs = require('fs');
const path = require('path');
const eslint = require('eslint');
const tempWrite = require('temp-write');

const DEFAULT_CONFIG = require('../../index');

function runEslint(file, conf = DEFAULT_CONFIG) {
  const str = fs.readFileSync(file, { encoding: 'utf-8' });
  const linter = new eslint.CLIEngine({
    useEslintrc: false,
    configFile: tempWrite.sync(JSON.stringify(conf)),
  });

  return linter
    .executeOnText(str)
    .results[0].messages // disable marlint plugin for now because eslint failed to load it
    .filter(m => !m.ruleId.startsWith('marlint'))
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

  errors = errors.map(err => ({
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
