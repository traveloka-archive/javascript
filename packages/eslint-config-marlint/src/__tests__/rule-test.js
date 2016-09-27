/* eslint-env jest */
const path = require('path');
const fs = require('fs');
const eslint = require('eslint');
const tempWrite = require('temp-write');

function runEslint(str, conf) {
  const linter = new eslint.CLIEngine({
    useEslintrc: false,
    configFile: tempWrite.sync(JSON.stringify(conf))
  });

  return linter.executeOnText(str).results[0].messages;
}

describe('eslint-config-marlint', () => {
  it('block offending rule', () => {
    const conf = require('../');
    const fixture = path.join(__dirname, './fixture-error.js');
    const file = fs.readFileSync(fixture, { encoding: 'utf-8' });
    const errors = runEslint(file, conf).map(err => ({
      ruleId: err.ruleId,
      severity: err.severity,
      line: err.line,
      column: err.column,
      source: err.source
    }));

    expect(errors).toMatchSnapshot();
  });

  it('pass on correct code', () => {
    const conf = require('../');
    const fixture = path.join(__dirname, './fixture-pass.js');
    const file = fs.readFileSync(fixture, { encoding: 'utf-8' });
    const errors = runEslint(file, conf);

    expect(errors.length).toEqual(0);
  });
});
