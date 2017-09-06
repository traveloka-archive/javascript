const marlintRules = [
  './rules/base',
  './rules/flowtype',
  './rules/react',
  './rules/jsx-a11y',
].map(require.resolve);

module.exports = {
  extends: [...marlintRules, 'prettier', 'prettier/flowtype', 'prettier/react'],
};
