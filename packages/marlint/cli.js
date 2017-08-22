#!/usr/bin/env node
'use strict';
const fs = require('fs');
const updateNotifier = require('update-notifier');
const getStdin = require('get-stdin');
const meow = require('meow');
const pretty = require('eslint-formatter-pretty');
const marlint = require('./');

const cli = meow({
  help: [
    'Usage',
    '  $ marlint [<file|glob> ...]',
    '',
    'Options',
    '  --quiet           Disable warning errors',
    '  --fix             Automagically fixes code',
    '  --json            Output JSON result to be consumed in other app',
    '  --jsonOutputFile  Specify filename to store the JSON result',
    '',
    'Examples',
    '  $ marlint',
    '  $ marlint --fix',
    '  $ marlint --quiet --json --jsonOutputFile lint-result.json',
    '',
    'Tips',
    '  Put options in package.json instead of using flags so other tools can read it.',
  ],
}, {
  boolean: [
    'json',
  ],
});

updateNotifier({ pkg: cli.pkg }).notify();

const input = cli.input;
const opts = cli.flags;

marlint.lintFiles(input, opts).then(report => {
  if (opts.fix) {
    marlint.outputFixes(report);
  }

  const output = pretty(report.results);

  if (opts.json) {
    const eslintJson = require.resolve('eslint-json');
    const result = marlint.getFormatter(eslintJson)(report.results);

    if (opts.jsonOutputFile) {
      fs.writeFileSync(opts.jsonOutputFile, result);
      process.stdout.write(`Test results written to: ${opts.jsonOutputFile}`);
    }
  }

  process.stdout.write(output);
  process.exit(report.errorCount === 0 ? 0 : 1);
});
