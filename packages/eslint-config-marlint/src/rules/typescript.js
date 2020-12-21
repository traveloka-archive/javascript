module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint/eslint-plugin'],
  rules: {
    // typescript uses global from @types/ packages
    'no-undef': 'off',
    // prefer typescript no-unused-vars rule
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'none',
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    // prefer typescript no-redeclare rule
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': 'warn',
  },
};
