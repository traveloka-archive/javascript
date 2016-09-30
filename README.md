# Traveloka JavaScript Style Guide

[![Build Status](https://travis-ci.org/traveloka/javascript.svg?branch=master)](https://travis-ci.org/traveloka/javascript)

JavaScript style guide in Traveloka is enforced using tool called `marlint` which is a CLI based linter by extending [ESLint](http://eslint.org/) to support React, Flowtype, and ES2015+ natively. This repository is a monorepo built using [Lerna](https://github.com/lerna/lerna) to build modules around `marlint` like [Atom](https://atom.io) plugins and base ESLint config.

## Packages

- **[marlint](packages/marlint)**

  Main package, provides CLI and programmatic API.

- **[atom-linter-marlint](packages/atom-linter-marlint)**

  Atom plugin for enabling linter inside Atom editor.

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

### Atom plugin integration

Using Atom when developing these packages will be much easier if you link atom linter
package to your atom packages. By linking `atom-linter-marlint` every changes across
packages will be applied as you save the file (except editing files inside `atom-linter-marlint`
package, you need to reload Atom using `View - Developer - Reload Window`)

```sh
$ cd atom-linter-marlint
$ apm link
```

## Contributing

We have 2 different repository for our packages: `atom-linter-marlint` use `apm` and both `marlint` and `eslint-config-marlint` use `npm`. All of them share the same version defined in `lerna.json`.

To update package version run `npm run update-version`. This will create git commit and tag with updated version in all our packages. Then publish manually for each packages: use `apm publish` on `atom-linter-marlint` and `npm publish` for `marlint` and `eslint-config-marlint`

## License

MIT © [Traveloka](https://www.traveloka.com)
