const os = require('os');
const micromatch = require('micromatch');
const Worker = require('jest-worker').default;

// Some CI doesn't return correct CPU core, this allow us to override
const MAX_WORKER = process.env.MAX_CPU_CORE || os.cpus().length - 1;
const MAX_FILES_PER_BATCH = 250;

const worker = new Worker(require.resolve('../worker'), {
  exposedMethods: ['lint'],
  numWorkers: MAX_WORKER,
});

function runESLintInsideWorker(paths, options) {
  return Promise.all(
    jobs.map(job => {
      let paths = job.paths;
      const ignores = job.options.marlint.ignores;

      if (ignores) {
        // eslint-disable-next-line no-param-reassign
        paths = paths.filter(path => {
          return !ignores.some(pattern => {
            return micromatch.contains(path, pattern)
          });
        });
      }
      

      // Instead of 1 worker for 1 package, or 1 worker for 1 path,
      // we batch the jobs for multiple paths at once. 
      const numOfBatch = Math.ceil(paths.length / MAX_FILES_PER_BATCH);
      const batches = Array(numOfBatch)
        .fill('')
        .map(_ => [])

      return Promise.all(
        paths
          .reduce((jobs, path, index) => {
            // round robin insert
            const idx = index % numOfBatch;
            batches[idx].push(path);
            return batches;
          }, batches)
          .map(batch => worker.lint(batch, job.options.eslint))
      ).then(mergeESLintReports)
    })
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
