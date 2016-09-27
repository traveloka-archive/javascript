const SPACE_COUNT = 2;
const MAX_DEPTH = 4;
const MAX_PARAMS = 4;
const MAX_CODE_LENGTH = 100;

module.exports = {
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },
  ecmaFeatures: {
    experimentalObjectRestSpread: true,
  },
  extends: ['eslint:recommended'],
  // All rules below are rules not exist in 'eslint:recommended'
  // http://eslint.org/docs/rules/
  rules: {
    // Make sure all variables are used, except function parameters
    // http://eslint.org/docs/rules/no-unused-vars
    'no-unused-vars': ['error', { args: 'none' }],

    // Prevent accidental negation error
    // http://eslint.org/docs/rules/no-unsafe-negation
    'no-unsafe-negation': 'error',

    // Enforce return value in some array method
    // http://eslint.org/docs/rules/array-callback-return
    'array-callback-return': 'error',

    // Use curly braces on block statement like if/while
    // http://eslint.org/docs/rules/curly
    'curly': 'warn',

    // Always add default case in switch statements
    // http://eslint.org/docs/rules/default-case
    'default-case': 'warn',

    // Always use dot notation when accessing object prop except for reserved word
    // http://eslint.org/docs/rules/dot-notation
    'dot-notation': ['error', { allowKeywords: true }],

    // Always use strict equality
    // http://eslint.org/docs/rules/eqeqeq
    'eqeqeq': 'error',

    // Return early, reduce cyclomatic complexity
    // http://eslint.org/docs/rules/no-else-return
    'no-else-return': 'warn',

    // Put comment inside of empty function
    // http://eslint.org/docs/rules/no-empty-function
    'no-empty-function': 'error',

    // Always compare null with strict equality
    // http://eslint.org/docs/rules/no-eq-null
    'no-eq-null': 'error',

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

    // Never re-assign global variables, unless necessary (e.g test mock)
    // http://eslint.org/docs/rules/no-global-assign
    'no-global-assign': 'warn',

    // Use type casting instead of coercion
    // http://eslint.org/docs/rules/no-implicit-coercion
    'no-implicit-coercion': 'error',

    // Always use `this` inside class-like object
    // DISABLED because can't detect ES7 class property
    // http://eslint.org/docs/rules/no-invalid-this
    'no-invalid-this': 'off',

    // Don't create function inside loop
    // http://eslint.org/docs/rules/no-loop-func
    'no-loop-func': 'error',

    // Use constant instead of number literal
    // DISABLED because throwing error in for loop
    // http://eslint.org/docs/rules/no-magic-numbers
    'no-magic-numbers': 'off',

    // Remove useless space, unless for object property alignment
    // http://eslint.org/docs/rules/no-multi-spaces
    'no-multi-spaces': ['error', { exceptions: { Property: true } }],

    // Don't modify function arguments directly if convenient
    // http://eslint.org/docs/rules/no-param-reassign
    'no-param-reassign': 'off',

    // Do not use assignment on return value
    // http://eslint.org/docs/rules/no-return-assign
    'no-return-assign': 'warn',

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
    'no-warning-comments': ['warn', {
      terms: [
        'TODO',
        'HACK',
      ],
    }],

    // Enforce radix value on parseInt
    // http://eslint.org/docs/rules/radix
    'radix': ['error', 'always'],

    // Always use variable name first when comparing values
    // http://eslint.org/docs/rules/yoda
    'yoda': ['error', 'never'],

    // No need to initialize vars with undefined
    // http://eslint.org/docs/rules/no-undef-init
    'no-undef-init': 'error',

    // Disallow early use except functions and classes (hoisted so it's safe)
    // http://eslint.org/docs/rules/no-use-before-define
    'no-use-before-define': ['error', { functions: false, classes: false }],

    // Prevent callback to run multiple times
    // http://eslint.org/docs/rules/callback-return
    'callback-return': 'error',

    // Error in callback should always handled. Or bypass using _
    // http://eslint.org/docs/rules/handle-callback-err
    'handle-callback-err': 'error',

    // Use synchronous method sparingly
    // http://eslint.org/docs/rules/no-sync
    'no-sync': 'warn',

    // Use brace inline with keyword identifier, and use multiline brace
    // http://eslint.org/docs/rules/brace-style
    'brace-style': ['error', '1tbs', { allowSingleLine: false }],

    // Use camelcase for variable names and object property
    // http://eslint.org/docs/rules/camelcase
    'camelcase': 'warn',

    // Always use comma-dangle in multiline items for easier diff
    // http://eslint.org/docs/rules/comma-dangle
    'comma-dangle': ['warn', 'always-multiline'],

    // Always put space after comma
    // http://eslint.org/docs/rules/comma-spacing
    'comma-spacing': ['error', { before: false, after: true }],

    // Put comma last after each item
    // http://eslint.org/docs/rules/comma-style
    'comma-style': ['error', 'last'],

    // Do not add space for computed property, similar to array
    // http://eslint.org/docs/rules/computed-property-spacing
    'computed-property-spacing': ['error', 'never'],

    // Use clear this value inside function
    // http://eslint.org/docs/rules/consistent-this
    'consistent-this': 'error',

    // Always use EOL in each files
    // http://eslint.org/docs/rules/eol-last
    'eol-last': 'error',

    // No space on function call between name and parens
    // http://eslint.org/docs/rules/func-call-spacing
    'func-call-spacing': ['error', 'never'],

    // Function must be declared with name, except arrow function for better stack trace
    // http://eslint.org/docs/rules/func-names
    'func-names': ['error', 'always'],

    // Declare function using function instead of var/const, except arrow function which is used in React SFC
    // http://eslint.org/docs/rules/func-style
    'func-style': ['error', 'declaration', { allowArrowFunctions: true }],

    // Use 2 spaces for indent
    // http://eslint.org/docs/rules/indent
    'indent': ['error', SPACE_COUNT, {
      SwitchCase: 1,
    }],

    // Add space after colon in object property
    // http://eslint.org/docs/rules/key-spacing
    'key-spacing': ['error', {
      beforeColon: false,
      afterColon: true,
      mode: 'minimum',
    }],

    // Add space before and after keyword
    // http://eslint.org/docs/rules/keyword-spacing
    'keyword-spacing': ['error', { before: true, after: true }],

    // Use unix linebreak
    // http://eslint.org/docs/rules/linebreak-style
    'linebreak-style': ['error', 'unix'],

    // Prevent nesting hell
    // http://eslint.org/docs/rules/max-depth
    'max-depth': ['error', MAX_DEPTH],

    // Do not write long inline code. Comment, strings, and urls are excluded
    // http://eslint.org/docs/rules/max-len
    'max-len': ['warn', {
      code: MAX_CODE_LENGTH,
      ignoreComments: true,
      ignoreUrls: true,
      ignoreStrings: true,
    }],

    // Prevent callback hell
    // http://eslint.org/docs/rules/max-nested-callbacks
    'max-nested-callbacks': ['error', MAX_DEPTH],

    // Use few parameters as possible
    // http://eslint.org/docs/rules/max-params
    'max-params': ['warn', MAX_PARAMS],

    // Use parens when invoking constructor
    // http://eslint.org/docs/rules/new-parens
    'new-parens': 'error',

    // Use newline before return
    // http://eslint.org/docs/rules/newline-before-return
    'newline-before-return': 'off',

    // Use array literal instead of constructor
    // http://eslint.org/docs/rules/no-array-constructor
    'no-array-constructor': 'error',

    // Use at most 2 empty lines
    // http://eslint.org/docs/rules/no-multiple-empty-lines
    'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1, maxBOF: 1 }],

    // Use positive comparison if convenient
    // http://eslint.org/docs/rules/no-negated-condition
    'no-negated-condition': 'warn',

    // Don't nest ternary operation
    // http://eslint.org/docs/rules/no-nested-ternary
    'no-nested-ternary': 'error',

    // No useless trailing spaces causing confusion on diffs
    // http://eslint.org/docs/rules/no-trailing-spaces
    'no-trailing-spaces': 'error',

    // Simplify ternary if possible
    // http://eslint.org/docs/rules/no-unneeded-ternary
    'no-unneeded-ternary': 'error',

    // Do not confuse people with whitespace before property
    // http://eslint.org/docs/rules/no-whitespace-before-property
    'no-whitespace-before-property': 'error',

    // No need to enforce newline on object
    // http://eslint.org/docs/rules/object-curly-newline
    'object-curly-newline': 'off',

    // No newline at the beginning of block statement
    // http://eslint.org/docs/rules/padded-blocks
    'padded-blocks': ['error', 'never'],

    // Use consistent quote in object properties
    // http://eslint.org/docs/rules/quote-props
    'quote-props': ['error', 'consistent-as-needed'],

    // Use single quote
    // http://eslint.org/docs/rules/quotes
    'quotes': ['error', 'single'],

    // Do not use space before semicolon
    // http://eslint.org/docs/rules/semi-spacing
    'semi-spacing': ['error', { before: false, after: true }],

    // Use semicolon
    // http://eslint.org/docs/rules/semi
    'semi': ['error', 'always'],

    // Always use space before block statement
    // http://eslint.org/docs/rules/space-before-blocks
    'space-before-blocks': ['error', 'always'],

    // Use space before function parens except named function
    // http://eslint.org/docs/rules/space-before-function-paren
    'space-before-function-paren': ['error', { named: 'never', anonymous: 'always' }],

    // Do not add space inside parens
    // http://eslint.org/docs/rules/space-in-parens
    'space-in-parens': ['error', 'never'],

    // Always add space between infix operand
    // http://eslint.org/docs/rules/space-infix-ops
    'space-infix-ops': 'error',

    // Add space after unary words, like new/delete
    // http://eslint.org/docs/rules/space-unary-ops
    'space-unary-ops': ['error', { words: true, nonwords: false }],

    // Add space after comment mark
    // http://eslint.org/docs/rules/spaced-comment
    'spaced-comment': ['warn', 'always'],

    // No useless block on arrow function
    // http://eslint.org/docs/rules/arrow-body-style
    'arrow-body-style': ['warn', 'as-needed'],

    // Add space before & after arrow in arrow function
    // http://eslint.org/docs/rules/arrow-spacing
    'arrow-spacing': ['error', { before: true, after: true }],

    // Make sure you know why you don't call super in constructor class that extends
    // http://eslint.org/docs/rules/constructor-super
    'constructor-super': 'warn',

    // Merge all import from same module
    // http://eslint.org/docs/rules/no-duplicate-imports
    'no-duplicate-imports': 'error',

    // Use let/const
    // http://eslint.org/docs/rules/no-var
    'no-var': 'error',

    // Use arrow function or named function in callback
    // http://eslint.org/docs/rules/prefer-arrow-callback
    'prefer-arrow-callback': ['error', {
      allowNamedFunctions: true,
      allowUnboundThis: false,
    }],

    // Use const for non-modified variables
    // http://eslint.org/docs/rules/prefer-const
    'prefer-const': 'error',

    // Use rest operator as function params instead of using arguments
    // http://eslint.org/docs/rules/prefer-rest-params
    'prefer-rest-params': 'error',

    // Prefer spread operator when calling function instead of .apply
    // http://eslint.org/docs/rules/prefer-spread
    'prefer-spread': 'error',

    // Use template string if convenient
    // http://eslint.org/docs/rules/prefer-template
    'prefer-template': 'warn',

    // No spacing on rest & spread
    // http://eslint.org/docs/rules/rest-spread-spacing
    'rest-spread-spacing': ['error', 'never'],

    // No space inside template string variables
    // http://eslint.org/docs/rules/template-curly-spacing
    'template-curly-spacing': ['warn', 'never'],
  },
};
