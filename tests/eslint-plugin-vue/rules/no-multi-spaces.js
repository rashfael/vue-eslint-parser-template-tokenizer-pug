// SKIP AUTOGENERATION
// AUTOGENERATED FROM https://github.com/vuejs/eslint-plugin-vue/blob/8f094200664a2b10bc597016f5486066a174e098/tests/lib/rules/no-multi-spaces.js
/**
 * @fileoverview This rule warns about the usage of extra whitespaces between attributes
 * @author Armano
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const path = require('path')
const rule = require('../../fixtures/eslint-plugin-vue/lib/rules/no-multi-spaces')
const RuleTester = require('eslint').RuleTester

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {  ecmaVersion: 2015, sourceType: 'module' , templateTokenizer: { pug: path.resolve(__dirname, '../../../')}}
})

ruleTester.run('no-multi-spaces', rule, {
  valid: [
    '',
    `<template></template>`,
    `<template lang="pug">div</template>`,
    `<template lang="pug">.foo</template>`,
    `<template lang="pug">.foo(style="     foo   ")</template>`,
    `<template lang="pug">.foo(@click="bar")</template>`,
    // `<!-- CONVERT ERROR -->Whitespace was expected.<template><div class="foo"\n          :style="foo"></div></template>`,
    // `<!-- CONVERT ERROR -->Whitespace was expected.<template><div class="foo"\n\t\t\t:style="foo"></div></template>`,
    // `<!-- CONVERT ERROR -->Whitespace was expected.<template><div class="foo"\n      :style="foo"\n      ></div></template>`,
    // `<!-- CONVERT ERROR -->Whitespace was expected.<template><div class="foo"\n                       :style="foo" /></template>`,
    // `<!-- CONVERT ERROR -->Whitespace was expected.<template><div class="foo"\n                       :style="foo"\n                            /></template>`,
    `<template lang="pug">div {{ test }}</template>`,
    `<template lang="pug">div {{test}}</template>`,
    `<template lang="pug">
div {{test}}
  // fooo
</template>`,
    `<template lang="pug">
div {{test}}
  // fooo
</template>`,
    `<template lang="pug">div(v-for="i in b") {{ i }}</template>`,
    `<template lang="pug">div(v-for=" i in b ") {{ i }}</template>`,
    `<template lang="pug">div(:test="\`           \`") {{ a }}</template>`,
    `<template lang="pug">
div(:test="\`           \`") \n
  | {{ a }}
</template>`,
    {
      filename: 'test.js',
      code: 'export default { }'
    },
    {
      code: `
      <template lang="pug">
i(:class="{
    'fa-angle-up'   : isExpanded,
    'fa-angle-down' : !isExpanded,
  }")
</template>`,
      options: [
        {
          ignoreProperties: true
        }
      ]
    },
    {
      code: `
      <template lang="pug">
i(:class="{
    'fa-angle-up':   isExpanded,
    'fa-angle-down': !isExpanded,
  }")
</template>`,
      options: [
        {
          ignoreProperties: true
        }
      ]
    }
  ],
  invalid: [
    {
      code: `<template lang="pug">div</template>`,
      output: `<template lang="pug">div</template>`,
      errors: [
        {
          message: "Multiple spaces found before '/>'.",
          type: 'HTMLSelfClosingTagClose'
        }
      ]
    },
    {
      code: `<template lang="pug">.foo</template>`,
      output: `<template lang="pug">.foo</template>`,
      errors: [
        {
          message: "Multiple spaces found before 'class'.",
          type: 'HTMLIdentifier'
        },
        {
          message: "Multiple spaces found before '/>'.",
          type: 'HTMLSelfClosingTagClose'
        }
      ]
    },
    {
      code: `<template lang="pug">div\t\tclass="foo"\t\t</template>`,
      output: `<template lang="pug">.foo</template>`,
      errors: [
        {
          message: "Multiple spaces found before 'class'.",
          type: 'HTMLIdentifier'
        },
        {
          message: "Multiple spaces found before '/>'.",
          type: 'HTMLSelfClosingTagClose'
        }
      ]
    },
    {
      code: `<template lang="pug">div(:class="foo")</template>`,
      output: `<template lang="pug">div(:class="foo")</template>`,
      errors: [
        {
          message: "Multiple spaces found before ':'.",
          type: 'Punctuator'
        },
        {
          message: "Multiple spaces found before '/>'.",
          type: 'HTMLSelfClosingTagClose'
        }
      ]
    },
    {
      code: `<template lang="pug">.foo(:foo="")</template>`,
      output: `<template lang="pug">.foo(:foo="")</template>`,
      errors: [
        {
          message: "Multiple spaces found before '/>'.",
          type: 'HTMLSelfClosingTagClose'
        }
      ]
    },
    {
      code: `<template lang="pug">.foo(foo=)</template>`,
      output: `<template lang="pug">.foo(foo=)</template>`,
      errors: [
        {
          message: "Multiple spaces found before '/>'.",
          type: 'HTMLSelfClosingTagClose'
        }
      ]
    },
    {
      code: `<template lang="pug">foo.foo(v-foo="")</template>`,
      output: `<template lang="pug">foo.foo(v-foo="")</template>`,
      errors: [
        {
          message: "Multiple spaces found before '/>'.",
          type: 'HTMLSelfClosingTagClose'
        }
      ]
    },
    {
      code: `<template lang="pug">foo.foo(v-foo="", \n)</template>`,
      output: `<template lang="pug">foo.foo(v-foo="", \n)</template>`,
      errors: [
        {
          message: "Multiple spaces found before '/>'.",
          type: 'HTMLSelfClosingTagClose'
        }
      ]
    },
    {
      code: `<template lang="pug">div {{  test  }}</template>`,
      output: `<template lang="pug">div {{ test }}</template>`,
      errors: [
        {
          message: "Multiple spaces found before 'test'.",
          type: 'Identifier'
        },
        {
          message: "Multiple spaces found before '}}'.",
          type: 'VExpressionEnd'
        }
      ]
    },
    {
      code: `<template lang="pug">div</template>`,
      output: `<template lang="pug">div</template>`,
      errors: [
        {
          message: "Multiple spaces found before '>'.",
          type: 'HTMLTagClose'
        }
      ]
    },
    {
      code: `<template lang="pug">div(v-for="      i    in    b       ") {{ test }}</template>`,
      output: `<template lang="pug">div(v-for=" i in b ") {{ test }}</template>`,
      errors: [
        {
          message: "Multiple spaces found before 'i'.",
          type: 'Identifier'
        },
        {
          message: "Multiple spaces found before 'in'.",
          type: 'Keyword'
        },
        {
          message: "Multiple spaces found before 'b'.",
          type: 'Identifier'
        },
        {
          message: "Multiple spaces found before '\"'.",
          type: 'Punctuator'
        }
      ]
    },
    {
      code: `
      <template lang="pug">
i(:class="{
    'fa-angle-up'   : isExpanded,
    'fa-angle-down' : !isExpanded,
  }")
</template>`,
      output: `
      <template lang="pug">
i(:class="{
    'fa-angle-up' : isExpanded,
    'fa-angle-down' : !isExpanded,
  }")
</template>`,
      errors: [
        {
          message: "Multiple spaces found before ':'.",
          type: 'Punctuator'
        }
      ]
    },
    {
      code: `
      <template lang="pug">
i(:class="{
    'fa-angle-up':   isExpanded,
    'fa-angle-down': !isExpanded,
  }")
</template>`,
      output: `
      <template lang="pug">
i(:class="{
    'fa-angle-up': isExpanded,
    'fa-angle-down': !isExpanded,
  }")
</template>`,
      errors: [
        {
          message: "Multiple spaces found before 'isExpanded'.",
          type: 'Identifier'
        }
      ]
    }
  ]
})
