# eslint-plugin-marlint

Traveloka custom eslint plugin

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-marlint`:

```
$ npm install eslint-plugin-marlint --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must
also install `eslint-plugin-marlint` globally.

## Usage

Add `marlint` to the plugins section of your `.eslintrc` configuration file. You
can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["marlint"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "marlint/limited-danger": 2
  }
}
```

## Supported Rules

* [limited-danger](docs/rules/limited-danger)
