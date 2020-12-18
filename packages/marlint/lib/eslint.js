const os = require('os');
const micromatch = require('micromatch');
const Worker = require('jest-worker').default;
const toWritableGlobal = require('./toWritableGlobal');

// Some CI doesn't return correct CPU core, this allow us to override
const MAX_WORKER = process.env.MAX_CPU_CORE || os.cpus().length;
const MAX_FILES_PER_BATCH = 250;

const worker = new Worker(require.resolve('../worker'), {
  exposedMethods: ['lint'],
  numWorkers: MAX_WORKER - 1,
});

function filterPaths(paths, ignores) {
  return paths.filter((path) => {
    return !ignores.some((pattern) => {
      return micromatch.contains(path, pattern);
    });
  });
}

async function runESLintInsideWorker(groups, runtimeOpts) {
  const jobs = groups.map(async (group) => {
    const options = group.options;
    const paths = options.marlint.ignores
      ? filterPaths(group.paths, options.marlint.ignores)
      : group.paths;

    // Instead of 1 worker for 1 package, or 1 worker for 1 path,
    // we batch the jobs for multiple paths at once.
    const numOfBatch = Math.ceil(paths.length / MAX_FILES_PER_BATCH);
    const batches = Array(numOfBatch)
      .fill('')
      .map((_) => []);

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
    if (runtimeOpts.verbose && batches.length > 0) {
      console.log(`running ${batches.length} jobs in group ${group.id}`);
    }
    const jobs = batches.map((batch) => worker.lint(batch, options.eslint));
    const reports = await Promise.all(jobs);
    if (runtimeOpts.verbose && batches.length > 0) {
      console.log(`${batches.length} jobs for group ${group.id} are finished`);
    }
    return mergeESLintReports(reports);
  });

  const reports = await Promise.all(jobs);
  if (runtimeOpts.verbose) {
    console.log('jobs finished');
  }
  return mergeESLintReports(reports);
}

function mergeESLintReports(reports) {
  // Merge multiple ESLint reports into a single report
  let results = [];

  for (const report of reports.flat()) {
    results = results.concat(report);
  }

  return results;
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
      overrideConfig: {
        rules: pkgOpts.rules || {},
        globals: toWritableGlobal(pkgOpts.globals),
      },
      fix: Boolean(runtimeOpts.fix),
    },
  };
}

exports.run = runESLintInsideWorker;
exports.mergeReports = mergeESLintReports;
exports.generateOpts = generateESLintOptions;
