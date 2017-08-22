const getMultiPaths = require('../getMultiPaths');

test('convert array of path into array of array of path', () => {
  const paths = [
    'packages/eslint-config-marlint/src/index.js',
    'packages/eslint-config-marlint/src/rules/base.js',
    'packages/marlint/src/index.js',
    'packages/marlint/src/cli.js',
    'packages/atom.marlint/src/index.js',
    'packages/atom.marlint/src/linter.js',
  ];

  const multiPaths = getMultiPaths(paths);
  expect(multiPaths).toEqual([
    [
      'packages/eslint-config-marlint/src/index.js',
      'packages/eslint-config-marlint/src/rules/base.js',
    ],
    [
      'packages/marlint/src/index.js',
      'packages/marlint/src/cli.js',
    ],
    [
      'packages/atom.marlint/src/index.js',
      'packages/atom.marlint/src/linter.js',
    ],
  ]);
});

test('works on hybrid paths combination', () => {
  const paths = [
    'packages/eslint-config-marlint/src/index.js',
    'packages/eslint-config-marlint/src/rules/base.js',
    'marlint/src/index.js',
    'marlint/src/cli.js',
  ];

  const multiPaths = getMultiPaths(paths);
  expect(multiPaths).toEqual([
    [
      'packages/eslint-config-marlint/src/index.js',
      'packages/eslint-config-marlint/src/rules/base.js',
    ],
    [
      'marlint/src/index.js',
      'marlint/src/cli.js',
    ],
  ]);
});
