const pkgConf = require('pkg-conf');

function getEslintConfig(opts) {
  const pkgOpts = pkgConf.sync('marlint', opts.cwd);
  const rules = pkgOpts.rules || {};
  const globals = pkgOpts.globals || [];

  return {
    useEslintrc: false,
    baseConfig: {
      extends: 'marlint',
    },
    rules,
    globals,
    quiet: opts.quiet,
    fix: opts.fix,
  };
}

module.exports = getEslintConfig;
