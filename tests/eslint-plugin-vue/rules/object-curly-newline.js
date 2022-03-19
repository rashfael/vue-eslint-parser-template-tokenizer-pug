// AUTOGENERATED FROM https://github.com/vuejs/eslint-plugin-vue/blob/8f094200664a2b10bc597016f5486066a174e098/tests/lib/rules/object-curly-newline.js
/**
 * @author Yosuke Ota
 */
'use strict'

const RuleTester = require('eslint').RuleTester
const path = require('path')
const rule = require('../../fixtures/eslint-plugin-vue/lib/rules/object-curly-newline')

const tester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {  ecmaVersion: 2020 , templateTokenizer: { pug: path.resolve(__dirname, '../../../')}}
})

tester.run('object-curly-newline', rule, {
  valid: [
    `
    <template lang="pug">div(:foo="{a: 1}")</template>`,
    {
      code: `
      <template lang="pug">div(:foo="{a: 1}")</template>`,
      options: ['never']
    },
    `
    <template lang="pug">
div(:foo="{
  a: 1
}")
</template>`,
    {
      code: `
      <template lang="pug">
div(:foo="{
  a: 1
}")
</template>`,
      options: ['always']
    },
    `
    <template lang="pug">div(:[{a:1}]="value")</template>`,
    {
      code: `
      <template lang="pug">div(:[{a:1}]="value")</template>`,
      options: ['always']
    },
    {
      code: `
      <template lang="pug">div(:[{a:1}]="value")</template>`,
      options: ['never']
    }
  ],
  invalid: [
    {
      code: `
      <template lang="pug">
div(:foo="{a: 1
}")
</template>`,
      output: `
      <template lang="pug">div(:foo="{a: 1}")</template>`,
      errors: [
        {
          message: 'Unexpected line break before this closing brace.',
          line: 4,
          column: 9
        }
      ]
    },
    {
      code: `
      <template lang="pug">
div(:foo="{
a: 1}")
</template>`,
      output: `
      <template lang="pug">div(:foo="{a: 1}")</template>`,
      errors: [
        {
          message: 'Unexpected line break after this opening brace.',
          line: 3,
          column: 20
        }
      ]
    },
    {
      code: `
      <template lang="pug">div(:foo="{a: 1}")</template>`,
      output: `
      <template lang="pug">
div(:foo="{
a: 1
}")
</template>`,
      options: ['always'],
      errors: [
        'Expected a line break after this opening brace.',
        'Expected a line break before this closing brace.'
      ]
    },
    {
      code: `
      <template lang="pug">
div(:foo="{
  a: 1
}")
</template>`,
      output: `
      <template lang="pug">div(:foo="{a: 1}")</template>`,
      options: ['never'],
      errors: [
        'Unexpected line break after this opening brace.',
        'Unexpected line break before this closing brace.'
      ]
    }
  ]
})
