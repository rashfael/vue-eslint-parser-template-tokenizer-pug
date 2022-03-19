// AUTOGENERATED FROM https://github.com/vuejs/eslint-plugin-vue/blob/8f094200664a2b10bc597016f5486066a174e098/tests/lib/rules/space-infix-ops.js
/**
 * @author Toru Nagashima
 */
'use strict'

const { RuleTester, ESLint } = require('../../fixtures/eslint-plugin-vue/tests/eslint-compat')
const semver = require('semver')
const path = require('path')
const rule = require('../../fixtures/eslint-plugin-vue/lib/rules/space-infix-ops')

const tester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {  ecmaVersion: 2015 , templateTokenizer: { pug: path.resolve(__dirname, '../../../')}}
})

const message = semver.lt(ESLint.version, '5.10.0')
  ? () => 'Infix operators must be spaced.'
  : (operator) => `Operator '${operator}' must be spaced.`

tester.run('space-infix-ops', rule, {
  valid: [
    `<template lang="pug">div(:attr="a + 1")</template>`,
    `<template lang="pug">div(:attr="a ? 1 : 2")</template>`,
    `<template lang="pug">div(:[1+2]="a")</template>`,

    // CSS vars injection
    `
    <style>
    .text {
      padding: v-bind('a + b + "px"')
    }
    </style>`
  ],
  invalid: [
    {
      code: `<template lang="pug">div(:attr="a+1")</template>`,
      output: `<template lang="pug">div(:attr="a + 1")</template>`,
      errors: [message('+')]
    },
    {
      code: `<template lang="pug">div(:attr="a?1 : 2")</template>`,
      output: `<template lang="pug">div(:attr="a ? 1 : 2")</template>`,
      errors: [message('?')]
    },
    {
      code: `<template lang="pug">div(:attr="a ? 1:2")</template>`,
      output: `<template lang="pug">div(:attr="a ? 1 : 2")</template>`,
      errors: [message(':')]
    },
    {
      code: `<template lang="pug">div(:[1+2]="1+2")</template>`,
      output: `<template lang="pug">div(:[1+2]="1 + 2")</template>`,
      errors: [message('+')]
    },

    // CSS vars injection
    {
      code: `
      <style>
      .text {
        padding: v-bind('a+b+"px"')
      }
      </style>`,
      output: `
      <style>
      .text {
        padding: v-bind('a + b + "px"')
      }
      </style>`,
      errors: [message('+'), message('+')]
    }
  ]
})
