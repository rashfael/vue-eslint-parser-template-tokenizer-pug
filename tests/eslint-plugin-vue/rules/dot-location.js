// AUTOGENERATED FROM https://github.com/vuejs/eslint-plugin-vue/blob/8f094200664a2b10bc597016f5486066a174e098/tests/lib/rules/dot-location.js @2022-03-19T13:08:36.597Z
/**
 * @author Yosuke Ota
 */
'use strict'

const RuleTester = require('eslint').RuleTester
const path = require('path')
const rule = require('../../fixtures/eslint-plugin-vue/lib/rules/dot-location')

const tester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {  ecmaVersion: 2015 , templateTokenizer: { pug: path.resolve(__dirname, '../../../')}}
})

tester.run('dot-location', rule, {
  valid: [
    `<template lang="pug">
div(:attr="foo.
    bar")
</template>`,
    {
      code: `
      <template>
        <div
          :attr="foo
            .bar"
        />
      </template>`,
      options: ['property']
    }
  ],
  invalid: [
    {
      code: `
      <template>
        <div
          :attr="foo
            .bar"
        />
      </template>`,
      output: `
      <template>
        <div
          :attr="foo.
            bar"
        />
      </template>`,
      errors: [
        {
          message: 'Expected dot to be on same line as object.',
          line: 5
        }
      ]
    },
    {
      code: `
      <template>
        <div
          :attr="foo.
            bar"
        />
      </template>`,
      options: ['property'],
      output: `
      <template>
        <div
          :attr="foo
            .bar"
        />
      </template>`,
      errors: [
        {
          message: 'Expected dot to be on same line as property.',
          line: 4
        }
      ]
    }
  ]
})
