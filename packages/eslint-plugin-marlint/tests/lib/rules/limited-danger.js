/**
 * @fileoverview Limit usage of dangerouslySetInnerHTML
 * @author Fatih Kalifa
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/limited-danger");
const RuleTester = require("eslint").RuleTester;

const parserOptions = {
  ecmaVersion: 8,
  sourceType: "module",
  ecmaFeatures: {
    experimentalObjectRestSpread: true,
    jsx: true
  }
};

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester({ parserOptions });
ruleTester.run("limited-danger", rule, {
  valid: [
    { code: '<div>{"html"}</div>' },
    { code: '<script dangerouslySetInnerHTML={{ __html: "html" }} />' }
  ],

  invalid: [
    {
      code: '<div dangerouslySetInnerHTML={{ __html: "html" }} />',
      errors: [{ message: "Cannot use dangerouslySetInnerHTML in div" }]
    }
  ]
});
