const path = require('path');
const pkgConf = require('pkg-conf');
const globby = require('globby');
const eslint = require('./eslint')

function getPackageEntries(workspacePaths, cwd) {
  return workspacePaths.reduce((result, workspace) => {
    return result.concat(globby.sync(workspace, { onlyDirectories: true, cwd }))
  }, []);
}

exports.getPaths = function getWorkspacePaths(opts) {
  const workspaceConfig = pkgConf.sync('workspaces', opts);

  if (Array.isArray(workspaceConfig)) {
    // default workspace config
    // { "workspaces": ["packages/*"] }
    return getPackageEntries(workspaceConfig, opts.cwd);
  }

  if (Array.isArray(workspaceConfig.packages)) {
    // workspace with nohoist options
    return getPackageEntries(workspaceConfig.packages, opts.cwd);
  }

  // no workspace config, try detecting lerna
  try {
    const lernaConfigPath = path.resolve(opts.cwd, 'lerna.json');
    const lerna = require(lernaConfigPath);
    // https://github.com/lerna/lerna/releases/tag/v2.0.0-beta.31
    lerna.packages = lerna.packages || ['packages/*'];
    return getPackageEntries(lerna.packages, opts.cwd);
  } catch (err) {
    return [];
  }
}

function groupPathsByPackage(paths, workspacePaths, defaultOpts) {
  const packages = workspacePaths.map(workspacePath => {
    const workspaceOpts = pkgConf.sync('marlint', { cwd: workspacePath })
    const mergedOpts = {
      ...defaultOpts,
      marlint: {
        ignores: defaultOpts.marlint.ignores.concat(workspaceOpts.ignores || []),
      },
      eslint: {
        ...defaultOpts.eslint,
        rules: { ...defaultOpts.eslint.rules, ...workspaceOpts.rules },
        globals: defaultOpts.eslint.globals.concat(workspaceOpts.globals || []),
      }
    };

    return {
      paths: [],
      options: mergedOpts,
    }
  });

  // add 1 more for grouping files outside workspace
  packages.push({
    paths: [],
    options: defaultOpts,
  });
  const fallbackIndex = packages.length - 1;

  paths.forEach(filePath => {
    const index = workspacePaths.findIndex(workspacePath => filePath.includes(workspacePath));
    if (index === -1) {
      packages[fallbackIndex].paths.push(filePath);
    } else {
      packages[index].paths.push(filePath);
    }
  });

  return packages;
}

exports.runESLint = function runESLintAcrossWorkspace(paths, workspacePaths, defaultOpts) {
  const packages = groupPathsByPackage(paths, workspacePaths, defaultOpts);
  return Promise.all(
    packages.map(pkg => {
      return eslint.run(pkg.paths, pkg.options);
    })
  ).then(eslint.mergeReports);
}
