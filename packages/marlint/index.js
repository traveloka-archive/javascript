/* eslint prefer-arrow-callback: 0 */
'use strict';
const eslint = require('eslint');
const globby = require('globby');
const minimatch = require('minimatch');
const pkgConf = require('pkg-conf');
const getOptionsForPath = require('./lib/getOptionsForPath');
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
    results,
  };
}

function processReport(report, opts) {
  report.results = opts.quiet
    ? eslint.CLIEngine.getErrorResults(report.results)
    : report.results;
  return report;
}

function runEslint(paths, options) {
  const ignores = options.marlint.ignores;

  if (ignores) {
    // eslint-disable-next-line no-param-reassign
    paths = paths.filter(path => {
      return !ignores.some(pattern => minimatch(path, pattern));
    });
  }

  const engine = new eslint.CLIEngine(options.eslint);
  const report = engine.executeOnFiles(paths, options.eslint);

  return processReport(report, options);
}

exports.lintText = function lintText(str, opts) {
  const path = opts.filename;
  const runtimeOptions = { quiet: opts.quiet, fix: opts.fix };
  const options = getOptionsForPath(path, runtimeOptions);

  const engine = new eslint.CLIEngine(options.eslint);
  return engine.executeOnText(str, path);
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
      // lerna monorepo with possible options difference for each package
      const multiPaths = getMultiPaths(paths, opts);
      return mergeReports(
        multiPaths.map(pkg => runEslint(pkg.paths, pkg.options))
      );
    }

    const options = getOptionsForPath(paths[0], opts);
    return runEslint(paths, options);
  });
};

exports.getFormatter = eslint.CLIEngine.getFormatter;
exports.getErrorResults = eslint.CLIEngine.getErrorResults;
exports.outputFixes = eslint.CLIEngine.outputFixes;
