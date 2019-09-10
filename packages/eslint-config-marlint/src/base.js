const marlintRules = [
  './rules/base',
  './rules/react',
  './rules/jsx-a11y',
  './rules/lodash',
  './rules/react-native',
].map(require.resolve);

module.exports = {
  extends: [...marlintRules, 'prettier', 'prettier/flowtype', 'prettier/react'],
};
