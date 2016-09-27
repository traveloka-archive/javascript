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

## License

MIT © [Traveloka](https://www.traveloka.com)
