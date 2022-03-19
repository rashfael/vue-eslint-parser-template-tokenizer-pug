// AUTOGENERATED FROM https://github.com/vuejs/eslint-plugin-vue/blob/8f094200664a2b10bc597016f5486066a174e098/tests/lib/rules/valid-v-pre.js @2022-03-19T13:08:36.804Z
/**
 * @author Toru Nagashima
 * @copyright 2017 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester
const path = require('path')
const rule = require('../../fixtures/eslint-plugin-vue/lib/rules/valid-v-pre')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const tester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {  ecmaVersion: 2015 , templateTokenizer: { pug: path.resolve(__dirname, '../../../')}}
})

tester.run('valid-v-pre', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: ''
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div</template>`
    }
  ],
  invalid: [
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(v-pre:aaa)</template>`,
      errors: ["'v-pre' directives require no argument."]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(v-pre.aaa)</template>`,
      errors: ["'v-pre' directives require no modifier."]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div</template>`,
      errors: ["'v-pre' directives require no attribute value."]
    },
    // parsing error
    {
      filename: 'parsing-error.vue',
      code: `<template lang="pug">div</template>`,
      errors: ["'v-pre' directives require no attribute value."]
    },
    // comment value
    {
      filename: 'comment-value.vue',
      code: `<template lang="pug">div</template>`,
      errors: ["'v-pre' directives require no attribute value."]
    },
    // empty value
    {
      filename: 'empty-value.vue',
      code: `<template lang="pug">div</template>`,
      errors: ["'v-pre' directives require no attribute value."]
    }
  ]
})
