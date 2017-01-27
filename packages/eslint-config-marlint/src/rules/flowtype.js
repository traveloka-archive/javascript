module.exports = {
  plugins: ['flowtype'],
  rules: {
    // Use bool for boolean type
    'flowtype/boolean-style': ['error', 'bool'],

    // Mark flow types as defined
    'flowtype/define-flow-type': 1,

    // Always use delimiter dangle on multiline
    'flowtype/delimiter-dangle': ['error', 'always-multiline'],

    // Do not use on generic types
    'flowtype/generic-spacing': 'error',

    // No duplicate property on type definition
    'flowtype/no-dupe-keys': 'error',

    // Use string, number, and bool instead of String, Number, and Boolean
    'flowtype/no-primitive-constructor-types': 'error',

    // Use strong typing whenever possible
    'flowtype/no-weak-types': ['off', {
      any: true,
      Object: false,
      Function: true,
    }],

    // Use comma for flowtype annotation separator
    'flowtype/object-type-delimiter': ['error', 'comma'],

    // Always add type in function parameters
    'flowtype/require-parameter-type': ['error', {
      excludeArrowFunctions: true,
    }],

    // Always add type in function return value
    'flowtype/require-return-type': ['error', {
      excludeArrowFunctions: true,
    }],

    // Always put @flow on top of the file to enable
    'flowtype/require-valid-file-annotation': 'error',

    // flow already has type inference,
    // this also can't detect function declaration via const
    'flowtype/require-variable-type': 'off',

    // Add semicolon
    'flowtype/semi': 'error',

    // No need to sort key alphabetically
    'flowtype/sort-keys': 'off',

    // Put space after colon (:)
    'flowtype/space-after-type-colon': ['error', 'always'],

    // No space before generic bracket
    'flowtype/space-before-generic-bracket': ['error', 'never'],

    // No space before colon (:)
    'flowtype/space-before-type-colon': ['error', 'never'],

    // Use PascalCase to define type
    'flowtype/type-id-match': ['error', '^([A-Z][a-z0-9]*)+'],

    // Use space between intersection (|)
    'flowtype/union-intersection-spacing': ['error', 'always'],

    // Marks flow type alias as used
    'flowtype/use-flow-type': 1,
  },
};
