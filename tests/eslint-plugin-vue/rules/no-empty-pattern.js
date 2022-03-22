// SKIP AUTOGENERATION
// AUTOGENERATED FROM https://github.com/vuejs/eslint-plugin-vue/blob/8f094200664a2b10bc597016f5486066a174e098/tests/lib/rules/no-empty-pattern.js
/**
 * @author Yosuke Ota
 */
'use strict'

const RuleTester = require('eslint').RuleTester
const path = require('path')
const rule = require('../../fixtures/eslint-plugin-vue/lib/rules/no-empty-pattern')

const tester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {  ecmaVersion: 2018 , templateTokenizer: { pug: path.resolve(__dirname, '../../../')}}
})

tester.run('no-empty-pattern', rule, {
  valid: [
    `<template lang="pug">
div(@attr=\`() => {
    var {a = {}} = foo;
    var {a = []} = foo;
  }\`)
</template>`,
    `<template lang="pug">div(@attr="function foo({a = {}}) {}")</template>`,
    `<template lang="pug">div(@attr="function foo({a = []}) {}")</template>`,
    `<template lang="pug">div(@attr="({a = {}}) => a")</template>`,
    `<template lang="pug">div(@attr="({a = []}) => a")</template>`,
    `<template lang="pug">div(slot-scope="{a = []}")</template>`
  ],
  invalid: [
    {
      code: `<template lang="pug">
div(@attr=\`() => {
    var {} = foo;
    var [] = foo;
    var {a: {}} = foo;
    var {a: []} = foo;
  }\`)
</template>`,
      errors: [
        {
          message: 'Unexpected empty object pattern.',
          line: 3
        },
        {
          message: 'Unexpected empty array pattern.',
          line: 4
        },
        {
          message: 'Unexpected empty object pattern.',
          line: 5
        },
        {
          message: 'Unexpected empty array pattern.',
          line: 6
        }
      ]
    },
    {
      code: `<template lang="pug">div(@attr="function foo({}) {}")</template>`,
      errors: [
        {
          message: 'Unexpected empty object pattern.',
          line: 1
        }
      ]
    },
    {
      code: `<template lang="pug">div(@attr="function foo([]) {}")</template>`,
      errors: [
        {
          message: 'Unexpected empty array pattern.',
          line: 1
        }
      ]
    },
    {
      code: `<template lang="pug">div(@attr="function foo({a: {}}) {}")</template>`,
      errors: [
        {
          message: 'Unexpected empty object pattern.',
          line: 1
        }
      ]
    },
    {
      code: `<template lang="pug">div(@attr="function foo({a: []}) {}")</template>`,
      errors: [
        {
          message: 'Unexpected empty array pattern.',
          line: 1
        }
      ]
    },
    {
      code: `<template lang="pug">div(@attr="({}) => foo()")</template>`,
      errors: [
        {
          message: 'Unexpected empty object pattern.',
          line: 1
        }
      ]
    },
    {
      code: `<template lang="pug">div(@attr="([]) => foo()")</template>`,
      errors: [
        {
          message: 'Unexpected empty array pattern.',
          line: 1
        }
      ]
    },
    {
      code: `<template lang="pug">div(@attr="({a: {}}) => a")</template>`,
      errors: [
        {
          message: 'Unexpected empty object pattern.',
          line: 1
        }
      ]
    },
    {
      code: `<template lang="pug">div(@attr="({a: []}) => a")</template>`,
      errors: [
        {
          message: 'Unexpected empty array pattern.',
          line: 1
        }
      ]
    },
    {
      code: `<template lang="pug">div(slot-scope="{}")</template>`,
      errors: [
        {
          message: 'Unexpected empty object pattern.',
          line: 1
        }
      ]
    },
    {
      code: `<template lang="pug">div(slot-scope="[]")</template>`,
      errors: [
        {
          message: 'Unexpected empty array pattern.',
          line: 1
        }
      ]
    },
    {
      code: `<template lang="pug">div(slot-scope="{a: {}}")</template>`,
      errors: [
        {
          message: 'Unexpected empty object pattern.',
          line: 1
        }
      ]
    },
    {
      code: `<template lang="pug">div(slot-scope="{a: []}")</template>`,
      errors: [
        {
          message: 'Unexpected empty array pattern.',
          line: 1
        }
      ]
    }
  ]
})
