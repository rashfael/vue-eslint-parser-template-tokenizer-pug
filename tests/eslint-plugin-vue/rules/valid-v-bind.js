// AUTOGENERATED FROM https://github.com/vuejs/eslint-plugin-vue/blob/8f094200664a2b10bc597016f5486066a174e098/tests/lib/rules/valid-v-bind.js @2022-03-19T14:17:43.830Z
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
const rule = require('../../fixtures/eslint-plugin-vue/lib/rules/valid-v-bind')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const tester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {  ecmaVersion: 2015 , templateTokenizer: { pug: path.resolve(__dirname, '../../../')}}
})

tester.run('valid-v-bind', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: ''
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(v-bind:aaa="bbb")</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(v-bind:aaa='bbb')</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(v-bind:aaa=bbb)</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(v-bind="bbb")</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(v-bind:aaa.prop='bbb')</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(v-bind:aaa.camel='bbb')</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(:aaa="bbb")</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(:aaa='bbb')</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(:aaa=bbb)</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(:aaa.prop='bbb')</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(:aaa.camel='bbb')</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(:aaa.attr='bbb')</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">input(v-bind='\$attrs')</template>`
    },
    // parsing error
    {
      filename: 'parsing-error.vue',
      code: `<template lang="pug">MyComponent(:foo=".")</template>`
    },
    // comment value (parsing error)
    {
      filename: 'comment-value.vue',
      code: `<template lang="pug">MyComponent(:foo="/**/")</template>`
    }
  ],
  invalid: [
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(v-bind)</template>`,
      errors: ["'v-bind' directives require an attribute value."]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(v-bind:aaa)</template>`,
      errors: ["'v-bind' directives require an attribute value."]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(:aaa.unknown='bbb')</template>`,
      errors: ["'v-bind' directives don't support the modifier 'unknown'."]
    },
    // empty value
    {
      filename: 'empty-value.vue',
      code: `<template lang="pug">MyComponent(:foo="")</template>`,
      errors: ["'v-bind' directives require an attribute value."]
    }
  ]
})
