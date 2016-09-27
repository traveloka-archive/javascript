#!/usr/bin/env node
'use strict';
var updateNotifier = require('update-notifier');
var getStdin = require('get-stdin');
var meow = require('meow');
var marlint = require('./');

var cli = meow({
  help: [
    'Usage',
    '  $ marlint [<file|glob> ...]',
    '',
    'Options',
    '  --compact       Compact output',
    '  --stdin         Validate code from stdin',
    '  --es5           Disable ES2015+ rules',
    '  --env           Environment preset  [Can be set multiple times]',
    '  --global        Global variable  [Can be set multiple times]',
    '  --ignore        Additional paths to ignore  [Can be set multiple times]',
    '  --quiet         Disable warning errors',
    '  --fix           Automagically fixes code',
    '',
    'Examples',
    '  $ marlint',
    '  $ marlint index.js',
    '  $ marlint *.js !foo.js',
    '  $ marlint --es5',
    '  $ marlint --env=node --env=mocha',
    '',
    'Tips',
    '  Put options in package.json instead of using flags so other tools can read it.'
  ]
}, {
  string: [
    '_'
  ],
  boolean: [
    'compact',
    'stdin'
  ]
});

updateNotifier({ pkg: cli.pkg }).notify();

var input = cli.input;
var opts = cli.flags;

function log(report) {
  if (opts.compact) {
    opts.reporter = 'compact';
  }

  process.stdout.write(marlint.getFormatter(opts.reporter)(report.results));
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
  var filtered = [];

  results.forEach(function (result) {
    var filteredMessages = result.messages.filter(isErrorMessage);

    if (filteredMessages.length > 0) {
      filtered.push({
        filePath: result.filePath,
        messages: filteredMessages
      });
    }
  });

  return filtered;
}

if (opts.stdin) {
  getStdin().then(function (str) {
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
