module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint/eslint-plugin'],
  rules: {
    // Fix unused vars for type annotation
    // https://github.com/typescript-eslint/typescript-eslint/issues/46#issuecomment-470486034
    '@typescript-eslint/no-unused-vars': [2, { args: 'none' }]
  }
}
