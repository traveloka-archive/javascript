const eslint = require('eslint');

exports.lint = function(path, options) {
  const engine = new eslint.CLIEngine(options);
  return engine.executeOnFiles([path], options);
};
