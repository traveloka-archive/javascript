module.exports = {
  plugins: ['lodash'],
  rules: {
    // Disallow named imports: import { foo } from 'lodash';
    // Only allow: import foo from 'lodash/foo';
    // @see https://github.com/wix/eslint-plugin-lodash/blob/HEAD/docs/rules/import-scope.md
    'lodash/import-scope': [2, 'method'],
  },
};
