// AUTOGENERATED FROM https://github.com/vuejs/eslint-plugin-vue/blob/8f094200664a2b10bc597016f5486066a174e098/tests/lib/rules/space-unary-ops.js @2022-03-19T13:08:36.743Z
/**
 * @author Toru Nagashima
 */
'use strict'

const RuleTester = require('eslint').RuleTester
const path = require('path')
const rule = require('../../fixtures/eslint-plugin-vue/lib/rules/space-unary-ops')

const tester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {  ecmaVersion: 2015 , templateTokenizer: { pug: path.resolve(__dirname, '../../../')}}
})

tester.run('space-unary-ops', rule, {
  valid: [
    `<template lang="pug">div(:attr="-a")</template>`,
    `<template lang="pug">div(:attr="typeof a")</template>`,
    `<template lang="pug">div(:[typeof(a)]="a")</template>`,
    {
      code: `<template lang="pug">div(:attr="! a")</template>`,
      options: [{ nonwords: true }]
    },
    {
      code: `<template lang="pug">div(:[!a]="a")</template>`,
      options: [{ nonwords: true }]
    },
    // CSS vars injection
    `
    <style>
    .text {
      padding: v-bind(\`\${-num}px\`)
    }
    </style>`
  ],
  invalid: [
    {
      code: `<template lang="pug">div(:attr="- a")</template>`,
      output: `<template lang="pug">div(:attr="-a")</template>`,
      errors: ["Unexpected space after unary operator '-'."]
    },
    {
      code: `<template lang="pug">div(:attr="typeof(a)")</template>`,
      output: `<template lang="pug">div(:attr="typeof (a)")</template>`,
      errors: ["Unary word operator 'typeof' must be followed by whitespace."]
    },
    {
      code: `<template lang="pug">div(:[typeof(a)]="typeof(a)")</template>`,
      output: `<template lang="pug">div(:[typeof(a)]="typeof (a)")</template>`,
      errors: ["Unary word operator 'typeof' must be followed by whitespace."]
    },
    {
      code: `<template lang="pug">div(:[!a]="!a")</template>`,
      options: [{ nonwords: true }],
      output: `<template lang="pug">div(:[!a]="! a")</template>`,
      errors: ["Unary operator '!' must be followed by whitespace."]
    },

    // CSS vars injection
    {
      code: `
      <style>
      .text {
        padding: v-bind(\`\${- num}px\`)
      }
      </style>`,
      output: `
      <style>
      .text {
        padding: v-bind(\`\${-num}px\`)
      }
      </style>`,
      errors: ["Unexpected space after unary operator '-'."]
    }
  ]
})
