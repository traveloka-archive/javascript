const os = require('os');
const micromatch = require('micromatch');
const Worker = require('jest-worker').default;

const MAX_WORKER = os.cpus().length;

const worker = new Worker(require.resolve('../worker'), {
  exposedMethods: ['lint'],
  numWorkers: MAX_WORKER,
});

function runESLintInsideWorker(paths, options) {
  const ignores = options.marlint.ignores;

  if (ignores) {
    // eslint-disable-next-line no-param-reassign
    paths = paths.filter(path => {
      return !ignores.some(pattern => {
        return micromatch.contains(path, pattern)
      });
    });
  }

  // we can't fill with empty array because reference
  const jobs = Array(MAX_WORKER)
    .fill('x')
    .map(x => []);

  return Promise.all(
    paths
      .reduce((jobs, path, index) => {
        // insert job round robin
        const idx = index % MAX_WORKER;
        jobs[idx].push(path);
        return jobs;
      }, jobs)
      .map(paths => worker.lint(paths, options.eslint))
  ).then(mergeESLintReports);
}

function mergeESLintReports(reports) {
  // Merge multiple ESLint reports into a single report
  let results = [];
  let errorCount = 0;
  let warningCount = 0;

  for (const report of reports) {
    results = results.concat(report.results);
    errorCount += report.errorCount;
    warningCount += report.warningCount;
  }

  return {
    errorCount,
    warningCount,
    results,
  };
}

function generateESLintOptions(pkgOpts, runtimeOpts) {
  return {
    marlint: {
      ignores: pkgOpts.ignores || [],
    },
    eslint: {
      useEslintrc: false,
      baseConfig: {
        extends: pkgOpts.typescript ? 'marlint/typescript' : 'marlint',
      },
      rules: pkgOpts.rules || {},
      globals: pkgOpts.globals || [],
      quiet: Boolean(runtimeOpts.quiet),
      fix: Boolean(runtimeOpts.fix),
    },
  };
}

exports.run = runESLintInsideWorker;
exports.mergeReports = mergeESLintReports;
exports.generateOpts = generateESLintOptions;
