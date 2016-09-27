module.exports = {
  parser: 'babel-eslint',
  plugins: ['babel'],
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    ecmaFeatures: { experimentalObjectRestSpread: true },
  },
  // View link below for babel rules documentation
  // https://github.com/babel/eslint-plugin-babel#rules
  rules: {
    // Use space before star character in generator function
    // http://eslint.org/docs/rules/generator-star-spacing
    'generator-star-spacing': 'off',
    'babel/generator-star-spacing': ['error', 'before'],

    // Allow constructor without PascalCase name, e.g: new webpack.SomePlugin()
    // http://eslint.org/docs/rules/new-cap
    'new-cap': 'off',
    'babel/new-cap': 'off',

    // Never use spaces inside array
    // http://eslint.org/docs/rules/array-bracket-spacing
    'array-bracket-spacing': 'off',
    'babel/array-bracket-spacing': ['error', 'never'],

    // Always add space inside object definition (curly braces)
    // http://eslint.org/docs/rules/object-curly-spacing
    'object-curly-spacing': 'off',
    'babel/object-curly-spacing': ['error', 'always'],

    // Using object shorthand is recommended
    // http://eslint.org/docs/rules/object-shorthand
    'object-shorthand': 'off',
    'babel/object-shorthand': 'warn',

    // Arrow functions must be wrapped in parens
    // http://eslint.org/docs/rules/arrow-parens
    'arrow-parens': 'off',
    'babel/arrow-parens': ['warn', 'as-needed'],

    // No await call inside loop
    'babel/no-await-in-loop': 'error',

    // Use comma for flowtype annotation separator
    'babel/flow-object-type': ['error', 'comma'],

    // DISABLED because weird error on React.PropTypes.shape call
    'babel/func-params-comma-dangle': 'off',
  },
};
