// AUTOGENERATED FROM https://github.com/vuejs/eslint-plugin-vue/blob/8f094200664a2b10bc597016f5486066a174e098/tests/lib/rules/valid-v-on.js @2022-03-19T13:08:36.802Z
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
const rule = require('../../fixtures/eslint-plugin-vue/lib/rules/valid-v-on')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const tester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {  ecmaVersion: 2015 , templateTokenizer: { pug: path.resolve(__dirname, '../../../')}}
})

tester.run('valid-v-on', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: ''
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(v-on:click="foo")</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(@click="foo")</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(@click.prevent.ctrl.left="foo")</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(@keydown.27="foo")</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(@keydown.enter="foo")</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(@keydown.arrow-down="foo")</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(@keydown.esc="foo")</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(@keydown.a="foo")</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(@keydown.b="foo")</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(@keydown.a.b.c="foo")</template>`
    },
    {
      filename: 'test.vue',
      code: `<!-- CONVERT ERROR -->Invalid end tag.<template><el-from @submit.native.prevent></el-form></template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(v-on:click.prevent)</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(v-on:click.native.stop)</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(v-on="\$listeners")</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(v-on="{a, b, c: d}")</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(@keydown.bar="foo")</template>`,
      options: [{ modifiers: ['bar'] }]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(v-on:keydown.bar.aaa="foo")</template>`,
      options: [{ modifiers: ['bar', 'aaa'] }]
    },
    // parsing error
    {
      filename: 'parsing-error.vue',
      code: `<template lang="pug">MyComponent(v-on:keydown=".")</template>`
    },
    // comment value (valid)
    {
      filename: 'comment-value.vue',
      code: `<template lang="pug">MyComponent(v-on:keydown="/**/")</template>`
    },
    {
      filename: 'comment-value.vue',
      code: `<template lang="pug">MyComponent(v-on:keydown=/**/)</template>`
    },
    {
      filename: 'comment-value.vue',
      code: `<template lang="pug">MyComponent(v-on:keydown.stop="/**/")</template>`
    },
    {
      filename: 'comment-value.vue',
      code: `<template lang="pug">MyComponent(v-on:keydown.stop=/**/)</template>`
    },
    // empty value
    {
      filename: 'empty-value.vue',
      code: `<template lang="pug">MyComponent(v-on:keydown.stop="")</template>`
    }
  ],
  invalid: [
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(v-on:click.aaa="foo")</template>`,
      errors: ["'v-on' directives don't support the modifier 'aaa'."]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(v-on:click)</template>`,
      errors: [
        "'v-on' directives require a value or verb modifier (like 'stop' or 'prevent')."
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(@click)</template>`,
      errors: [
        "'v-on' directives require a value or verb modifier (like 'stop' or 'prevent')."
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(@keydown.bar.aaa="foo")</template>`,
      errors: ["'v-on' directives don't support the modifier 'aaa'."],
      options: [{ modifiers: ['bar'] }]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(@keydown.bar.aaa="foo")</template>`,
      errors: ["'v-on' directives don't support the modifier 'bar'."],
      options: [{ modifiers: ['aaa'] }]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(@click="const")</template>`,
      errors: ['Avoid using JavaScript keyword as "v-on" value: "const".']
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(@click="delete")</template>`,
      errors: ['Avoid using JavaScript keyword as "v-on" value: "delete".']
    },
    // empty value
    {
      filename: 'empty-value.vue',
      code: `<template lang="pug">MyComponent(v-on:keydown="")</template>`,
      errors: [
        "'v-on' directives require a value or verb modifier (like 'stop' or 'prevent')."
      ]
    }
  ]
})
