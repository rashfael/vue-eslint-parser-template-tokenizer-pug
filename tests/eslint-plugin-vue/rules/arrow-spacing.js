// AUTOGENERATED FROM https://github.com/vuejs/eslint-plugin-vue/blob/8f094200664a2b10bc597016f5486066a174e098/tests/lib/rules/arrow-spacing.js
/**
 * @author Yosuke Ota
 */
'use strict'

const RuleTester = require('eslint').RuleTester
const path = require('path')
const rule = require('../../fixtures/eslint-plugin-vue/lib/rules/arrow-spacing')

const tester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {  ecmaVersion: 2015 , templateTokenizer: { pug: path.resolve(__dirname, '../../../')}}
})

tester.run('arrow-spacing', rule, {
  valid: [
    `<template lang="pug">div(:attr="() => a")</template>`,
    `<template lang="pug">div(@click="() => a")</template>`,
    `<template lang="pug">
div(@click="
  const fn = () => a
  fn()
")
</template>`,
    {
      code: `
        <template lang="pug">div(:attr="()=>a")</template>`,
      options: [{ before: false, after: false }]
    }
  ],
  invalid: [
    {
      code: `
        <template lang="pug">div(:attr="()=>a")</template>`,
      output: `
        <template lang="pug">div(:attr="() => a")</template>`,
      errors: [
        {
          message: 'Missing space before =>.',
          line: 3
        },
        {
          message: 'Missing space after =>.',
          line: 3
        }
      ]
    },
    {
      code: `
        <template lang="pug">div(@click="()=>a")</template>`,
      output: `
        <template lang="pug">div(@click="() => a")</template>`,
      errors: [
        {
          message: 'Missing space before =>.',
          line: 3
        },
        {
          message: 'Missing space after =>.',
          line: 3
        }
      ]
    },
    {
      code: `
        <template lang="pug">
div(@click="
  const fn = ()=>a
  fn()
")
</template>`,
      output: `
        <template lang="pug">
div(@click="
  const fn = () => a
  fn()
")
</template>`,
      errors: [
        {
          message: 'Missing space before =>.',
          line: 4
        },
        {
          message: 'Missing space after =>.',
          line: 4
        }
      ]
    },
    {
      code: `
        <template lang="pug">div(:attr="() => a")</template>`,
      options: [{ before: false, after: false }],
      output: `
        <template lang="pug">div(:attr="()=>a")</template>`,
      errors: [
        {
          message: 'Unexpected space before =>.',
          line: 3
        },
        {
          message: 'Unexpected space after =>.',
          line: 3
        }
      ]
    }
  ]
})
