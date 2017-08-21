module.exports = {
  plugins: ['jsx-a11y'],
	// View link below for react rules documentation
	// https://github.com/evcohen/eslint-plugin-jsx-a11y#supported-rules
  rules: {
		// Anchor tag (a and Link in react-router) should always have a child
		// https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-has-content.md
    'jsx-a11y/anchor-has-content': 'warn',

		// Use valid ARIA props
		// https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-props.md
    'jsx-a11y/aria-props': 'warn',

		// Use valid ARIA prop value
		// https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-props.md
    'jsx-a11y/aria-proptypes': 'warn',

		// Use valid ARIA role value
		// https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-role.md
    'jsx-a11y/aria-role': 'warn',

		// No useless ARIA prop in unsupported element
		// https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-unsupported-elements.md
    'jsx-a11y/aria-unsupported-elements': 'warn',

		// Heading tag (h1, h2, h3, etc) must have a content
		// https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/heading-has-content.md
    'jsx-a11y/heading-has-content': 'warn',

		// No useless # href on anchor tag
		// https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md
    'jsx-a11y/anchor-is-valid': 'warn',

		// HTML tag must contains lang property
		// https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/html-has-lang.md
    'jsx-a11y/html-has-lang': 'warn',

		// Element with alternative text support should provide it
		// https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/alt-text.md
    'jsx-a11y/alt-text': ['warn', {
      elements: ['img', 'input[type="image"]'],
    }],

		// No need to use image/photo as alt
		// https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/img-redundant-alt.md
    'jsx-a11y/img-redundant-alt': 'warn',

		// Not really useful
		// https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-for.md
    'jsx-a11y/label-has-for': 'off',

		// HTML lang must have valid value
		// https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/lang.md
    'jsx-a11y/lang': 'warn',

		// Interactive element should be focusable
		// https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/interactive-supports-focus.md
    'jsx-a11y/interactive-supports-focus': 'warn',

		// Component with ARIA role must have complete ARIA prop
		// https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/role-has-required-aria-props.md
    'jsx-a11y/role-has-required-aria-props': 'warn',

		// Only add ARIA role supported for that component
		// https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/role-supports-aria-props.md
    'jsx-a11y/role-supports-aria-props': 'warn',

		// Only use scope prop in th element
		// https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/scope.md
    'jsx-a11y/scope': 'warn',

		// No positive tabindex
		// https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/tabindex-no-positive.md
    'jsx-a11y/tabindex-no-positive': 'warn',

    // Use title in iframe
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/iframe-has-title.md
    'jsx-a11y/iframe-has-title': 'error',

		// Currently we don't focus much on a11y for these areas
    'jsx-a11y/no-onchange': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/mouse-events-have-key-events': 'off',
    'jsx-a11y/no-access-key': 'off',
    'jsx-a11y/no-marquee': 'off',
  },
};
