# Traveloka JavaScript Style Guide

[![Build Status](https://travis-ci.org/traveloka/javascript.svg?branch=master)](https://travis-ci.org/traveloka/javascript)

JavaScript code standard in Traveloka is enforced using tool called `marlint` which is a CLI based linter by extending [ESLint](http://eslint.org/) to support React, Typescript, Flowtype, and ES2015+ natively. Because this standard doesn't enforce code style, you can use `marlint` and [`prettier`](https://github.com/prettier/prettier) directly without having to configure anything.

Another main features is `marlint` support yarn workspace or lerna monorepo, so you can use different configuration for each packages. To improve performance, `marlint` lint your files in parallel using `jest-worker` so you'll get noticeable performance gain in larger codebase.

## Packages

- **[marlint](packages/marlint)**

  Main package, provides CLI and programmatic API.

- **[eslint-config-marlint](packages/eslint-config-marlint)**

  Base config for all eslint rules.

- **[eslint-plugin-marlint](packages/eslint-plugin-marlint)**

  Additional custom rules for marlint

## Getting started

To setup this repo locally, run following commands

```sh
# Clone repo
$ git clone git@github.com:traveloka/javascript
$ cd javascript

# Install dependencies
# This will automatically run `lerna bootstrap` which will install all package
# dependencies and link all packages together
$ yarn
```

To run test use `yarn test` in root directory, or if you want to run test manually
for single package just change directory to that package and run `yarn test` inside
each package directory.

## Editor Integration

- [VSCode](https://github.com/traveloka/vscode-marlint) (**recommended**)
- [Atom](https://github.com/traveloka/atom-linter-marlint)

For other editor, you can install `marlint` globally, then use eslint config from `marlint` using standard eslint editor plugin.

## License

MIT © [Traveloka](https://www.traveloka.com)
