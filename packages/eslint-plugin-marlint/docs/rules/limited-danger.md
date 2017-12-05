# Limit usage of dangerouslySetInnerHTML (limited-danger)

`dangerouslySetInnerHTML` is useful but opens possibility of XSS. One case where
this is useful is when we want to provide initialState for hydration to Redux /
Apollo state, this is why we only limit its usage to script tag.

## Rule Details

This rule prevent usage of `dangerouslySetInnerHTML` in node other than `script`
and `style` tag.

Examples of **incorrect** code for this rule:

```js
<div dangerouslySetInnerHTML={{ __html: "" }} />;
```

Examples of **correct** code for this rule:

```js
<script dangerouslySetInnerHTML={{ __html: "" }} />;
```

## Rule Options

```js
...
"marlint/limited-danger": [<enabled>, { "allowedTagNames": [<string>] }]
...
```

### `allowedTagNames`

An array of strings, with the name of tag names that are allowed to have
dangerous attribute. The default value of this option is `['script', 'style']`.

## When Not To Use It

When you want to use `dangerouslySetInnerHTML` everywhere

## Further Reading

* [dangerouslySetInnerHTML](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml)
