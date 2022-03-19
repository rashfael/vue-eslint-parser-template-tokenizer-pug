// AUTOGENERATED FROM https://github.com/vuejs/eslint-plugin-vue/blob/8f094200664a2b10bc597016f5486066a174e098/tests/lib/rules/no-deprecated-v-bind-sync.js @2022-03-19T14:17:43.629Z
/**
 * @author Przemyslaw Falowski (@przemkow)
 * @fileoverview Disallow use of deprecated `.sync` modifier on `v-bind` directive (in Vue.js 3.0.0+)
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const path = require('path')
const rule = require('../../fixtures/eslint-plugin-vue/lib/rules/no-deprecated-v-bind-sync')
const RuleTester = require('eslint').RuleTester

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {  ecmaVersion: 2015 , templateTokenizer: { pug: path.resolve(__dirname, '../../../')}}
})

ruleTester.run('no-deprecated-v-bind-sync', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: `<template lang="pug">MyComponent(v-bind:foo='bar')</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">MyComponent(:foo='bar')</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">MyComponent(v-bind:[dynamicArg]='bar')</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">MyComponent(:[dynamicArg]='bar')</template>`
    }
  ],

  invalid: [
    {
      filename: 'test.vue',
      code: `<template lang="pug">MyComponent(v-bind:foo.sync='bar')</template>`,
      output: `<template lang="pug">MyComponent(v-model:foo='bar')</template>`,
      errors: [
        "'.sync' modifier on 'v-bind' directive is deprecated. Use 'v-model:propName' instead."
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">MyComponent(:foo.sync='bar')</template>`,
      output: `<template lang="pug">MyComponent(v-model:foo='bar')</template>`,
      errors: [
        "'.sync' modifier on 'v-bind' directive is deprecated. Use 'v-model:propName' instead."
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">MyComponent(v-bind:[dynamicArg].sync='bar')</template>`,
      output: `<template lang="pug">MyComponent(v-model:[dynamicArg]='bar')</template>`,
      errors: [
        "'.sync' modifier on 'v-bind' directive is deprecated. Use 'v-model:propName' instead."
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">MyComponent(:[dynamicArg].sync='bar')</template>`,
      output: `<template lang="pug">MyComponent(v-model:[dynamicArg]='bar')</template>`,
      errors: [
        "'.sync' modifier on 'v-bind' directive is deprecated. Use 'v-model:propName' instead."
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">MyComponent(v-bind.sync='bar')</template>`,
      output: `<template lang="pug">MyComponent(v-bind.sync='bar')</template>`,
      errors: [
        "'.sync' modifier on 'v-bind' directive is deprecated. Use 'v-model:propName' instead."
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">MyComponent(:foo.sync.unknown="foo")</template>`,
      output: `<template lang="pug">MyComponent(:foo.sync.unknown="foo")</template>`,
      errors: [
        "'.sync' modifier on 'v-bind' directive is deprecated. Use 'v-model:propName' instead."
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">MyComponent(:[dynamicArg].sync.unknown="foo")</template>`,
      output:
        `<template lang="pug">MyComponent(:[dynamicArg].sync.unknown="foo")</template>`,
      errors: [
        "'.sync' modifier on 'v-bind' directive is deprecated. Use 'v-model:propName' instead."
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">
div
  div(v-for="x in list")
    MyComponent(:foo.sync="x.foo")
</template>`,
      output:
        `<template lang="pug">
div
  div(v-for="x in list")
    MyComponent(v-model:foo="x.foo")
</template>`,
      errors: [
        "'.sync' modifier on 'v-bind' directive is deprecated. Use 'v-model:propName' instead."
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">
div
  div(v-for="x in list")
    MyComponent(:foo.sync="foo[x]")
</template>`,
      output:
        `<template lang="pug">
div
  div(v-for="x in list")
    MyComponent(v-model:foo="foo[x]")
</template>`,
      errors: [
        "'.sync' modifier on 'v-bind' directive is deprecated. Use 'v-model:propName' instead."
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">
div
  div(v-for="x in list")
    MyComponent(:foo.sync="foo[x - 1]")
</template>`,
      output:
        `<template lang="pug">
div
  div(v-for="x in list")
    MyComponent(v-model:foo="foo[x - 1]")
</template>`,
      errors: [
        "'.sync' modifier on 'v-bind' directive is deprecated. Use 'v-model:propName' instead."
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">
div
  div(v-for="x in list")
    MyComponent(:foo.sync="foo[\`\${x}\`]")
</template>`,
      output:
        `<template lang="pug">
div
  div(v-for="x in list")
    MyComponent(v-model:foo="foo[\`\${x}\`]")
</template>`,
      errors: [
        "'.sync' modifier on 'v-bind' directive is deprecated. Use 'v-model:propName' instead."
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">
div
  div(v-for="x in list")
    MyComponent(:foo.sync="foo[\`prefix_\${x}\`]")
</template>`,
      output:
        `<template lang="pug">
div
  div(v-for="x in list")
    MyComponent(v-model:foo="foo[\`prefix_\${x}\`]")
</template>`,
      errors: [
        "'.sync' modifier on 'v-bind' directive is deprecated. Use 'v-model:propName' instead."
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">
div
  div(v-for="x in list")
    MyComponent(:foo.sync="foo[x ? x : \'_\']")
</template>`,
      output:
        `<template lang="pug">
div
  div(v-for="x in list")
    MyComponent(v-model:foo="foo[x ? x : \'_\']")
</template>`,
      errors: [
        "'.sync' modifier on 'v-bind' directive is deprecated. Use 'v-model:propName' instead."
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">
div
  div(v-for="x in list")
    MyComponent(:foo.sync="foo[x || \'_\']")
</template>`,
      output:
        `<template lang="pug">
div
  div(v-for="x in list")
    MyComponent(v-model:foo="foo[x || \'_\']")
</template>`,
      errors: [
        "'.sync' modifier on 'v-bind' directive is deprecated. Use 'v-model:propName' instead."
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">
div
  div(v-for="x in list")
    MyComponent(:foo.sync="foo[x()]")
</template>`,
      output:
        `<template lang="pug">
div
  div(v-for="x in list")
    MyComponent(v-model:foo="foo[x()]")
</template>`,
      errors: [
        "'.sync' modifier on 'v-bind' directive is deprecated. Use 'v-model:propName' instead."
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">
div
  div(v-for="x in list")
    MyComponent(:foo.sync="foo[/r/.match(x) ? 0 : 1]")
</template>`,
      output:
        `<template lang="pug">
div
  div(v-for="x in list")
    MyComponent(v-model:foo="foo[/r/.match(x) ? 0 : 1]")
</template>`,
      errors: [
        "'.sync' modifier on 'v-bind' directive is deprecated. Use 'v-model:propName' instead."
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">
div
  div(v-for="x in list")
    MyComponent(:foo.sync="foo[typeof x]")
</template>`,
      output:
        `<template lang="pug">
div
  div(v-for="x in list")
    MyComponent(v-model:foo="foo[typeof x]")
</template>`,
      errors: [
        "'.sync' modifier on 'v-bind' directive is deprecated. Use 'v-model:propName' instead."
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">
div
  div(v-for="x in list")
    MyComponent(:foo.sync="foo[tag\`\${x}\`]")
</template>`,
      output:
        `<template lang="pug">
div
  div(v-for="x in list")
    MyComponent(v-model:foo="foo[tag\`\${x}\`]")
</template>`,
      errors: [
        "'.sync' modifier on 'v-bind' directive is deprecated. Use 'v-model:propName' instead."
      ]
    }
  ]
})
