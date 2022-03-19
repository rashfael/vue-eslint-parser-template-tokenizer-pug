// AUTOGENERATED FROM https://github.com/vuejs/eslint-plugin-vue/blob/8f094200664a2b10bc597016f5486066a174e098/tests/lib/rules/key-spacing.js @2022-03-19T14:17:43.574Z
/**
 * @author Toru Nagashima
 */
'use strict'

const RuleTester = require('eslint').RuleTester
const path = require('path')
const rule = require('../../fixtures/eslint-plugin-vue/lib/rules/key-spacing')

const tester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {  ecmaVersion: 2015 , templateTokenizer: { pug: path.resolve(__dirname, '../../../')}}
})

tester.run('key-spacing', rule, {
  valid: [
    `<template lang="pug">div(:attr="{a: 1}")</template>`,
    `<template lang="pug">div(:[{a:1}[\`a\`]]="a")</template>`,
    {
      code: `<template lang="pug">div(:[{a:1}[\`a\`]]="a")</template>`,
      options: [{ beforeColon: true }]
    }
  ],
  invalid: [
    {
      code: `<template lang="pug">div(:attr="{a :1}")</template>`,
      output: `<template lang="pug">div(:attr="{a: 1}")</template>`,
      errors: [
        "Extra space after key 'a'.",
        "Missing space before value for key 'a'."
      ]
    },
    {
      code: `<template lang="pug">div(:[{a:1}[\`a\`]]="{a:1}[\`a\`]")</template>`,
      options: [{ beforeColon: true }],
      output: `<template lang="pug">div(:[{a:1}[\`a\`]]="{a : 1}[\`a\`]")</template>`,
      errors: [
        "Missing space after key 'a'.",
        "Missing space before value for key 'a'."
      ]
    }
  ]
})
