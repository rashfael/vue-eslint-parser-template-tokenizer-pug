// AUTOGENERATED FROM https://github.com/vuejs/eslint-plugin-vue/blob/8f094200664a2b10bc597016f5486066a174e098/tests/lib/rules/dot-notation.js @2022-03-19T13:08:36.598Z
/**
 * @author Yosuke Ota
 */
'use strict'

const RuleTester = require('eslint').RuleTester
const path = require('path')
const rule = require('../../fixtures/eslint-plugin-vue/lib/rules/dot-notation')

const tester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {  ecmaVersion: 2015 , templateTokenizer: { pug: path.resolve(__dirname, '../../../')}}
})

tester.run('dot-notation', rule, {
  valid: [
    `<template lang="pug">div(:attr="foo.bar")</template>`,
    `<template lang="pug">div(attr="foo[\'bar\']")</template>`,
    `<template lang="pug">div(:[foo.bar]="a")</template>`,
    `<template lang="pug">div(:attr="foo[bar]")</template>`,
    `<template lang="pug">div(:[foo[bar]]="a")</template>`,
    // CSS vars injection
    `
    <style>
    .text {
      color: v-bind(foo.bar)
    }
    </style>`
  ],
  invalid: [
    {
      code: `<template lang="pug">div(:attr="foo['bar']")</template>`,
      output: `<template lang="pug">div(:attr="foo.bar")</template>`,
      errors: ['["bar"] is better written in dot notation.']
    },
    {
      code: `<template lang="pug">div(:[foo[\`bar\`]]="a")</template>`,
      output: `<template lang="pug">div(:[foo.bar]="a")</template>`,
      errors: ['[`bar`] is better written in dot notation.']
    },
    // CSS vars injection
    {
      code: `
      <style>
      .text {
        color: v-bind(foo[\`bar\`])
      }
      </style>`,
      output: `
      <style>
      .text {
        color: v-bind(foo.bar)
      }
      </style>`,
      errors: ['[`bar`] is better written in dot notation.']
    },
    {
      code: `
      <style>
      .text {
        color: v-bind("foo[\`bar\`]")
      }
      </style>`,
      output: `
      <style>
      .text {
        color: v-bind("foo.bar")
      }
      </style>`,
      errors: ['[`bar`] is better written in dot notation.']
    }
  ]
})
