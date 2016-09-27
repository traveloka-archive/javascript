var objectAssign = require('object-assign');
var arrify = require('arrify');
var pkgConf = require('pkg-conf');
var deepAssign = require('deep-assign');

var DEFAULT_IGNORE = [
  'node_modules/**',
  'bower_components/**',
  'coverage/**',
  '{tmp,temp}/**',
  '**/*.min.js',
  '**/bundle.js',
  'fixture.js',
  '{test/,}fixture{s,}/**'
];

var DEFAULT_CONFIG = {
  useEslintrc: false,
  baseConfig: {
    extends: 'marlint'
  }
};

module.exports = function handleOpts(opts) {
  opts = objectAssign({
    cwd: process.cwd()
  }, opts);

  opts = objectAssign({}, pkgConf.sync('marlint', opts.cwd), opts);

  // alias to help humans
  opts.envs = opts.envs || opts.env;
  opts.globals = opts.globals || opts.global;
  opts.ignores = opts.ignores || opts.ignore;
  opts.rules = opts.rules || opts.rule;

  opts.ignores = DEFAULT_IGNORE.concat(opts.ignores || []);

  opts._config = deepAssign({}, DEFAULT_CONFIG, {
    envs: arrify(opts.envs),
    globals: arrify(opts.globals),
    rules: opts.rules,
    quiet: opts.quiet,
    fix: opts.fix
  });

  if (!opts._config.rules) {
    opts._config.rules = {};
  }

  if (opts.es5) {
    opts._config.baseConfig = 'marlint/es5';
  }

  return opts;
};
