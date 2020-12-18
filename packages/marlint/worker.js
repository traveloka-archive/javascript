const { ESLint } = require('eslint');

exports.lint = function runESLint(paths, options) {
  const engine = new ESLint(options);
  return engine.lintFiles(paths, options);
};
