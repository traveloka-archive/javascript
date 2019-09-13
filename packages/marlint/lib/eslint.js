const os = require('os');
const micromatch = require('micromatch');
const Worker = require('jest-worker').default;

// Some CI doesn't return correct CPU core, this allow us to override
const MAX_WORKER = process.env.MAX_CPU_CORE || os.cpus().length;
const MAX_FILES_PER_BATCH = 250;

const worker = new Worker(require.resolve('../worker'), {
  exposedMethods: ['lint'],
  numWorkers: MAX_WORKER - 1,
});

function filterPaths(paths, ignores) {
  return paths.filter(path => {
    return !ignores.some(pattern => {
      return micromatch.contains(path, pattern);
    });
  });
}

function runESLintInsideWorker(groups) {
  const jobs = groups.map(group => {
    const options = group.options;
    const paths = options.ignores
      ? filterPaths(group.paths, options.ignores)
      : group.paths;

    // Instead of 1 worker for 1 package, or 1 worker for 1 path,
    // we batch the jobs for multiple paths at once.
    const numOfBatch = Math.ceil(paths.length / MAX_FILES_PER_BATCH);
    const batches = Array(numOfBatch)
      .fill('')
      .map(_ => []);

    // Then we distribute the jobs using round-robin mechanism. This is
    // to make sure that each worker contains equal number of paths to be
    // processed.
    //
    // E.g: if 1 config has 260 files, each worker processes 130 files
    // instead of 250 files and 10 files respectively.
    paths.forEach((path, index) => {
      const idx = index % numOfBatch;
      batches[idx].push(path);
    });

    // Then we execute them in parallel, and jest-worker will take care
    // of the thread-pool to manage the processes, and we can just simply
    // wait for all batches to be processed and merge the report into one
    const jobs = batches.map(batch => worker.lint(batch, options.eslint));
    return Promise.all(jobs).then(mergeESLintReports);
  });

  return Promise.all(jobs).then(mergeESLintReports);
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
