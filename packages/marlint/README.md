# Marlint

> JavaScript strict code style with ES6+ES7, React, and Flowtype (inspired from [XO](https://github.com/sindresorhus/xo))

Enforce strict code style. Never discuss code style on a code review again

No decision-making. No `.eslintrc`, `.jshintrc`, `.jscsrc` to manage. It just works!

## Basic feature

- ES6+ES7 support
- Flowtype compatible (will not throw error on flow annotation)
- React (and JSX) support (with sane rules, like no implicit React dependency on JS file with JSX syntax)

## Code style

- 2 Space indentation
- Semicolons
- Single-quotes
- No unused variables
- Space after keyword `if (condition) {}`
- Always `===` instead of `==`

*Any of these can be [overridden](#rules) if necessary.*

Check out an [example](index.js) and the [ESLint rules](https://github.com/traveloka/eslint-config-marlint/blob/master/index.js).


## Install

```
$ npm install --global marlint
```

## Usage

```
$ marlint --help

  Usage
    $ marlint [<file|glob> ...]

  Options
    --compact  Compact output
    --stdin    Validate code from stdin
    --env      Environment preset  [Can be set multiple times]
    --global   Global variable  [Can be set multiple times]
    --ignore   Additional paths to ignore  [Can be set multiple times]

  Examples
    $ marlint
    $ marlint index.js
    $ marlint *.js !foo.js
    $ marlint --env=node --env=mocha

  Tips
    Put options in package.json instead of using flags so other tools can read it.
```

## Config

You can configure some options in Marlint by putting it in `package.json`:

```js
{
	"name": "your-project",
	"marlint": {
		"envs": ["node", "mocha"]
	}
}
```

[Globals](http://eslint.org/docs/user-guide/configuring#specifying-globals) and [rules](http://eslint.org/docs/user-guide/configuring#configuring-rules) can be configured inline in files.

### envs

Type: `array`  
Default: `['node']`

Which [environments](http://eslint.org/docs/user-guide/configuring#specifying-environments) your code is designed to run in. Each environment brings with it a certain set of predefined global variables.

### globals

Type: `array`

Additional global variables your code accesses during execution.

### ignores

Type: `array`

Some [paths](https://github.com/sindresorhus/marlint/blob/4a0db396766118d7918577d759cacb05cd99a354/index.js#L14-L20) are ignored by default. Additional ignores can be added here.

### rules

Type: `object`  

Override any of the [default rules](https://github.com/sindresorhus/eslint-config-marlint/blob/master/index.js). See the [ESLint docs](http://eslint.org/docs/rules/) for more info on each rule.

Please take a moment to consider if you really need to use this option.

## FAQ

#### Why not ESLint / Standard / XO?

This project aims to simplify code convention across Traveloka javascripts code by just typing `marlint` and be done. No decision-making, no config. Standard is way too opinionated and the rules is not meant to be changed. We could use XO, but we have to add support for ES6+ES7, React and Flowtype everytime we add new JavaScript project and that means duplicate config file. This tool is created to solve that problem.

## Editors

- [Atom Linter Marlint](https://github.com/traveloka/atom-linter-marlint)

## Related

- [eslint-config-marlint](https://github.com/traveloka/eslint-config-marlint) - ESLint shareable config for Marlint

## License

MIT © [Traveloka](http://traveloka.com)
