const MAX_DEPTH = 4;
const MAX_PARAMS = 4;

// These rules also contains babel patch, more on that can be seen here
// https://github.com/babel/eslint-plugin-babel#rules
module.exports = {
  // We need babel-eslint to enable Flowtype support
  parser: 'babel-eslint',
  env: {
    node: true,
    browser: true,
    es6: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['babel'],
  extends: ['eslint:recommended'],
  // All rules below are rules not exist in 'eslint:recommended'
  // http://eslint.org/docs/rules/
  rules: {
    // Use console sparingly, and use proper logging library like bunyan
    // http://eslint.org/docs/rules/no-console
    'no-console': 'warn',

    // Make sure all variables are used, except function arguments
    // http://eslint.org/docs/rules/no-unused-vars
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'none',
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],

    // Prevent accidental negation error
    // http://eslint.org/docs/rules/no-unsafe-negation
    'no-unsafe-negation': 'error',

    // Enforce return value in some array method
    // http://eslint.org/docs/rules/array-callback-return
    'array-callback-return': 'error',

    // Add default case in switch statements
    // http://eslint.org/docs/rules/default-case
    'default-case': ['warn', { commentPattern: '^no default$' }],

    // Always use dot notation when accessing object prop except for reserved word
    // http://eslint.org/docs/rules/dot-notation
    'dot-notation': ['error', { allowKeywords: true }],

    // Always use strict equality, except some cases like null
    // http://eslint.org/docs/rules/eqeqeq
    eqeqeq: ['error', 'smart'],

    // Return early, reduce cyclomatic complexity and indent level
    // http://eslint.org/docs/rules/no-else-return
    'no-else-return': 'warn',

    // Put comment inside of empty function
    // http://eslint.org/docs/rules/no-empty-function
    'no-empty-function': 'error',

    // Allow short circuit with null and undefined
    // http://eslint.org/docs/rules/no-eq-null
    'no-eq-null': 'off',

    // Eval is evil
    // http://eslint.org/docs/rules/no-eval
    'no-eval': 'error',
    'no-implied-eval': 'error',

    // Never monkey patch native object, use polyfill library instead
    // http://eslint.org/docs/rules/no-extend-native
    'no-extend-native': 'error',

    // Use .bind() on method with `this` inside
    // http://eslint.org/docs/rules/no-extra-bind
    'no-extra-bind': 'error',

    // Never re-assign global variables
    // http://eslint.org/docs/rules/no-global-assign
    'no-global-assign': 'error',

    // Use type casting instead of coercion, with the exception of boolean
    // http://eslint.org/docs/rules/no-implicit-coercion
    'no-implicit-coercion': [
      'error',
      {
        boolean: false,
        number: true,
        string: true,
        allow: [],
      },
    ],

    // Don't create function inside loop
    // http://eslint.org/docs/rules/no-loop-func
    'no-loop-func': 'error',

    // Use constant instead of number literal
    // DISABLED because throwing error in for loop
    // http://eslint.org/docs/rules/no-magic-numbers
    'no-magic-numbers': 'off',

    // Reassigning function arguments could affect predictability and perf
    // http://eslint.org/docs/rules/no-param-reassign
    'no-param-reassign': 'warn',

    // Do not use assignment on return value
    // http://eslint.org/docs/rules/no-return-assign
    'no-return-assign': ['warn', 'except-parens'],

    // Refrain from using `javascript:` because of perf issue
    // http://eslint.org/docs/rules/no-script-url
    'no-script-url': 'warn',

    // Always throw error object
    // http://eslint.org/docs/rules/no-throw-literal
    'no-throw-literal': 'error',

    // Prevent possible logic error except for short ciruit
    // http://eslint.org/docs/rules/no-unused-expressions
    'no-unused-expressions': ['error', { allowShortCircuit: true }],

    // Only use .call and .apply for adding context
    // http://eslint.org/docs/rules/no-useless-call
    'no-useless-call': 'error',

    // No need to concat different string literal (except vars)
    // http://eslint.org/docs/rules/no-useless-concat
    'no-useless-concat': 'error',

    // Some characters doesn't need escape sequence
    // http://eslint.org/docs/rules/no-useless-escape
    'no-useless-escape': 'error',

    // All comment for future works must be resolved as soon as possible
    // http://eslint.org/docs/rules/no-warning-comments
    'no-warning-comments': [
      'warn',
      {
        terms: ['TODO', 'HACK'],
      },
    ],

    // Enforce radix value on parseInt
    // http://eslint.org/docs/rules/radix
    radix: ['error', 'always'],

    // Always use variable name first when comparing values
    // http://eslint.org/docs/rules/yoda
    yoda: ['error', 'never'],

    // No need to initialize vars with undefined
    // http://eslint.org/docs/rules/no-undef-init
    'no-undef-init': 'error',

    // Allow common pattern of StyleSheet.create in React Native
    // http://eslint.org/docs/rules/no-use-before-define
    'no-use-before-define': 'off',

    // Prevent callback to run multiple times
    // http://eslint.org/docs/rules/callback-return
    'callback-return': 'error',

    // Error in callback should always handled. Or bypass using _
    // http://eslint.org/docs/rules/handle-callback-err
    'handle-callback-err': 'error',

    // Use synchronous method sparingly
    // http://eslint.org/docs/rules/no-sync
    'no-sync': 'warn',

    // Use camelcase for variable names and object property
    // http://eslint.org/docs/rules/camelcase
    camelcase: ['warn', { properties: 'never' }],

    // Do not enforce comma dangle (handled by prettier)
    // http://eslint.org/docs/rules/comma-dangle
    'comma-dangle': 'off',

    // Use clear this value inside function
    // http://eslint.org/docs/rules/consistent-this
    'consistent-this': 'error',

    // Function must be declared with name, except arrow function for better stack trace
    // http://eslint.org/docs/rules/func-names
    'func-names': ['error', 'always'],

    // Declare function using function instead of var/const, except arrow function which is used in React SFC
    // http://eslint.org/docs/rules/func-style
    'func-style': ['error', 'declaration', { allowArrowFunctions: true }],

    // Do not enforce indentation (handled by prettier)
    // http://eslint.org/docs/rules/indent
    indent: 'off',

    // Use unix linebreak
    // http://eslint.org/docs/rules/linebreak-style
    'linebreak-style': ['error', 'unix'],

    // Prevent nesting hell
    // http://eslint.org/docs/rules/max-depth
    'max-depth': ['warn', MAX_DEPTH],

    // Prevent callback hell
    // http://eslint.org/docs/rules/max-nested-callbacks
    'max-nested-callbacks': ['error', MAX_DEPTH],

    // Use few parameters as possible
    // http://eslint.org/docs/rules/max-params
    'max-params': ['warn', MAX_PARAMS],

    // Use newline before return
    // http://eslint.org/docs/rules/newline-before-return
    'newline-before-return': 'off',

    // Use array literal instead of constructor
    // http://eslint.org/docs/rules/no-array-constructor
    'no-array-constructor': 'error',

    // Use positive comparison if convenient
    // http://eslint.org/docs/rules/no-negated-condition
    'no-negated-condition': 'off',

    // Can be discussed in code review
    // http://eslint.org/docs/rules/no-nested-ternary
    'no-nested-ternary': 'off',

    // Simplify ternary if possible
    // http://eslint.org/docs/rules/no-unneeded-ternary
    'no-unneeded-ternary': 'error',

    // No need to enforce newline on object
    // http://eslint.org/docs/rules/object-curly-newline
    'object-curly-newline': 'off',

    // Add space after comment mark
    // http://eslint.org/docs/rules/spaced-comment
    'spaced-comment': ['warn', 'always'],

    // No need to enforce styling in arrow function body
    // http://eslint.org/docs/rules/arrow-body-style
    'arrow-body-style': 'off',

    // Make sure you know why you don't call super in constructor class that extends
    // http://eslint.org/docs/rules/constructor-super
    'constructor-super': 'warn',

    // Allow multiple imports, useful for grouping imports, especially for invalid types
    // http://eslint.org/docs/rules/no-duplicate-imports
    'no-duplicate-imports': 'off',

    // Use let/const
    // http://eslint.org/docs/rules/no-var
    'no-var': 'error',

    // Use arrow function or named function in callback
    // http://eslint.org/docs/rules/prefer-arrow-callback
    'prefer-arrow-callback': [
      'error',
      {
        allowNamedFunctions: true,
        allowUnboundThis: false,
      },
    ],

    // Use const for non-modified variables, but not strict usage
    // http://eslint.org/docs/rules/prefer-const
    'prefer-const': 'warn',

    // Use rest operator as function params instead of using arguments
    // http://eslint.org/docs/rules/prefer-rest-params
    'prefer-rest-params': 'error',

    // Prefer spread operator when calling function instead of .apply
    // http://eslint.org/docs/rules/prefer-spread
    'prefer-spread': 'error',

    // Sometimes string concat is more readable
    // http://eslint.org/docs/rules/prefer-template
    'prefer-template': 'off',

    // Allow extending another class without lint error
    // http://eslint.org/docs/rules/class-methods-use-this
    'class-methods-use-this': 'off',

    // Matches override rule from prettier
    // http://eslint.org/docs/rules/object-curly-spacing
    'babel/object-curly-spacing': 'off',

    // Allow constructor without PascalCase name, e.g: new webpack.SomePlugin()
    // http://eslint.org/docs/rules/new-cap
    'new-cap': 'off',
    'babel/new-cap': 'off',

    // Using object shorthand is recommended
    // http://eslint.org/docs/rules/object-shorthand
    'object-shorthand': 'warn',

    // Only use `this` inside method
    // http://eslint.org/docs/rules/no-invalid-this
    'no-invalid-this': 'off',
    'babel/no-invalid-this': 'error',

    // Allow .hasOwnProperty
    // https://eslint.org/docs/rules/no-prototype-builtins
    'no-prototype-builtins': 'off',
  },
};
