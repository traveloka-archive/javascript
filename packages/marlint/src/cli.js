#!/usr/bin/env node
'use strict';
const fs = require('fs');
const updateNotifier = require('update-notifier');
const getStdin = require('get-stdin');
const meow = require('meow');
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

function log(report) {
  if (opts.compact) {
    opts.reporter = 'compact';
  }

  process.stdout.write(marlint.getFormatter(opts.reporter)(report.results));

  if (opts.json) {
    const eslintJson = require.resolve('eslint-json');
    const result = marlint.getFormatter(eslintJson)(report.results);

    if (opts.jsonOutputFile) {
      fs.writeFileSync(opts.jsonOutputFile, result);
      process.stdout.write(`Test results written to: ${opts.jsonOutputFile}`);
    } else {
      process.stdout.write(result);
    }
  }

  process.exit(report.errorCount === 0 ? 0 : 1);
}

// `marlint -` => `marlint --stdin`
if (input[0] === '-') {
  opts.stdin = true;
  input.shift();
}

function isErrorMessage(message) {
  return message.severity === 2;
}

function surpressWarning(results) {
  const filtered = [];

  results.forEach(result => {
    const filteredMessages = result.messages.filter(isErrorMessage);

    if (filteredMessages.length > 0) {
      filtered.push({
        filePath: result.filePath,
        messages: filteredMessages,
      });
    }
  });

  return filtered;
}

if (opts.stdin) {
  getStdin().then(str => {
    log(marlint.lintText(str, opts));
  });
} else {
  marlint.lintFiles(input, opts).then(report => {
    if (opts.fix) {
      marlint.outputFixes(report);
    }

    if (opts.quiet) {
      report.results = surpressWarning(report.results);
    }

    log(report);
  });
}
