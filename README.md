# vue-eslint-parser-template-tokenizer-pug

## Development

```sh
npm install
npm run setup
```

## Open Questions

### Parse errors
Adding errors to the `templateBody.errors` array doesn't actually seem to affect linting at all, but I found this https://github.com/vuejs/eslint-plugin-vue/blame/master/lib/rules/no-parsing-error.js/
