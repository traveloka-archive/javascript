module.exports = {
  extends: [
    './rules/base',
    './rules/esnext',
    './rules/react',
    './rules/jsx-a11y'
  ].map(require.resolve)
};
