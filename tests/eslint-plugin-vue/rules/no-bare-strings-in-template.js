// AUTOGENERATED FROM https://github.com/vuejs/eslint-plugin-vue/blob/8f094200664a2b10bc597016f5486066a174e098/tests/lib/rules/no-bare-strings-in-template.js
/**
 * @author Yosuke Ota
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester
const path = require('path')
const rule = require('../../fixtures/eslint-plugin-vue/lib/rules/no-bare-strings-in-template')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const tester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {  ecmaVersion: 2020, sourceType: 'module' , templateTokenizer: { pug: path.resolve(__dirname, '../../../')}}
})

tester.run('no-bare-strings-in-template', rule, {
  valid: [
    `
    <template lang="pug">
h1 {{ \$t(&apos;foo.bar&apos;) }}
h1 {{ foo }}
h1(v-t="'foo.bar'")
</template>`,
    `
    <template lang="pug">
h1(v-text="'Lorem ipsum' + foo")
h1(v-text="foo")
h1(v-text="1")
h1(v-text="true")
h1(v-text)
h1(v-text="")
</template>`,
    `
    <template lang="pug">
h1 #
div(title="#")
</template>`,
    `
    <template lang="pug">
div (
div )
div ,
div .
div &amp;
div +
div -
div =
div *
div /
div #
div %
div !
div ?
div :
div [
div ]
div {
div }
div(title="<")
div(title=">")
div •
div —
div
div |
div (
div )
div ,
div .
div &amp;
div &amp;
div +
div −
div =
div *
div *
div /
div #
div %
div !
div ?
div :
div [
div [
div ]
div ]
div {
div {
div }
div }
div &lt;
div &lt;
div &gt;
div &gt;
div •
div •
div —
div –
div 
div
div
div |
div |
div |
div ( ) , . &amp; + - = * / # % ! ? : [ ] { } • — | ( ) , . &amp; &amp; + − = * * / # % ! ? : [ [ ] ] { { } } &lt; &lt; &gt; &gt; • • — –   | | |
div(title="( ) , . & + - = * / # % ! ? : [ ] { } < > • —   | ( ) , . & & + − = * * / # % ! ? : [ [ ] ] { { } } < < > > • • — –   	 \
 | | |")
</template>`
  ],
  invalid: [
    {
      code: `
      <template lang="pug">
h1 Lorem ipsum
div(title="Lorem ipsum", aria-label="Lorem ipsum", aria-placeholder="Lorem ipsum", aria-roledescription="Lorem ipsum", aria-valuetext="Lorem ipsum")
img(alt="Lorem ipsum")
input(placeholder="Lorem ipsum")
h1(v-text="'Lorem ipsum'")
</template>`,
      errors: [
        {
          message: 'Unexpected non-translated string used.',
          line: 3,
          column: 13,
          endLine: 3,
          endColumn: 24
        },
        {
          message: 'Unexpected non-translated string used in `title`.',
          line: 5,
          column: 17,
          endLine: 5,
          endColumn: 30
        },
        {
          message: 'Unexpected non-translated string used in `aria-label`.',
          line: 6,
          column: 22,
          endLine: 6,
          endColumn: 35
        },
        {
          message:
            'Unexpected non-translated string used in `aria-placeholder`.',
          line: 7,
          column: 28,
          endLine: 7,
          endColumn: 41
        },
        {
          message:
            'Unexpected non-translated string used in `aria-roledescription`.',
          line: 8,
          column: 32,
          endLine: 8,
          endColumn: 45
        },
        {
          message: 'Unexpected non-translated string used in `aria-valuetext`.',
          line: 9,
          column: 26,
          endLine: 9,
          endColumn: 39
        },
        {
          message: 'Unexpected non-translated string used in `alt`.',
          line: 11,
          column: 18,
          endLine: 11,
          endColumn: 31
        },
        {
          message: 'Unexpected non-translated string used in `placeholder`.',
          line: 12,
          column: 28,
          endLine: 12,
          endColumn: 41
        },
        {
          message: 'Unexpected non-translated string used in `v-text`.',
          line: 13,
          column: 20,
          endLine: 13,
          endColumn: 35
        }
      ]
    },
    {
      code: `
      <template lang="pug">
h1 Lorem
h1 Lorem ipsum
h1 ipsum
</template>`,
      options: [{ allowlist: ['Lorem'] }],
      errors: [
        {
          line: 4,
          column: 13,
          messageId: 'unexpected',
          endLine: 4,
          endColumn: 24
        },
        {
          line: 5,
          column: 13,
          messageId: 'unexpected',
          endLine: 5,
          endColumn: 18
        }
      ]
    },
    {
      code: `
      <template lang="pug">
h1(foo="Lorem ipsum")
h1(bar="Lorem ipsum")
h2(foo="Lorem ipsum")
h2(bar="Lorem ipsum")
div(foo="Lorem ipsum")
div(bar="Lorem ipsum")
</template>`,
      options: [{ attributes: { '/^h\\d$/': ['foo'], h1: ['bar'] } }],
      errors: [
        {
          message: 'Unexpected non-translated string used in `foo`.',
          line: 3,
          column: 17,
          endLine: 3,
          endColumn: 30
        },
        {
          message: 'Unexpected non-translated string used in `bar`.',
          line: 4,
          column: 17,
          endLine: 4,
          endColumn: 30
        },
        {
          message: 'Unexpected non-translated string used in `foo`.',
          line: 5,
          column: 17,
          endLine: 5,
          endColumn: 30
        }
      ]
    },
    {
      code: `
      <template lang="pug">
h1(v-foo="'Lorem ipsum'")
h1(v-bar="'Lorem ipsum'")
</template>`,
      options: [{ directives: ['v-foo'] }],
      errors: [
        {
          message: 'Unexpected non-translated string used in `v-foo`.',
          line: 3,
          column: 19,
          endLine: 3,
          endColumn: 34
        }
      ]
    }
  ]
})
