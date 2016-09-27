/* eslint prefer-arrow-callback: 0 */
'use strict';
const path = require('path');
const eslint = require('eslint');
const globby = require('globby');
const handleOpts = require('./handle-opts');

function patchSomeMessages(data) {
  data.results = data.results.map(result => {
    const fixedMessages = result.messages.map(message => {
      switch (message.ruleId) {
        case 'react/prefer-stateless-function':
          message.message = message.message.replace('should', 'could');
          break;
        default:
      }

      return message;
    });

    return Object.assign(result, { messages: fixedMessages });
  });

  return data;
}

exports.lintText = function lintText(str, opts) {
  opts = handleOpts(opts);
  const engine = new eslint.CLIEngine(opts._config);

  return patchSomeMessages(engine.executeOnText(str, opts.filename));
};

exports.lintFiles = function lintFiles(patterns, opts) {
  opts = handleOpts(opts);

  if (patterns.length === 0) {
    patterns = '**/*.{js,jsx}';
  }

  return globby(patterns, { ignore: opts.ignores }).then(paths => {
    // when users are silly and don't specify an extension in the glob pattern
    paths = paths.filter(x => {
      const ext = path.extname(x);

      return ext === '.js' || ext === '.jsx';
    });

    const engine = new eslint.CLIEngine(opts._config);

    return patchSomeMessages(engine.executeOnFiles(paths, opts._config));
  });
};

exports.getFormatter = eslint.CLIEngine.getFormatter;
exports.getErrorResults = eslint.CLIEngine.getErrorResults;
exports.outputFixes = eslint.CLIEngine.outputFixes;
