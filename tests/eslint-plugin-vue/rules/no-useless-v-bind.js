// SKIP AUTOGENERATION
// AUTOGENERATED FROM https://github.com/vuejs/eslint-plugin-vue/blob/8f094200664a2b10bc597016f5486066a174e098/tests/lib/rules/no-useless-v-bind.js
/**
 * @author Yosuke Ota
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester
const path = require('path')
const rule = require('../../fixtures/eslint-plugin-vue/lib/rules/no-useless-v-bind.js')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const tester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: { 
    ecmaVersion: 2020,
    sourceType: 'module'
  , templateTokenizer: { pug: path.resolve(__dirname, '../../../')}}
})

tester.run('no-useless-v-bind', rule, {
  valid: [
    `<template lang="pug">
#foo
#foo
#foo
div(:id="foo")
div(:id="'foo' || 'bar'")
div(:id="1")
div(:id)
div(:id="{")
div(:id="null")
</template>`,
    {
      code: `<template lang="pug">
div(:id="'comment'/*comment*/")
div(:id="'comment'//comment
")
</template>`,
      options: [{ ignoreIncludesComment: true }]
    },
    {
      code: `<template lang="pug">
div(:id="'\\n'")
div(:id="'\\r'")
</template>`,
      options: [{ ignoreStringEscape: true }]
    }
  ],
  invalid: [
    {
      code: `<template lang="pug">
div(:id="'foo'")
div(v-bind:id="'foo'")
</template>`,
      output: `<template lang="pug">
#foo
#foo
</template>`,
      errors: [
        {
          message: 'Unexpected `v-bind` with a string literal value.',
          line: 3,
          column: 14,
          endLine: 3,
          endColumn: 25
        },
        {
          message: 'Unexpected `v-bind` with a string literal value.',
          line: 4,
          column: 14,
          endLine: 4,
          endColumn: 31
        }
      ]
    },
    {
      code: `<template lang="pug">
div(:id="'comment'/*comment*/")
div(:id="'comment'//comment
")
</template>`,
      output: null,
      errors: [
        'Unexpected `v-bind` with a string literal value.',
        'Unexpected `v-bind` with a string literal value.'
      ]
    },
    {
      code: `<template lang="pug">
div(:id="'\\n'")
div(:id="'\\r'")
</template>`,
      output: null,
      errors: [
        'Unexpected `v-bind` with a string literal value.',
        'Unexpected `v-bind` with a string literal value.'
      ]
    },
//     {
//       code: `<!-- CONVERT ERROR -->Unquoted attribute value cannot contain U+0022 ("), U+0027 ('), U+003C (<), U+003D (=), and U+0060 (\`).
// <!-- CONVERT ERROR -->Unquoted attribute value cannot contain U+0022 ("), U+0027 ('), U+003C (<), U+003D (=), and U+0060 (\`).      <template>
//         <div :id="'&quot;'" />
//         <div :id=\`&quot;&apos;\` />
//         <div :id="'\\\\'" />
//         <div :id="'\\\\r'" />
//         <div :id="'\\'" />
//         <div :id="\`foo\`" />
//         <div :id="\`foo\${bar}\`" />
//         <div :id='"&apos;"' />
//         <div :id=\`foo\` />
//       </template>`,
//       output: `
//       <template lang="pug">
// #"
// #"'
// #\\
// #\\r
// div(:id="'\\'")
// #foo
// div(:id="\`foo\${bar}\`")
// #'
// #foo
// </template>`,
//       errors: [
//         'Unexpected `v-bind` with a string literal value.',
//         'Unexpected `v-bind` with a string literal value.',
//         'Unexpected `v-bind` with a string literal value.',
//         'Unexpected `v-bind` with a string literal value.',
//         'Unexpected `v-bind` with a string literal value.',
//         'Unexpected `v-bind` with a string literal value.',
//         'Unexpected `v-bind` with a string literal value.'
//       ]
//     }
  ]
})
