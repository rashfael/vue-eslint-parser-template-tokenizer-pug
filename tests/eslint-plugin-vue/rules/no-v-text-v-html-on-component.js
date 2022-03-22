// AUTOGENERATED FROM https://github.com/vuejs/eslint-plugin-vue/blob/8f094200664a2b10bc597016f5486066a174e098/tests/lib/rules/no-v-text-v-html-on-component.js
/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */
'use strict'

const RuleTester = require('eslint').RuleTester
const path = require('path')
const rule = require('../../fixtures/eslint-plugin-vue/lib/rules/no-v-text-v-html-on-component')

const tester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: { 
    ecmaVersion: 2020,
    sourceType: 'module'
  , templateTokenizer: { pug: path.resolve(__dirname, '../../../')}}
})

tester.run('no-v-text-v-html-on-component', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(v-text="content")</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(v-html="content")</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">MyComponent(v-if="content")</template>`
    }
  ],
  invalid: [
    {
      filename: 'test.vue',
      code: `<template lang="pug">MyComponent(v-text="content")</template>`,
      errors: [
        {
          message: "Using v-text on component may break component's content.",
          line: 3,
          column: 22
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">MyComponent(v-html="content")</template>`,
      errors: [
        {
          message: "Using v-html on component may break component's content.",
          line: 3,
          column: 22
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">component(:is="component", v-text="content")</template>`,
      errors: [
        {
          message: "Using v-text on component may break component's content.",
          line: 3,
          column: 36
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">component(:is="component", v-html="content")</template>`,
      errors: [
        {
          message: "Using v-html on component may break component's content.",
          line: 3,
          column: 36
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(:is="component", v-text="content")</template>`,
      errors: [
        {
          message: "Using v-text on component may break component's content.",
          line: 3,
          column: 30
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(:is="component", v-html="content")</template>`,
      errors: [
        {
          message: "Using v-html on component may break component's content.",
          line: 3,
          column: 30
        }
      ]
    }
  ]
})
