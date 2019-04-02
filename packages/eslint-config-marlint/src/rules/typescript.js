module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint/eslint-plugin'],
  rules: {
    '@typescript-eslint/no-unused-vars': [2, { args: 'none' }]
  }
}
