const base = require('./src/base');

module.exports = {
  extends: [...base.extends, require.resolve('./src/rules/typescript')],
};
