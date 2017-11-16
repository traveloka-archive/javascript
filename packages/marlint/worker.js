const eslint = require('eslint');

exports.lint = function(paths, options) {
  const engine = new eslint.CLIEngine(options);
  return engine.executeOnFiles(paths, options);
};
