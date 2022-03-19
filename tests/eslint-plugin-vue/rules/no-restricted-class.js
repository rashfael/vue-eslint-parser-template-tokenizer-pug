// AUTOGENERATED FROM https://github.com/vuejs/eslint-plugin-vue/blob/8f094200664a2b10bc597016f5486066a174e098/tests/lib/rules/no-restricted-class.js @2022-03-19T14:17:43.671Z
/**
 * @author Tao Bojlen
 */

'use strict'

const path = require('path')
const rule = require('../../fixtures/eslint-plugin-vue/lib/rules/no-restricted-class')
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {  ecmaVersion: 2020, sourceType: 'module' , templateTokenizer: { pug: path.resolve(__dirname, '../../../')}}
})

ruleTester.run('no-restricted-class', rule, {
  valid: [
    { code: `<template lang="pug">.allowed Content</template>` },
    {
      code: `<!-- CONVERT ERROR -->Whitespace was expected.<template><div class="allowed"">Content</div></template>`,
      options: ['forbidden']
    },
    {
      code: `<template lang="pug">div(:class="'allowed' + forbidden") Content</template>`,
      options: ['forbidden']
    },
    {
      code: `<template lang="pug">div(@class="forbidden") Content</template>`,
      options: ['forbidden']
    },
    {
      code: `<template lang="pug">div(:class="'' + {forbidden: true}") Content</template>`,
      options: ['forbidden']
    }
  ],

  invalid: [
    {
      code: `<template lang="pug">.forbidden.allowed</template>`,
      errors: [
        {
          message: "'forbidden' class is not allowed.",
          type: 'VAttribute'
        }
      ],
      options: ['forbidden']
    },
    {
      code: `<template lang="pug">div(:class="'forbidden' + ' ' + 'allowed' + someVar")</template>`,
      errors: [
        {
          message: "'forbidden' class is not allowed.",
          type: 'Literal'
        }
      ],
      options: ['forbidden']
    },
    {
      code: `<template lang="pug">div(:class="{'forbidden': someBool, someVar: true}")</template>`,
      errors: [
        {
          message: "'forbidden' class is not allowed.",
          type: 'Literal'
        }
      ],
      options: ['forbidden']
    },
    {
      code: `<template lang="pug">div(:class="{forbidden: someBool}")</template>`,
      errors: [
        {
          message: "'forbidden' class is not allowed.",
          type: 'Identifier'
        }
      ],
      options: ['forbidden']
    },
    {
      code: `<template lang="pug">div(:class="\`forbidden \${someVar}\`")</template>`,
      errors: [
        {
          message: "'forbidden' class is not allowed.",
          type: 'TemplateElement'
        }
      ],
      options: ['forbidden']
    },
    {
      code: `<template lang="pug">div(:class="'forbidden'")</template>`,
      errors: [
        {
          message: "'forbidden' class is not allowed.",
          type: 'Literal'
        }
      ],
      options: ['forbidden']
    },
    {
      code: `<template lang="pug">div(:class="['forbidden', 'allowed']")</template>`,
      errors: [
        {
          message: "'forbidden' class is not allowed.",
          type: 'Literal'
        }
      ],
      options: ['forbidden']
    },
    {
      code: `<template lang="pug">div(:class="['allowed forbidden', someString]")</template>`,
      errors: [
        {
          message: "'forbidden' class is not allowed.",
          type: 'Literal'
        }
      ],
      options: ['forbidden']
    }
  ]
})
