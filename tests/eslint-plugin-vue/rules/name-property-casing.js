// AUTOGENERATED FROM https://github.com/vuejs/eslint-plugin-vue/blob/8f094200664a2b10bc597016f5486066a174e098/tests/lib/rules/name-property-casing.js @2022-03-19T13:08:36.633Z
/**
 * @fileoverview Define a style for the name property casing for consistency purposes
 * @author Armano
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const path = require('path')
const rule = require('../../fixtures/eslint-plugin-vue/lib/rules/name-property-casing')
const RuleTester = require('eslint').RuleTester

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: 'module'
}

const ruleTester = new RuleTester()
ruleTester.run('name-property-casing', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: `
        export default {
        }
      `,
      parserOptions
    },
    {
      filename: 'test.vue',
      code: `
        export default {
          ...name
        }
      `,
      parserOptions
    },
    {
      filename: 'test.vue',
      code: `
        export default {
          name: 'FooBar'
        }
      `,
      parserOptions
    },
    {
      filename: 'test.vue',
      code: `
        export default {
          name: 'FooBar'
        }
      `,
      options: ['PascalCase'],
      parserOptions
    },
    {
      filename: 'test.vue',
      code: `
        export default {
          name: 'foo-bar'
        }
      `,
      options: ['kebab-case'],
      parserOptions
    }
  ],

  invalid: [
    {
      filename: 'test.vue',
      code: `
        export default {
          name: 'foo-bar'
        }
      `,
      output: `
        export default {
          name: 'FooBar'
        }
      `,
      parserOptions,
      errors: [
        {
          message: 'Property name "foo-bar" is not PascalCase.',
          type: 'Literal',
          line: 3
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `
        export default {
          name: 'foo  bar'
        }
      `,
      output: null,
      parserOptions,
      errors: [
        {
          message: 'Property name "foo  bar" is not PascalCase.',
          type: 'Literal',
          line: 3
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `
        export default {
          name: 'foo!bar'
        }
      `,
      output: null,
      parserOptions,
      errors: [
        {
          message: 'Property name "foo!bar" is not PascalCase.',
          type: 'Literal',
          line: 3
        }
      ]
    },
    {
      filename: 'test.js',
      code: `
        new Vue({
          name: 'foo!bar'
        })
      `,
      output: null,
      parserOptions: {  ecmaVersion: 6 , templateTokenizer: { pug: path.resolve(__dirname, '../../../')}},
      errors: [
        {
          message: 'Property name "foo!bar" is not PascalCase.',
          type: 'Literal',
          line: 3
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `
        export default {
          name: 'foo_bar'
        }
      `,
      output: `
        export default {
          name: 'FooBar'
        }
      `,
      parserOptions,
      errors: [
        {
          message: 'Property name "foo_bar" is not PascalCase.',
          type: 'Literal',
          line: 3
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `
        export default {
          name: 'foo_bar'
        }
      `,
      output: `
        export default {
          name: 'FooBar'
        }
      `,
      options: ['PascalCase'],
      parserOptions,
      errors: [
        {
          message: 'Property name "foo_bar" is not PascalCase.',
          type: 'Literal',
          line: 3
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `
        export default {
          name: 'foo_bar'
        }
      `,
      output: `
        export default {
          name: 'foo-bar'
        }
      `,
      options: ['kebab-case'],
      parserOptions,
      errors: [
        {
          message: 'Property name "foo_bar" is not kebab-case.',
          type: 'Literal',
          line: 3
        }
      ]
    }
  ]
})
