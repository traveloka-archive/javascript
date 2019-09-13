# eslint-config-marlint

> ESLint [shareable config](http://eslint.org/docs/developer-guide/shareable-configs.html) for [Marlint](https://github.com/traveloka/javascript/packages/marlint)

This is ESLint config inspired from [XO](https://github.com/sindresorhus/xo) with some adjustment in order to support ES2015+, [React](https://facebook.github.io/react) and [Flow](http://flowtype.org/) by default, using [babel-eslint](https://github.com/babel/babel-eslint) internally.

For easier setup, you might want to use [Marlint](https://github.com/traveloka/javascript/packages/marlint)

## Install

```
$ npm install eslint-config-marlint --save-dev
```

You also need to install other dependencies if you're on npm 3 (if you're on npm 2 it will be installed automatically)

```
$ npm install babel-eslint eslint-plugin-babel eslint-plugin-react eslint-plugin-jsx-a11y --save-dev
```

## Usage

Add some ESLint config to your `package.json`:

```json
{
  "name": "your-project-name",
  "eslintConfig": {
    "extends": "marlint"
  }
}
```

Or to `.eslintrc`:

```json
{
  "extends": "marlint"
}
```

## License

MIT © [Traveloka](https://www.traveloka.com)
