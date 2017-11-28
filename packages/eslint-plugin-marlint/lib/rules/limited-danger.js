/**
 * @fileoverview Limit usage of dangerouslySetInnerHTML
 * @author Fatih Kalifa
 */
"use strict";

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
    schema: []
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
    const tagConvention = /^[a-z]|\-/;
    function isTagName(name) {
      return tagConvention.test(name);
    }

    /**
     * Checks if a node name is allowed to have .
     * @param {String} tagName - JSX tag name
     * @returns {boolean} Whether or not the node name match the JSX tag convention.
     */
    function isAllowedTagName(name) {
      return name === "script";
    }

    /**
     * Checks if a JSX attribute is dangerous.
     * @param {String} name - Name of the attribute to check.
     * @returns {boolean} Whether or not the attribute is dnagerous.
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
