/**
 * @fileoverview Limit usage of dangerouslySetInnerHTML
 * @author Fatih Kalifa
 */
"use strict";

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

const DEFAULTS = ["script", "style"];

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
	meta: {
		docs: {
			description: "Limit usage of dangerouslySetInnerHTML",
			category: "Best Practices",
			recommended: true
		},
		schema: [
			{
				type: "object",
				properties: {
					allowedTagNames: {
						type: "array",
						items: {
							type: "string"
						}
					}
				},
				additionalProperties: true
			}
		]
	},

	create: function(context) {
		// variables should be defined here

		//----------------------------------------------------------------------
		// Helpers
		//----------------------------------------------------------------------

		/**
		 * Checks if a node name match the JSX tag convention.
		 * @param {String} name - Name of the node to check.
		 * @returns {boolean} Whether or not the node name match the JSX tag convention.
		 */
		const tagConvention = /^[a-z]|-/;
		function isTagName(name) {
			return tagConvention.test(name);
		}

		/**
		 * Checks if a node name is allowed to have dangerous attribute.
		 * @param {String} tagName - JSX tag name
		 * @returns {boolean} Whether or not tag name is allowed to have dangerous attribute
		 */
		function isAllowedTagName(name) {
			const config = context.options[0] || {};
			const allowedTagNames = config.allowedTagNames || DEFAULTS;
			return allowedTagNames.indexOf(name) !== -1;
		}

		/**
		 * Checks if a JSX attribute is dangerous.
		 * @param {String} name - Name of the attribute to check.
		 * @returns {boolean} Whether or not the attribute is dangerous.
		 */
		function isDangerous(name) {
			return name === "dangerouslySetInnerHTML";
		}

		//----------------------------------------------------------------------
		// Public
		//----------------------------------------------------------------------

		return {
			JSXAttribute: function(node) {
				const tagName = node.parent.name.name;
				const attributeName = node.name.name;

				if (isAllowedTagName(tagName)) {
					return;
				}

				if (isTagName(tagName) && isDangerous(attributeName)) {
					context.report({
						node,
						message: `Cannot use dangerouslySetInnerHTML in ${tagName}`
					});
				}
			}
		};
	}
};
