# Traveloka JavaScript Style Guide

[![Build Status](https://travis-ci.org/traveloka/javascript.svg?branch=master)](https://travis-ci.org/traveloka/javascript)

JavaScript style guide in Traveloka is enforced using tool called `marlint` which is a CLI based linter by extending [ESLint](http://eslint.org/) to support React, Flowtype, and ES2015+ natively.

## Packages

- **[marlint](packages/marlint)**

  Main package, provides CLI and programmatic API.

- **[eslint-config-marlint](packages/eslint-config-marlint)**

  Base config for all eslint rules.

## Getting started

To setup this repo locally, run following commands

```sh
# Clone repo
$ git clone git@github.com:traveloka/javascript
$ cd javascript

# Install dependencies
# This will automatically run `lerna bootstrap` which will install all package
# dependencies and link all packages together
$ npm install
```

To run test use `npm test` in root directory, or if you want to run test manually
for single package just change directory to that package and run `npm test` inside
each package directory.

## Editor Integration

- [Atom](https://github.com/traveloka/atom-linter-marlint)
- [VSCode](https://github.com/traveloka/vscode-marlint)

For other editor, you can install `marlint` globally, then use eslint config from `marlint` using standard eslint editor plugin.

## License

MIT © [Traveloka](https://www.traveloka.com)
