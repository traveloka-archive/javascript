const pkgConf = require('pkg-conf');
const merge = require('lodash.merge');
const path = require('path');

function buildOptions(packageOptions, runtimeOptions) {
  return {
    marlint: {
      ignores: packageOptions.ignores || [],
    },
    eslint: {
      useEslintrc: false,
      baseConfig: {
        extends: 'marlint',
      },
      parser: packageOptions.parser || 'babel-eslint',
      rules: packageOptions.rules || {},
      globals: packageOptions.globals || [],
      quiet: Boolean(runtimeOptions.quiet),
      fix: Boolean(runtimeOptions.fix),
    },
  };
}

function getOptionsForPath(filePath, runtimeOptions) {
  const cwd = runtimeOptions.cwd || process.cwd();
  const absolutePath =
    filePath.charAt(0) === '/' ? filePath : path.resolve(cwd, filePath);

  if (absolutePath.indexOf('/packages/') === -1) {
    // Not a lerna package, use single package.json
    const packageOptions = pkgConf.sync('marlint', { cwd });
    return buildOptions(packageOptions, runtimeOptions);
  }

  // Get lerna root directory and package root directory to find specific config
  // in package.json. Package specific config will overrides root specific config
  const [rootLernaDir, relativeFilePath] = absolutePath.split('/packages/');
  const [packageName, ..._] = relativeFilePath.split('/');
  const packageDir = `${rootLernaDir}/packages/${packageName}`;

  const packageConfig = pkgConf.sync('marlint', { cwd: packageDir });
  const rootConfig = pkgConf.sync('marlint', { cwd: rootLernaDir });
  const packageOptions = merge({}, rootConfig, packageConfig);

  return buildOptions(packageOptions, runtimeOptions);
}

module.exports = getOptionsForPath;
