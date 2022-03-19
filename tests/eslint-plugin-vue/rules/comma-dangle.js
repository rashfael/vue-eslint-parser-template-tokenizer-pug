// AUTOGENERATED FROM https://github.com/vuejs/eslint-plugin-vue/blob/8f094200664a2b10bc597016f5486066a174e098/tests/lib/rules/comma-dangle.js @2022-03-19T14:17:43.537Z
/**
 * @author Yosuke Ota
 */
'use strict'

const RuleTester = require('eslint').RuleTester
const path = require('path')
const rule = require('../../fixtures/eslint-plugin-vue/lib/rules/comma-dangle')

const tester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {  ecmaVersion: 2018 , templateTokenizer: { pug: path.resolve(__dirname, '../../../')}}
})

tester.run('comma-dangle', rule, {
  valid: [
    `<template lang="pug">button(@click="() => fn([a, b])")</template>`,
    {
      code: `
        <template lang="pug">CustomButton(@click="(\$event) => fn()")</template>`,
      options: [
        {
          functions: 'never'
        }
      ]
    },
    {
      code: `
        <template lang="pug">button(@click="() => fn([a, b, ])")</template>`,
      options: [
        {
          arrays: 'ignore'
        }
      ]
    },
    {
      code: `
      <template lang="pug">button(:[[a,b][1]]="a")</template>`
    },
    {
      code: `
      <template lang="pug">button(:[[a,b,][1]]="a")</template>`,
      options: ['always']
    }
  ],
  invalid: [
    {
      code: `
        <template lang="pug">button(@click="() => fn([a, b,])")</template>`,
      output: `
        <template lang="pug">button(@click="() => fn([a, b])")</template>`,
      errors: [
        {
          message: 'Unexpected trailing comma.',
          line: 3
        }
      ]
    },
    {
      code: `
        <template lang="pug">CustomButton(@click="(\$event, ) => fn()")</template>`,
      options: [
        {
          functions: 'never'
        }
      ],
      output: `
        <template lang="pug">CustomButton(@click="(\$event ) => fn()")</template>`,
      errors: [
        {
          message: 'Unexpected trailing comma.',
          line: 3
        }
      ]
    },
    {
      code: `
        <template lang="pug">
button(@click="() => {
  fn([a, b, ])
  fn([
    a,
    b
  ])
}")
</template>`,
      options: ['always-multiline'],
      output: `
        <template lang="pug">
button(@click="() => {
  fn([a, b ])
  fn([
    a,
    b,
  ])
}")
</template>`,
      errors: [
        {
          message: 'Unexpected trailing comma.',
          line: 4
        },
        {
          message: 'Missing trailing comma.',
          line: 7
        }
      ]
    },
    {
      code: `
      <template lang="pug">button(:[[a,b,][1]]="a")</template>`,
      output: `
      <template lang="pug">button(:[[a,b][1]]="a")</template>`,
      errors: [
        {
          message: 'Unexpected trailing comma.'
        }
      ]
    },
    {
      code: `
      <template lang="pug">button(:[[a,b][1]]="a")</template>`,
      output: `
      <template lang="pug">button(:[[a,b,][1]]="a")</template>`,
      options: ['always'],
      errors: [
        {
          message: 'Missing trailing comma.'
        }
      ]
    }
  ]
})
