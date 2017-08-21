const INDENT_TYPE = 2;

module.exports = {
  plugins: ['react'],
	// View link below for react rules documentation
	// https://github.com/yannickcr/eslint-plugin-react#list-of-supported-rules
  rules: {
		// Do not enforce jsx quotes (handled by prettier)
		// http://eslint.org/docs/rules/jsx-quotes
    'jsx-quotes': 'off',

		// React displayName already added via babel transform
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/display-name.md
    'react/display-name': ['off', { ignoreTranspilerName: false }],

		// Do not use vague propTypes on Component
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/forbid-component-props.md
    'react/forbid-component-props': 'off',

		// Never use any in propTypes
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/forbid-prop-types.md
    'react/forbid-prop-types': ['error', { forbid: ['any'] }],

		// Always pass children as children, not props
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-children-prop.md
    'react/no-children-prop': 'error',

		// Never use dangerouslySetInnerHtml
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-danger.md
    'react/no-danger': 'error',

		// Never use dangerouslySetInnerHtml with children together
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-danger-with-children.md
    'react/no-danger-with-children': 'error',

		// Maintaining this rule is not worth, easier looking on warning in console
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-deprecated.md
    'react/no-deprecated': 'off',

		// this.setState in componentDidMount is useful for client-side AJAX call
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-did-mount-set-state.md
    'react/no-did-mount-set-state': 'off',

		// No this.setState call in componentDidUpdate
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-did-update-set-state.md
    'react/no-did-update-set-state': 'error',

		// Use this.setState to mutate this.state
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-direct-mutation-state.md
    'react/no-direct-mutation-state': 'error',

		// Use callback ref instead of ReactDOM.findDOMNode
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-find-dom-node.md
    'react/no-find-dom-node': 'warn',

		// isMounted is anti pattern and deprecated
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-is-mounted.md
    'react/no-is-mounted': 'error',

		// Multiple component inside one file is sometimes useful
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-multi-comp.md
    'react/no-multi-comp': 'warn',

		// Do not use return value from React.render as it's a bad practice
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-render-return-value.md
    'react/no-render-return-value': 'error',

		// setState are not harmful, not everything need flux
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-set-state.md
    'react/no-set-state': 'off',

		// Always use callback ref
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-string-refs.md
    'react/no-string-refs': 'error',

		// Prevent accidental unescaped entities in render
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unescaped-entities.md
    'react/no-unescaped-entities': 'error',

		// Use react property name instead of DOM native name in Component
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unknown-property.md
    'react/no-unknown-property': 'error',

		// Make sure propTypes is source of truth
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unused-prop-types.md
    'react/no-unused-prop-types': [
      'warn',
      {
        customValidators: [],
        skipShapeProps: true,
      },
    ],

		// Extend class instead of using React.createClass
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-es6-class.md
    'react/prefer-es6-class': 'error',

		// Changing function component to class component back and forth is painful
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md
    'react/prefer-stateless-function': 'off',

		// propTypes definition in React Component is helpful
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prop-types.md
    'react/prop-types': 'warn',

		// Always import React when using jsx
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/react-in-jsx-scope.md
    'react/react-in-jsx-scope': 'error',

		// Not all component need optimization
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-optimization.md
    'react/require-optimization': 'off',

		// Always return a component description from React render method
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-render-return.md
    'react/require-render-return': 'error',

		// Component without children doesn't need closing tag
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md
    'react/self-closing-comp': 'warn',

		// Sorting class method is just minor convenience
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/sort-comp.md
    'react/sort-comp': 'off',

		// Not really useful, as we keep prop as minimum as possible
		// similar function params count
    'react/sort-prop-types': 'off',
    'react/jsx-sort-props': 'off',

		// Style prop in React component should be an object
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/style-prop-object.md
    'react/style-prop-object': 'error',

		// No need to explicitly write boolean props as props={true}
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md
    'react/jsx-boolean-value': ['warn', 'never'],

		// Use sane closing bracket location
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md
    'react/jsx-closing-bracket-location': ['error'],

		// No spaces for props inside curly bracket, space after is only for object
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-curly-spacing.md
    'react/jsx-curly-spacing': ['error', 'never'],

		// No space around equal sign inside component props
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-equals-spacing.md
    'react/jsx-equals-spacing': ['error', 'never'],

		// Only include JSX inside .js or .jsx file
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],

		// Disabled, covered in prettier
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-first-prop-new-line.md
    'react/jsx-first-prop-new-line': 'off',

		// Use handle prefix on event handler, except handler passed as prop
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-handler-names.md
    'react/jsx-handler-names': [
      'error',
      {
        eventHandlerPrefix: 'handle',
        eventHandlerPropPrefix: 'on',
      },
    ],

		// Use same indentation as JS styleguide for JSX indent
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent.md
    'react/jsx-indent': ['error', INDENT_TYPE],

		// Disabled, covered by prettier
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent-props.md
    'react/jsx-indent-props': 'off',

		// Always use key prop in array component
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-key.md
    'react/jsx-key': 'error',

		// We use as little props as possible
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-max-props-per-line.md
    'react/jsx-max-props-per-line': 'off',

		// Allow usage of arrow function in render method
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md
    'react/jsx-no-bind': 'off',

		// Prevent accidental comment inside component JSX
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-comment-textnodes.md
    'react/jsx-no-comment-textnodes': 'error',

		// No useless duplicate props
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-duplicate-props.md
    'react/jsx-no-duplicate-props': ['error', { ignoreCase: false }],

		// Recommend using curly bracket for all value inside JSX
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-literals.md
    'react/jsx-no-literals': 'warn',

		// Prevent security issue in target='_blank' (https://mathiasbynens.github.io/rel-noopener)
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-target-blank.md
    'react/jsx-no-target-blank': 'error',

		// No undefined React Component
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-undef.md
    'react/jsx-no-undef': 'error',

		// Always use PascalCase when declaring React Component
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md
    'react/jsx-pascal-case': 'error',

		// Fix no-unused-vars and react/react-in-jsx-scope fighting each other
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-uses-react.md
    'react/jsx-uses-react': 2,

		// Mark variable inside JSX as used
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-uses-vars.md
    'react/jsx-uses-vars': 2,

		// Always wrap multilines react component inside ()
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-wrap-multilines.md
    'react/jsx-wrap-multilines': [
      'error',
      {
        declaration: true,
        assignment: true,
        return: true,
      },
    ],

		// Put space before self closing component
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-tag-spacing.md
    'react/jsx-tag-spacing': ['error', { beforeSelfClosing: 'always' }],

		// Server rendered react component doesn't care about using array index as key
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md
    'react/no-array-index-key': 'off',

		// No need to add default props
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-default-props.md
    'react/require-default-props': 'off',

    // Use is/has prefix for boolean props
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-default-props.md
    'react/boolean-prop-naming': 'warn',

    // Prevent typos
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-typos.md
    'react/no-typos': 'error',

    // No implicit access to foreign propTypes
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-typos.md
    'react/forbid-foreign-prop-types': 'error',

    // Use flowtype to enforce this
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/default-props-match-prop-types.md
    'react/default-props-match-prop-types': 'off',
  },
};
