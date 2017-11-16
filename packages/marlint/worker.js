const eslint = require('eslint');

function processReport(report, options) {
  report.results = options.quiet
    ? eslint.CLIEngine.getErrorResults(report.results)
    : report.results;
  return report;
}

exports.lint = function(paths, options) {
  const engine = new eslint.CLIEngine(options);
  return processReport(engine.executeOnFiles(paths, options), options);
};
