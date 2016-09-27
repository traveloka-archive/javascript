/* eslint-env jest */
const path = require('path');
const fs = require('fs');
const marlint = require('../');

const ESLINT_PASSED_FIXTURES = '../../../eslint-config-marlint/src/__tests__/fixture-pass.js';

describe('marlint', () => {
  it('expose lintText', () => {
    const fixture = path.join(__dirname, ESLINT_PASSED_FIXTURES);
    const file = fs.readFileSync(fixture, { encoding: 'utf-8' });
    const result = marlint.lintText(file);
    expect(result.errorCount).toEqual(0);
    expect(result.warningCount).toEqual(0);
  });
});
