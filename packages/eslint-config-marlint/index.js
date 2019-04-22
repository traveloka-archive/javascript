const base = require('./src/base');

module.exports = {
  extends: [
    ...base.extends,
    require.resolve('./src/rules/flowtype'),
    'prettier/flowtype',
    require.resolve('./src/rules/prettier-override'),
  ],
};
