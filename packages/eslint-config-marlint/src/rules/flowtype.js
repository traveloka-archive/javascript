module.exports = {
  plugins: ['flowtype'],
  settings: {
    flowtype: {
      onlyFilesWithFlowAnnotation: true,
    },
  },
  rules: {
    // Mark flow types as defined
    'flowtype/define-flow-type': 1,

    // No duplicate property on type definition
    'flowtype/no-dupe-keys': 'error',

    // Use string, number, and bool instead of String, Number, and Boolean
    'flowtype/no-primitive-constructor-types': 'error',

    // Use strong typing whenever possible
    'flowtype/no-weak-types': [
      'off',
      {
        any: true,
        Object: false,
        Function: true,
      },
    ],

    // Always add type in function parameters
    'flowtype/require-parameter-type': 'warn',

    // No need to enforce specific flow annotation style
    'flowtype/require-valid-file-annotation': 'off',

    // flow already has type inference,
    // this also can't detect function declaration via const
    'flowtype/require-variable-type': 'off',

    // No need to sort key alphabetically
    'flowtype/sort-keys': 'off',

    // Use PascalCase to define type
    'flowtype/type-id-match': ['error', '^([A-Z][a-z0-9]*)+'],

    // Marks flow type alias as used
    'flowtype/use-flow-type': 1,

    // Only use flow syntax with explicit @flow tag
    'flowtype/no-types-missing-file-annotation': 'error',

    // Allow flow to infer return types
    'flowtype/require-return-type': 'off',
  },
};
