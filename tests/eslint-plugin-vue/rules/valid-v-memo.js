// AUTOGENERATED FROM https://github.com/vuejs/eslint-plugin-vue/blob/8f094200664a2b10bc597016f5486066a174e098/tests/lib/rules/valid-v-memo.js
/**
 * @author Yosuke Ota <https://github.com/ota-meshi>
 * See LICENSE file in root directory for full license.
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester
const path = require('path')
const rule = require('../../fixtures/eslint-plugin-vue/lib/rules/valid-v-memo')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const tester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {  ecmaVersion: 2021 , templateTokenizer: { pug: path.resolve(__dirname, '../../../')}}
})

tester.run('valid-v-memo', rule, {
  valid: [
    {
      filename: 'test.js',
      code: 'test'
    },
    {
      filename: 'test.vue',
      code: ''
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(v-memo="[x]")</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(v-memo="x")</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(v-memo="x?y:z")</template>`
    },
    // parsing error
    {
      filename: 'parsing-error.vue',
      code: `<template lang="pug">div(v-memo=".")</template>`
    },
    // comment value (parsing error)
    {
      filename: 'parsing-error.vue',
      code: `<template lang="pug">div(v-memo="/**/")</template>`
    },
    // v-for
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(v-for="i in items", v-memo="[x]")</template>`
    }
  ],
  invalid: [
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(v-memo:aaa="x")</template>`,
      errors: ["'v-memo' directives require no argument."]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(v-memo.aaa="x")</template>`,
      errors: ["'v-memo' directives require no modifier."]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(v-memo)</template>`,
      errors: ["'v-memo' directives require that attribute value."]
    },
    // empty value
    {
      filename: 'empty-value.vue',
      code: `<template lang="pug">div(v-memo="")</template>`,
      errors: ["'v-memo' directives require that attribute value."]
    },
    {
      filename: 'test.vue',
      code: `
      <template lang="pug">
div(v-memo="{x}")
div(v-memo="a ? {b}: c+d")
div(v-memo="(a,{b},c(),d+1)")
div(v-memo="()=>42")
div(v-memo="a=42")
</template>`,
      errors: [
        {
          message:
            "'v-memo' directives require the attribute value to be an array.",
          line: 3,
          column: 22
        },
        {
          message:
            "'v-memo' directives require the attribute value to be an array.",
          line: 4,
          column: 26
        },
        {
          message:
            "'v-memo' directives require the attribute value to be an array.",
          line: 4,
          column: 31
        },
        {
          message:
            "'v-memo' directives require the attribute value to be an array.",
          line: 5,
          column: 33
        },
        {
          message:
            "'v-memo' directives require the attribute value to be an array.",
          line: 6,
          column: 22
        },
        {
          message:
            "'v-memo' directives require the attribute value to be an array.",
          line: 7,
          column: 24
        }
      ]
    },
    // v-for
    {
      filename: 'test.vue',
      code: `<template lang="pug">
div(v-for="i in items")
  div(v-memo="[x]")
</template>`,
      errors: [
        {
          message: "'v-memo' directive does not work inside 'v-for'.",
          line: 1,
          column: 40
        }
      ]
    }
  ]
})
