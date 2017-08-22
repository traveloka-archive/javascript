/* eslint prefer-arrow-callback: 0 */
'use strict';
const eslint = require('eslint');
const globby = require('globby');
const pkgConf = require('pkg-conf');
const getEslintConfig = require('./lib/getEslintConfig');
const getMultiPaths = require('./lib/getMultiPaths');

const DEFAULT_IGNORES = [
  '**/node_modules/**',
  'bower_components/**',
  'coverage/**',
  '{tmp,temp}/**',
  '**/*.min.js',
  '**/bundle.js',
  'fixture.js',
  '{test/,}fixture{s,}/**',
];

function mergeReports(reports) {
  // Merge multiple reports into a single report
  let results = [];
  let errorCount = 0;
  let warningCount = 0;

  for (const report of reports) {
    results = results.concat(report.results);
    errorCount += report.errorCount;
    warningCount += report.warningCount;
  }

  return {
    errorCount,
    warningCount,
    results
  };
}

function processReport(report, opts) {
  report.results = opts.quiet ? eslint.CLIEngine.getErrorResults(report.results) : report.results;
  return report;
}

function runEslint(paths, opts) {
  const config = getEslintConfig(opts);
  const engine = new eslint.CLIEngine(config);
  const report = engine.executeOnFiles(paths, config);

  return processReport(report, opts);
}

exports.lintText = function lintText(str, opts) {
  const engine = new eslint.CLIEngine(getEslintConfig(opts));
  return engine.executeOnText(str, opts.filename);
};

exports.lintFiles = function lintFiles(patterns, opts) {
  const pkgOpts = pkgConf.sync('marlint', opts.cwd);
  const ignore = DEFAULT_IGNORES.concat(pkgOpts.ignores || []);

  let glob = patterns;
  if (patterns.length === 0) {
    glob = '**/*.js';
  }

  return globby(glob, { ignore }).then(paths => {
    if (paths.find(path => path.includes('packages/'))) {
      // lerna monorepo
      const multiPaths = getMultiPaths(paths);
      return mergeReports(multiPaths.map(paths => runEslint(paths, opts)));
    }

    return runEslint(paths, opts);
  });
};

exports.getFormatter = eslint.CLIEngine.getFormatter;
exports.getErrorResults = eslint.CLIEngine.getErrorResults;
exports.outputFixes = eslint.CLIEngine.outputFixes;
