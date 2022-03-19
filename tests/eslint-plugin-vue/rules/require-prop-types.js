// AUTOGENERATED FROM https://github.com/vuejs/eslint-plugin-vue/blob/8f094200664a2b10bc597016f5486066a174e098/tests/lib/rules/require-prop-types.js @2022-03-19T14:17:43.772Z
/**
 * @fileoverview Prop definitions should be detailed
 * @author Armano
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const path = require('path')
const rule = require('../../fixtures/eslint-plugin-vue/lib/rules/require-prop-types')

const RuleTester = require('eslint').RuleTester

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester()
ruleTester.run('require-prop-types', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: `
        export default {
          ...foo,
          props: {
            ...test(),
            foo: String
          }
        }
      `,
      parserOptions: {  ecmaVersion: 2018, sourceType: 'module' , templateTokenizer: { pug: path.resolve(__dirname, '../../../')}}
    },
    {
      filename: 'test.vue',
      code: `
        export default {
          props: {
            foo: [String, Number]
          }
        }
      `,
      parserOptions: {  ecmaVersion: 6, sourceType: 'module' , templateTokenizer: { pug: path.resolve(__dirname, '../../../')}}
    },
    {
      filename: 'test.vue',
      code: `
        export default {
          props: {
            foo: {
              type: String
            }
          }
        }
      `,
      parserOptions: {  ecmaVersion: 6, sourceType: 'module' , templateTokenizer: { pug: path.resolve(__dirname, '../../../')}}
    },
    {
      filename: 'test.vue',
      code: `
        export default {
          props: {
            foo: {
              ['type']: String
            }
          }
        }
      `,
      parserOptions: {  ecmaVersion: 6, sourceType: 'module' , templateTokenizer: { pug: path.resolve(__dirname, '../../../')}}
    },
    {
      filename: 'test.vue',
      code: `
        export default {
          props: {
            foo: {
              validator: v => v
            }
          }
        }
      `,
      parserOptions: {  ecmaVersion: 6, sourceType: 'module' , templateTokenizer: { pug: path.resolve(__dirname, '../../../')}}
    },
    {
      filename: 'test.vue',
      code: `
        export default {
          props: {
            foo: {
              ['validator']: v => v
            }
          }
        }
      `,
      parserOptions: {  ecmaVersion: 6, sourceType: 'module' , templateTokenizer: { pug: path.resolve(__dirname, '../../../')}}
    },
    {
      filename: 'test.vue',
      code: `
        export default {
          props
        }
      `,
      parserOptions: {  ecmaVersion: 6, sourceType: 'module' , templateTokenizer: { pug: path.resolve(__dirname, '../../../')}}
    },
    {
      filename: 'test.vue',
      code: `
        export default {
          props: externalProps
        }
      `,
      parserOptions: {  ecmaVersion: 6, sourceType: 'module' , templateTokenizer: { pug: path.resolve(__dirname, '../../../')}}
    },
    {
      filename: 'test.vue',
      code: `
        export default {
          props: []
        }
      `,
      parserOptions: {  ecmaVersion: 6, sourceType: 'module' , templateTokenizer: { pug: path.resolve(__dirname, '../../../')}}
    },
    {
      filename: 'test.vue',
      code: `
        export default {
          props: {}
        }
      `,
      parserOptions: {  ecmaVersion: 6, sourceType: 'module' , templateTokenizer: { pug: path.resolve(__dirname, '../../../')}}
    },
    {
      filename: 'test.vue',
      code: `
        export default (Vue as VueConstructor<Vue>).extend({
          props: {
            foo: {
              type: String
            } as PropOptions<string>
          }
        });
      `,
      parserOptions: {  ecmaVersion: 6, sourceType: 'module' , templateTokenizer: { pug: path.resolve(__dirname, '../../../')}},
      parser: require.resolve('@typescript-eslint/parser')
    },
    {
      filename: 'test.vue',
      code: `
        export default Vue.extend({
          props: {
            foo: {
              type: String
            } as PropOptions<string>
          }
        });
      `,
      parserOptions: {  ecmaVersion: 6, sourceType: 'module' , templateTokenizer: { pug: path.resolve(__dirname, '../../../')}},
      parser: require.resolve('@typescript-eslint/parser')
    },
    {
      filename: 'test.vue',
      code: `
      <script setup>
      defineProps({
        foo: String
      })
      </script>
      `,
      parserOptions: {  ecmaVersion: 6, sourceType: 'module' , templateTokenizer: { pug: path.resolve(__dirname, '../../../')}},
      parser: require.resolve('vue-eslint-parser')
    },
    {
      filename: 'test.vue',
      code: `
      <script setup lang="ts">
      defineProps<{foo:string}>()
      </script>
      `,
      parserOptions: { 
        ecmaVersion: 6,
        sourceType: 'module',
        parser: require.resolve('@typescript-eslint/parser')
      , templateTokenizer: { pug: path.resolve(__dirname, '../../../')}},
      parser: require.resolve('vue-eslint-parser')
    }
  ],

  invalid: [
    {
      filename: 'test.vue',
      code: `
        export default {
          props: ['foo', bar, \`baz\`, foo()]
        }
      `,
      parserOptions: {  ecmaVersion: 6, sourceType: 'module' , templateTokenizer: { pug: path.resolve(__dirname, '../../../')}},
      errors: [
        {
          message: 'Prop "foo" should define at least its type.',
          line: 3
        },
        {
          message: 'Prop "bar" should define at least its type.',
          line: 3
        },
        {
          message: 'Prop "baz" should define at least its type.',
          line: 3
        },
        {
          message: 'Prop "Unknown prop" should define at least its type.',
          line: 3
        }
      ]
    },
    {
      filename: 'test.js',
      code: `
        new Vue({
          props: ['foo', bar, \`baz\`, foo()]
        })
      `,
      parserOptions: {  ecmaVersion: 6, sourceType: 'module' , templateTokenizer: { pug: path.resolve(__dirname, '../../../')}},
      errors: [
        {
          message: 'Prop "foo" should define at least its type.',
          line: 3
        },
        {
          message: 'Prop "bar" should define at least its type.',
          line: 3
        },
        {
          message: 'Prop "baz" should define at least its type.',
          line: 3
        },
        {
          message: 'Prop "Unknown prop" should define at least its type.',
          line: 3
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `
        export default {
          props: {
            foo: {
            }
          }
        }
      `,
      parserOptions: {  ecmaVersion: 6, sourceType: 'module' , templateTokenizer: { pug: path.resolve(__dirname, '../../../')}},
      errors: [
        {
          message: 'Prop "foo" should define at least its type.',
          line: 4
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `
        export default {
          props: {
            foo: {
              type: []
            }
          }
        }
      `,
      parserOptions: {  ecmaVersion: 6, sourceType: 'module' , templateTokenizer: { pug: path.resolve(__dirname, '../../../')}},
      errors: [
        {
          message: 'Prop "foo" should define at least its type.',
          line: 4
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `
        export default {
          props: {
            foo() {}
          }
        }
      `,
      parserOptions: {  ecmaVersion: 6, sourceType: 'module' , templateTokenizer: { pug: path.resolve(__dirname, '../../../')}},
      errors: [
        {
          message: 'Prop "foo" should define at least its type.',
          line: 4
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `
        export default Vue.extend({
          props: {
            foo: {} as PropOptions<string>
          }
        });
      `,
      parserOptions: {  ecmaVersion: 6, sourceType: 'module' , templateTokenizer: { pug: path.resolve(__dirname, '../../../')}},
      parser: require.resolve('@typescript-eslint/parser'),
      errors: [
        {
          message: 'Prop "foo" should define at least its type.',
          line: 4
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `
        export default (Vue as VueConstructor<Vue>).extend({
          props: {
            foo: {} as PropOptions<string>
          }
        });
      `,
      parserOptions: {  ecmaVersion: 6, sourceType: 'module' , templateTokenizer: { pug: path.resolve(__dirname, '../../../')}},
      parser: require.resolve('@typescript-eslint/parser'),
      errors: [
        {
          message: 'Prop "foo" should define at least its type.',
          line: 4
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `
      <script setup>
      defineProps({
        foo: {}
      })
      </script>
      `,
      parserOptions: {  ecmaVersion: 6, sourceType: 'module' , templateTokenizer: { pug: path.resolve(__dirname, '../../../')}},
      parser: require.resolve('vue-eslint-parser'),
      errors: [
        {
          message: 'Prop "foo" should define at least its type.',
          line: 4
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `
      <script setup>
      defineProps(['foo'])
      </script>
      `,
      parserOptions: {  ecmaVersion: 6, sourceType: 'module' , templateTokenizer: { pug: path.resolve(__dirname, '../../../')}},
      parser: require.resolve('vue-eslint-parser'),
      errors: [
        {
          message: 'Prop "foo" should define at least its type.',
          line: 3
        }
      ]
    }
  ]
})
