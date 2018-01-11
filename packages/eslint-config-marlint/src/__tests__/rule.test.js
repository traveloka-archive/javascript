/* eslint-env jest */
/* eslint no-warning-comments: 0 */
const path = require('path');

const { exec } = require('child_process');
const eslintPath = require.resolve('../../node_modules/.bin/eslint');
const eslintJsonFormat = `--format=${require.resolve('../../node_modules/eslint-json')}`;
const eslintCustomConfig = `--config ${require.resolve('../')}`;

function runEslint(file) {
  // HACK, we can't use eslint module in unit test here because using babel-eslint
  // as a parser will monkeypatch eslint code (which we already require in this test)
  // that's why some rules become broken with weird error (see #1)
  return new Promise(resolve => {
    exec(`${eslintPath} ${eslintJsonFormat} ${eslintCustomConfig} ${file}`, { encoding: 'utf-8' }, (_, stdout, stderr) => {
      console.log('err', _);
      console.log('stdout', stdout);
      console.log('stderr', stderr);
      const result = JSON.parse(stdout);
      resolve(result[0].messages.sort((m1, m2) => {
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
      }));
    });
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
