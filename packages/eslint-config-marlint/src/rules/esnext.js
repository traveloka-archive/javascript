module.exports = {
  // We need babel-eslint to enable Flow support
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['babel'],
  // View link below for babel rules documentation
  // https://github.com/babel/eslint-plugin-babel#rules
  rules: {
    // Use space before star character in generator function
    // http://eslint.org/docs/rules/generator-star-spacing
    'generator-star-spacing': ['error', 'before'],

    // Allow constructor without PascalCase name, e.g: new webpack.SomePlugin()
    // http://eslint.org/docs/rules/new-cap
    'new-cap': 'off',
    'babel/new-cap': 'off',

    // Never use spaces inside array
    // http://eslint.org/docs/rules/array-bracket-spacing
    'array-bracket-spacing': ['error', 'never'],

    // Always add space inside object definition (curly braces)
    // http://eslint.org/docs/rules/object-curly-spacing
    'object-curly-spacing': 'off',
    'babel/object-curly-spacing': ['error', 'always'],

    // Using object shorthand is recommended
    // http://eslint.org/docs/rules/object-shorthand
    'object-shorthand': 'warn',

    // Only use `this` inside method
    // http://eslint.org/docs/rules/no-invalid-this
    'no-invalid-this': 'off',
    'babel/no-invalid-this': 'error',

    // Arrow functions must be wrapped in parens
    // http://eslint.org/docs/rules/arrow-parens
    'arrow-parens': ['warn', 'as-needed'],
  },
};
