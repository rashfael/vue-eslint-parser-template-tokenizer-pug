// AUTOGENERATED FROM https://github.com/vuejs/eslint-plugin-vue/blob/8f094200664a2b10bc597016f5486066a174e098/tests/lib/rules/eqeqeq.js @2022-03-19T13:08:36.599Z
/**
 * @author Toru Nagashima
 */
'use strict'

const RuleTester = require('eslint').RuleTester
const path = require('path')
const rule = require('../../fixtures/eslint-plugin-vue/lib/rules/eqeqeq')

const tester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {  ecmaVersion: 2015 , templateTokenizer: { pug: path.resolve(__dirname, '../../../')}}
})

tester.run('eqeqeq', rule, {
  valid: [
    `<template lang="pug">div(:attr="a === 1")</template>`,
    // CSS vars injection
    `
    <style>
    .text {
      color: v-bind(a === 1 ? 'red' : 'blue')
    }
    </style>`
  ],
  invalid: [
    {
      code: `<template lang="pug">div(:attr="a == 1")</template>`,
      errors: ["Expected '===' and instead saw '=='."]
    },
    // CSS vars injection
    {
      code: `
      <style>
      .text {
        color: v-bind(a == 1 ? 'red' : 'blue')
      }
      </style>`,
      errors: ["Expected '===' and instead saw '=='."]
    }
  ]
})
