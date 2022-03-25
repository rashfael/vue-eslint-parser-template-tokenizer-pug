# vue-eslint-parser-template-tokenizer-pug

## Development

```sh
npm install
npm run setup
```

## Open Issues

### Parse errors
Adding errors to the `templateBody.errors` array doesn't actually seem to affect linting at all, but I found this https://github.com/vuejs/eslint-plugin-vue/blame/master/lib/rules/no-parsing-error.js/


### #id and .class shorthands
Shorthands get dropped from attributes list to not affect attribute order. We need to add separate linter rules for those.

### brace style

Existing rule fails at fixing and does not replace " quotes with `.

### parsing commas in dynamic attribute names

pug splits up attribute names like `:[[a,b,][1]]`

### end tags

`component-name-in-template-casing` tries to fix end tags with a hardcoded `</`. We're currently emitting end tags with a width of 0, which breaks this rule.

### spaces added by fix
`first-attribute-linebreak` adds a space between `tag(` and `attr=""` in certain scenarios.

### attribute separators
Things like `max-attributes-per-line` would need to include the `,` in the attribute range for some fixes to work correctly, but this would break `attribute-order`.

### HTML tokens
there are some rules relying on HTML* tokens, like `no-multi-spaces`.

### Rules for class and id
We're not adding `.class` and `#id` declarations to attributes to not break other rules, but then rules for classes, like `no-restricted-class` aren't working.

### Splitting low level mustache tokens

### template attributes

having both lang and src attributes on template, what does that even do?
