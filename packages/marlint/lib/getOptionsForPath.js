const deepAssign = require('deep-assign');
const path = require('path');

function getOptionsForPath(filePath, options) {
  const cwd = options.cwd || process.cwd();
  const absolutePath =
    filePath.charAt(0) === '/' ? filePath : path.resolve(cwd, filePath);

  if (absolutePath.indexOf('packages') === -1) {
    // non lerna package
    return {
      marlint: {
        ignores: [],
      },
      eslint: {
        useEslintrc: false,
        baseConfig: {
          extends: 'marlint',
        },
        quiet: Boolean(options.quiet),
        fix: Boolean(options.fix),
      },
    };
  }

  let packageConfig = {};
  let rootConfig = {};

  // /User/fatih/work/web/packages/path/to/file.js
  const splitPath = absolutePath.split('/packages/');

  try {
    const packageName = splitPath[1].split('/')[0];
    const packageJsonPath = `${splitPath[0]}/packages/${packageName}/package.json`;
    const json = require(packageJsonPath);
    packageConfig = json.marlint || {};
  } catch (err) {}

  try {
    const rootJsonPath = `${splitPath[0]}/package.json`;
    const json = require(rootJsonPath);
    rootConfig = json.marlint || {};
  } catch (err) {}

  const mergedConfig = deepAssign(packageConfig, rootConfig);

  return {
    marlint: {
      ignores: mergedConfig.ignores,
    },
    eslint: {
      useEslintrc: false,
      baseConfig: {
        extends: 'marlint',
      },
      rules: mergedConfig.rules || {},
      globals: mergedConfig.globals || [],
      quiet: Boolean(options.quiet),
      fix: Boolean(options.fix),
    },
  };
}

module.exports = getOptionsForPath;
