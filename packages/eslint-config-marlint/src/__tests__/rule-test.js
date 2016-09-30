/* eslint-env jest */
/* eslint no-warning-comments: 0 */
const path = require('path');

const { exec } = require('child_process');
const eslintPath = require.resolve('../../../../node_modules/eslint/bin/eslint');
const eslintJsonFormat = `--format=${require.resolve('../../../../node_modules/eslint-json')}`;
const eslintCustomConfig = `-c ${require.resolve('../')}`;

function runEslint(file) {
  // HACK, we can't use eslint module in unit test here because using babel-eslint
  // as a parser will monkeypatch eslint code (which we already require in this test)
  // that's why some rules become broken with weird error (see #1)
  return new Promise(resolve => {
    exec(`${eslintPath} ${eslintJsonFormat} ${eslintCustomConfig} ${file}`, { encoding: 'utf-8' }, (_, stdout, stderr) => {
      const result = JSON.parse(stdout);
      resolve(result[0].messages);
    });
  });
}

describe('eslint-config-marlint', () => {
  it('block offending rule', async () => {
    const file = path.join(__dirname, './fixture-error.js');
    let errors = await runEslint(file);

    errors = errors.map(err => ({
      ruleId: err.ruleId,
      severity: err.severity,
      line: err.line,
      column: err.column,
      source: err.source,
    }));

    expect(errors).toMatchSnapshot();
  });

  it('pass on correct code', async () => {
    const file = path.join(__dirname, './fixture-pass.js');
    const errors = await runEslint(file);

    expect(errors.length).toEqual(0);
  });
});
