module.exports = {
  rules: {
    // https://github.com/prettier/eslint-config-prettier#curly
    // we want to enforce using curly brace for if statement
    // prettier doesn't format non curly to curly because it's different AST
    curly: ['error', 'all'],
    // https://github.com/prettier/eslint-config-prettier#no-confusing-arrow
    // it's generally better to use return statement
    "no-confusing-arrow": "error"
  }
}
