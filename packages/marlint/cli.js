#!/usr/bin/env node
'use strict';
const fs = require('fs');
const updateNotifier = require('update-notifier');
const meow = require('meow');
const pretty = require('eslint-formatter-pretty');
const { ESLint, CLIEngine } = require('eslint');
const marlint = require('./');

const stylish = CLIEngine.getFormatter();

const cli = meow(
  {
    help: [
      'Usage',
      '  $ marlint [<file|glob> ...]',
      '',
      'Options',
      '  --quiet           Disable warning errors',
      '  --fix             Automagically fixes code',
      '  --json            Output JSON result to be consumed in other app',
      '  --verbose         Show debug log',
      '',
      'Examples',
      '  $ marlint',
      '  $ marlint --fix',
      '  $ marlint --quiet --json lint-result.json',
      '',
      'Tips',
      '  Put options in package.json instead of using flags so other tools can read it.',
    ],
  },
  {
    boolean: ['quiet', 'fix', 'verbose'],
  }
);

updateNotifier({ pkg: cli.pkg }).notify();

const input = cli.input;
const opts = cli.flags;

marlint
  .lintFiles(input, opts)
  .then((results) => {
    if (opts.fix) {
      ESLint.outputFixes(report);
    }

    if (opts.verbose) {
      console.log('Lint finished');
    }

    if (opts.quiet) {
      results = ESLint.getErrorResults(results);
    }

    const output = stylish(results);

    if (opts.json) {
      const formatter = CLIEngine.getFormatter('json');
      fs.writeFileSync(opts.json, formatter(results));
      process.stdout.write(`Test results written to: ${opts.json}\n`);
    }

    process.stdout.write(output);
    process.exit(getErrorCount(results) === 0 ? 0 : 1);
  })
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  });

function getErrorCount(results) {
  return results.reduce((acc, res) => acc + res.errorCount, 0);
}
