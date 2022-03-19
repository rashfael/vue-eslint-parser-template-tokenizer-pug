// AUTOGENERATED FROM https://github.com/vuejs/eslint-plugin-vue/blob/8f094200664a2b10bc597016f5486066a174e098/tests/lib/rules/static-class-names-order.js @2022-03-19T14:17:43.792Z
/**
 * @fileoverview enforce ordering of classes
 * @author Maciej Chmurski
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const path = require('path')
const rule = require('../../fixtures/eslint-plugin-vue/lib/rules/static-class-names-order')
const RuleTester = require('eslint').RuleTester

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const tester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {  ecmaVersion: 2015 , templateTokenizer: { pug: path.resolve(__dirname, '../../../')}}
})
tester.run('static-class-names-order', rule, {
  valid: [
    {
      filename: 'no-classes.vue',
      code: `<template lang="pug">div</template>`
    },
    {
      filename: 'one-class.vue',
      code: `<template lang="pug">.a</template>`
    },
    {
      filename: 'single-space.vue',
      code: `<template lang="pug">.a.b.c</template>`
    },
    {
      filename: 'multiple-spaces.vue',
      code: `<template lang="pug">.a.b.c</template>`
    },
    {
      filename: 'tabs.vue',
      code: `<template lang="pug">.a.b.c</template>`
    }
  ],

  invalid: [
    {
      filename: 'two-classes.vue',
      code: `<template lang="pug">.b.a</template>`,
      output: `<template lang="pug">.a.b</template>`,
      errors: [
        {
          message: 'Classes should be ordered alphabetically.',
          type: 'VAttribute'
        }
      ]
    },
    {
      filename: 'three-classes.vue',
      code: `<template lang="pug">.c.b.a</template>`,
      output: `<template lang="pug">.a.b.c</template>`,
      errors: [
        {
          message: 'Classes should be ordered alphabetically.',
          type: 'VAttribute'
        }
      ]
    }
  ]
})
