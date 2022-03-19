// AUTOGENERATED FROM https://github.com/vuejs/eslint-plugin-vue/blob/8f094200664a2b10bc597016f5486066a174e098/tests/lib/rules/no-undef-components.js @2022-03-19T14:17:43.701Z
/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */
'use strict'

const RuleTester = require('eslint').RuleTester
const path = require('path')
const rule = require('../../fixtures/eslint-plugin-vue/lib/rules/no-undef-components')

const tester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: { 
    ecmaVersion: 2020,
    sourceType: 'module'
  , templateTokenizer: { pug: path.resolve(__dirname, '../../../')}}
})

tester.run('no-undef-components', rule, {
  valid: [
    // <script setup>
    {
      filename: 'test.vue',
      code: `
      <script setup>
        import Foo from './Foo.vue'
      </script>

<!-- CONVERT ERROR -->Element is missing end tag.      <template>
        <Foo />
        <Teleport />
        <template v-if="foo"></template>
      </template>
      `
    },
    {
      filename: 'test.vue',
      code: `
      <script setup>
        import FooPascalCase from './component.vue'
        import BarPascalCase from './component.vue'
        import BazPascalCase from './component.vue'
      </script>

      <template lang="pug">
FooPascalCase
bar-pascal-case
bazPascalCase
</template>
      `
    },
    {
      filename: 'test.vue',
      code: `
      <script setup>
      import fooCamelCase from './component.vue'
      import barCamelCase from './component.vue'
      </script>

      <template lang="pug">
fooCamelCase
bar-camel-case
</template>
      `
    },
    // namespace
    {
      filename: 'test.vue',
      code: `
      <script setup>
      import * as Form from './form-components'
      </script>

      <template lang="pug">
Form.Input
  Form.Label label
</template>
      `
    },
    {
      filename: 'test.vue',
      code: `
      <script setup>
      import Bar from './Bar.vue'
      </script>

      <template lang="pug">Foo</template>
      `,
      options: [{ ignorePatterns: ['Foo'] }]
    },
    {
      filename: 'test.vue',
      code: `
      <script setup>
      import Bar from './Bar.vue'
      </script>

      <template lang="pug">CustomComponent</template>
      `,
      options: [
        {
          ignorePatterns: ['custom(\\-\\w+)+']
        }
      ]
    },

    // options API
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">div Lorem ipsum</template>`
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">CustomComponent</template>`,
      options: [
        {
          ignorePatterns: ['custom(\\-\\w+)+']
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">CustomComponent Some text</template>`,
      options: [
        {
          ignorePatterns: ['custom(\\-\\w+)+']
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">custom-component Some text</template>`,
      options: [
        {
          ignorePatterns: ['custom(\\-\\w+)+']
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">custom-component Some text</template>`,
      options: [
        {
          ignorePatterns: ['Custom(\\w+)+']
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">custom_component Some text</template>`,
      options: [
        {
          ignorePatterns: ['Custom(\\w+)+']
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">customComponent Some text</template>`,
      options: [
        {
          ignorePatterns: ['Custom(\\w+)+']
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">
customComponent
  warm-code Text
  InfoBtnPrimary(value="text")
</template>`,
      options: [
        {
          ignorePatterns: ['Custom(\\w+)+', 'Warm(\\w+)+', 'InfoBtn(\\w+)+']
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">CustomComponent</template>
        <script>
        export default {
          components: {
            CustomComponent
          }
        }
        </script>`
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">CustomComponent Some text</template>
        <script>
        export default {
          components: {
            CustomComponent
          }
        }
        </script>`
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">component(:is="'CustomComponent'")</template>
        <script>
        export default {
          components: {
            CustomComponent
          }
        }
        </script>`
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">component(:is="'CustomComponent'") Some text</template>
        <script>
        export default {
          components: {
            CustomComponent
          }
        }
        </script>`
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">component(v-if="showComponent", :is="'CustomComponent'")</template>
        <script>
        export default {
          data: () => ({
            showComponent: true
          }),
          components: {
            CustomComponent
          }
        }
        </script>`
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">component(v-if="showComponent", :is="'CustomComponent'")</template>
        <script>
        export default {
          data: () => ({
            showComponent: false
          }),
          components: {
            CustomComponent
          }
        }
        </script>`
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">component(:is="'div'")</template>`
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">component(is="div")</template>`
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">component(is="span") Text</template>`
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">Component(is="div")</template>`
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">Component(is="span") Text</template>`
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">component(:is="name")</template>
        <script>
        export default {
          data: () => ({ name: 'div' })
        }
        </script>`
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">component(:is="name")</template>
        <script>
        export default {
          data: () => ({ name: 'warm-button' }),
          components: { WarmButton }
        }
        </script>`
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">
teleport
suspense
suspense
  div Text
Teleport
Suspense
Suspense
  div Text
</template>`
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">
transition
transition-group
keep-alive
transition
  div Text
TransitionGroup
KeepAlive
Transition
  div Text
Slot
slot
slot foo
</template>`
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">Custom-Component</template>
        <script>
        export default {
          components: {
            'custom-component': InfoPrimaryWrapper
          }
        }
        </script>`
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">component(is)</template>`
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">Component(is)</template>`
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">div(v-is="'CustomComponent'")</template>
        <script>
        export default {
          components: {
            CustomComponent
          }
        }
        </script>`
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">CustomComponent</template>
        <script>
        export default {
          name: 'CustomComponent'
        }
        </script>`
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">custom-component</template>
        <script>
        export default {
          name: 'CustomComponent'
        }
        </script>`
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">custom-component</template>
        <script>
        export default {
          name: \`CustomComponent\`
        }
        </script>`
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">component(:is="'CustomComponent'")</template>
        <script>
        export default {
          name: 'CustomComponent'
        }
        </script>`
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">component(is="CustomComponent")</template>
        <script>
        export default {
          name: 'CustomComponent'
        }
        </script>`
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">component(is="vue:CustomComponent")</template>
        <script>
        export default {
          name: 'CustomComponent'
        }
        </script>`
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">div(v-is="'CustomComponent'")</template>
        <script>
        export default {
          name: 'CustomComponent'
        }
        </script>`
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">
CustomComponentWithNamedSlots
  template(#slotA)
    div Text
</template>
        <script>
        export default {
          components: {
            CustomComponentWithNamedSlots
          }
        }
        </script>`
    },
    {
      filename: 'test.vue',
      code: `
      <template lang="pug">TheModal</template>

      <script setup>
      import TheModal from 'foo'
      </script>`
    }
  ],
  invalid: [
    // <script setup>
    {
      filename: 'test.vue',
      code: `
      <script setup>
      import Bar from './Bar.vue'
      </script>

      <template lang="pug">Foo</template>
      `,
      errors: [
        {
          message: "The '<Foo>' component has been used, but not defined.",
          line: 7,
          column: 9
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `
      <script setup>
      import PascalCase from './component.vue'
      </script>

      <template lang="pug">pascal_case</template>
      `,
      errors: [
        {
          message:
            "The '<pascal_case>' component has been used, but not defined.",
          line: 7,
          column: 9
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `
      <script setup>
      import * as Form from './form-components'
      </script>

      <template lang="pug">Foo.Input</template>
      `,
      errors: [
        {
          message:
            "The '<Foo.Input>' component has been used, but not defined.",
          line: 7,
          column: 9
        }
      ]
    },

    // options API
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">CustomComponent</template>`,
      errors: [
        {
          message:
            "The '<CustomComponent>' component has been used, but not defined.",
          line: 3
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">WarmButton</template>`,
      options: [
        {
          ignorePatterns: ['custom(\\-\\w+)+']
        }
      ],
      errors: [
        {
          message:
            "The '<WarmButton>' component has been used, but not defined.",
          line: 3
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">CustomComponent Some text</template>`,
      errors: [
        {
          message:
            "The '<CustomComponent>' component has been used, but not defined.",
          line: 3
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">WarmButton Some text</template>`,
      options: [
        {
          ignorePatterns: ['custom(\\-\\w+)+']
        }
      ],
      errors: [
        {
          message:
            "The '<WarmButton>' component has been used, but not defined.",
          line: 3
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">CustomComponent</template>
        <script>
        export default {
          components: {
            WarmButton
          }
        }
        </script>`,
      errors: [
        {
          message:
            "The '<CustomComponent>' component has been used, but not defined.",
          line: 3
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">CustomComponent Some text</template>
        <script>
        export default {
          components: {
            WarmButton
          }
        }
        </script>`,
      errors: [
        {
          message:
            "The '<CustomComponent>' component has been used, but not defined.",
          line: 3
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">component(:is="'CustomComponent'")</template>
        <script>
        export default {
          components: {
            WarmButton
          }
        }
        </script>`,
      errors: [
        {
          message:
            "The '<CustomComponent>' component has been used, but not defined.",
          line: 3
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">component(:is="'CustomComponent'") Some text</template>
        <script>
        export default {
          components: {
            WarmButton
          }
        }
        </script>`,
      errors: [
        {
          message:
            "The '<CustomComponent>' component has been used, but not defined.",
          line: 3
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">CustomComponent</template>
        <script>
        export default {
          components: {
            'custom-component': InfoPrimaryWrapper
          }
        }
        </script>`,
      errors: [
        {
          message:
            "The '<CustomComponent>' component has been used, but not defined.",
          line: 3
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">CustomComponent</template>
        <script>
        export default {
          name: CustomComponent
        }
        </script>`,
      errors: [
        {
          message:
            "The '<CustomComponent>' component has been used, but not defined.",
          line: 3
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">
CustomComponentWithNamedSlots
  template(#slotA)
    div Text
</template>`,
      errors: [
        {
          message:
            "The '<CustomComponentWithNamedSlots>' component has been used, but not defined.",
          line: 3
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">div(is="vue:foo")</template>
        <script>
        export default {
          components: {
            bar
          }
        }
        </script>`,
      errors: [
        {
          message: "The '<foo>' component has been used, but not defined.",
          line: 3
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">div(v-is="'foo'")</template>
        <script>
        export default {
          components: {
            bar
          }
        }
        </script>`,
      errors: [
        {
          message: "The '<foo>' component has been used, but not defined.",
          line: 3
        }
      ]
    }
  ]
})
