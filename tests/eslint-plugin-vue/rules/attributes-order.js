// SKIP AUTOGENERATION
// AUTOGENERATED FROM https://github.com/vuejs/eslint-plugin-vue/blob/8f094200664a2b10bc597016f5486066a174e098/tests/lib/rules/attributes-order.js
/**
 * @fileoverview enforce ordering of attributes
 * @author Erin Depew
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const path = require('path')
const rule = require('../../fixtures/eslint-plugin-vue/lib/rules/attributes-order')
const RuleTester = require('eslint').RuleTester

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const tester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {  ecmaVersion: 2015 , templateTokenizer: { pug: path.resolve(__dirname, '../../../')}}
})
tester.run('attributes-order', rule, {
  valid: [
    {
      // https://github.com/vuejs/eslint-plugin-vue/issues/1433
      filename: 'test.vue',
      code: `
      <template lang="pug">div(ref="ref", v-model="model", v-bind="object", @click="handleClick")</template>`
    },
    {
      filename: 'test.vue',
      code: `
      <template lang="pug">div(v-bind="object", ref="ref", v-model="model", @click="handleClick")</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(is="header")</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(v-for="item in items")</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(v-if="!visible")</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(v-else-if="!visible")</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(v-else="!visible")</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(v-show="!visible")</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(v-cloak)</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(v-once)</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">#header</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(key="id")</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(v-html="htmlContent")</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(v-text="textContent")</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(v-model="toggle")</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(v-custom-directive)</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(v-model="toggle", :bindingProp="foo", propOne="bar", model="baz")</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(click="functionCall")</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(myProp="prop")</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">#uniqueID(is="header", v-for="item in items", v-if="!visible", v-once, ref="header", v-model="headerData", myProp="prop", @click="functionCall", v-text="textContent")</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">#uniqueID(is="header", v-for="item in items", v-if="!visible", v-once, ref="header", v-model="headerData", :myProp="prop", v-on="functionCall", v-text="textContent")</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">#uniqueID(is="header", v-for="item in items", v-if="!visible", v-once, ref="header", :prop="headerData", myProp="prop", v-on:click="functionCall", v-text="textContent")</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(v-for="item in items", v-if="!visible", propone="prop", :proptwo="prop", propthree="prop", @click="functionCall", v-text="textContent")</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(propone="prop", proptwo="prop", propthree="prop")</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(propone="prop", proptwo="prop", is="header")</template>`,
      options: [
        {
          order: [
            'LIST_RENDERING',
            'CONDITIONALS',
            'RENDER_MODIFIERS',
            'GLOBAL',
            'UNIQUE',
            'TWO_WAY_BINDING',
            'OTHER_DIRECTIVES',
            'OTHER_ATTR',
            'EVENTS',
            'CONTENT',
            'DEFINITION'
          ]
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(ref="header", is="header", propone="prop", proptwo="prop")</template>`,
      options: [
        {
          order: [
            'LIST_RENDERING',
            'CONDITIONALS',
            'RENDER_MODIFIERS',
            'GLOBAL',
            'UNIQUE',
            'TWO_WAY_BINDING',
            'DEFINITION',
            'OTHER_DIRECTIVES',
            'OTHER_ATTR',
            'EVENTS',
            'CONTENT'
          ]
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">#uniqueID(v-if="!visible", v-for="item in items", v-once, is="header", v-on:click="functionCall", ref="header", v-text="textContent", :prop="headerData", myProp="prop")</template>`,
      options: [
        {
          order: [
            'CONDITIONALS',
            'LIST_RENDERING',
            'RENDER_MODIFIERS',
            'DEFINITION',
            'EVENTS',
            'UNIQUE',
            'TWO_WAY_BINDING',
            'CONTENT',
            'GLOBAL',
            'OTHER_ATTR',
            'OTHER_DIRECTIVES'
          ]
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">.content(v-if="!visible", v-model="foo", v-text="textContent")</template>`,
      options: [
        {
          order: [
            'CONDITIONALS',
            'LIST_RENDERING',
            'RENDER_MODIFIERS',
            'DEFINITION',
            'EVENTS',
            'UNIQUE',
            ['TWO_WAY_BINDING', 'OTHER_ATTR'],
            'CONTENT',
            'GLOBAL'
          ]
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">#uniqueID(ref="header", :prop="headerData", :[a+b]="headerData", :[prop]="headerData", myProp="prop", v-on:click="functionCall", v-on:[c]="functionCall", v-text="textContent")</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(a-custom-prop="value", :another-custom-prop="value", :blue-color="false", boolean-prop, z-prop="Z", v-on:[c]="functionCall", @change="functionCall", v-on:click="functionCall", @input="functionCall", v-text="textContent")</template>`,
      options: [{ alphabetical: true }]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">.foo(:class="bar")</template>`,
      options: [{ alphabetical: true }]
    },
    {
      filename: 'duplicate.vue',
      code: `<template lang="pug">div(class="foo", class="bar")</template>`,
      options: [{ alphabetical: true }]
    },
    {
      filename: 'duplicate.vue',
      code: `<template lang="pug">div(:class="foo", :class="bar")</template>`,
      options: [{ alphabetical: true }]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(v-if="foo", v-show="bar")</template>`,
      options: [{ alphabetical: true }]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(v-bar="bar", v-foo="foo")</template>`,
      options: [{ alphabetical: true }]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(v-foo.a="a", v-foo.b="b")</template>`,
      options: [{ alphabetical: true }]
    },

    // v-bind="..."
    {
      filename: 'test.vue',
      code: `
      <template lang="pug">div(v-bind:id="a", v-bind="b")</template>`,
      options: [{ alphabetical: true }]
    },
    {
      filename: 'test.vue',
      code: `
      <template lang="pug">div(v-bind="b", v-bind:id="a")</template>`,
      options: [{ alphabetical: true }]
    },
    {
      filename: 'test.vue',
      code: `
      <template lang="pug">div(v-if="x", v-bind:id="a", v-bind="b")</template>`,
      options: [{ alphabetical: true }]
    },
    {
      filename: 'test.vue',
      code: `
      <template lang="pug">div(v-if="x", v-bind="b", v-bind:id="a")</template>`,
      options: [{ alphabetical: true }]
    },
    {
      filename: 'test.vue',
      code: `
      <template lang="pug">div(v-if="x", v-bind="b", v-model="c", v-bind:value="a")</template>`
    },
    {
      filename: 'test.vue',
      code: `
      <template lang="pug">div(v-if="x", v-model="c", v-bind="b", v-bind:value="a")</template>`
    },
    {
      filename: 'test.vue',
      code: `
      <template lang="pug">div(v-if="x", v-bind="b", v-bind:id="a", v-model="c")</template>`
    },

    // omit order
    {
      filename: 'test.vue',
      code: `
      <template lang="pug">div(v-for="a in items", v-if="a", attr="a")</template>`,
      options: [{ order: ['LIST_RENDERING', 'CONDITIONALS'] }]
    }
  ],

  invalid: [
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(v-cloak, is="header")</template>`,
      output: `<template lang="pug">div(is="header", v-cloak)</template>`,
      errors: [
        {
          message: 'Attribute "is" should go before "v-cloak".',
          type: 'VAttribute'
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">#uniqueID(v-cloak)</template>`,
      output: `<template lang="pug">#uniqueID(v-cloak)</template>`,
      errors: [
        {
          message: 'Attribute "v-cloak" should go before "id".',
          type: 'VAttribute'
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(model="baz", v-model="toggle", propOne="bar", :id="foo")</template>`,
      output: `<template lang="pug">div(v-model="toggle", model="baz", :id="foo", propOne="bar")</template>`,
      errors: [
        {
          message: 'Attribute "v-model" should go before "model".',
          type: 'VAttribute'
        },
        {
          message: 'Attribute ":id" should go before "propOne".',
          type: 'VAttribute'
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(:bindingProp="foo", model="baz", v-on="functionCall", v-model="toggle", propOne="bar")</template>`,
      output: `<template lang="pug">div(:bindingProp="foo", model="baz", v-model="toggle", v-on="functionCall", propOne="bar")</template>`,
      errors: [
        {
          message: 'Attribute "v-model" should go before "v-on".',
          type: 'VAttribute'
        },
        {
          message: 'Attribute "propOne" should go before "v-on".',
          type: 'VAttribute'
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(data-id="foo", aria-test="bar", is="custom", myProp="prop")</template>`,
      output:
        `<template lang="pug">div(data-id="foo", is="custom", aria-test="bar", myProp="prop")</template>`,
      errors: [
        {
          message: 'Attribute "is" should go before "aria-test".',
          type: 'VAttribute'
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(ref="header", propone="prop", is="header")</template>`,
      options: [
        {
          order: [
            'LIST_RENDERING',
            'CONDITIONALS',
            'RENDER_MODIFIERS',
            'GLOBAL',
            'UNIQUE',
            'TWO_WAY_BINDING',
            'DEFINITION',
            'OTHER_DIRECTIVES',
            'OTHER_ATTR',
            'EVENTS',
            'CONTENT'
          ]
        }
      ],
      output:
        `<template lang="pug">div(ref="header", is="header", propone="prop")</template>`,
      errors: [
        {
          message: 'Attribute "is" should go before "propone".',
          type: 'VAttribute'
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(v-cloak, is="header")</template>`,
      output: `<template lang="pug">div(is="header", v-cloak)</template>`,
      errors: [
        {
          message: 'Attribute "is" should go before "v-cloak".',
          type: 'VAttribute'
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">#uniqueID(v-if="!visible", v-for="item in items", v-once, is="header", v-on:click="functionCall", ref="header", :prop="headerData", v-text="textContent", myProp="prop")</template>`,
      output: `<template lang="pug">#uniqueID(v-for="item in items", v-if="!visible", is="header", v-once, ref="header", v-on:click="functionCall", :prop="headerData", v-text="textContent", myProp="prop")</template>`,
      errors: [
        {
          message: 'Attribute "v-for" should go before "v-if".',
          type: 'VAttribute'
        },
        {
          message: 'Attribute "is" should go before "v-once".',
          type: 'VAttribute'
        },
        {
          message: 'Attribute "ref" should go before "v-on:click".',
          type: 'VAttribute'
        },
        {
          message: 'Attribute ":prop" should go before "v-on:click".',
          type: 'VAttribute'
        },
        {
          message: 'Attribute "id" should go before "v-text".',
          type: 'VAttribute'
        },
        {
          message: 'Attribute "myProp" should go before "v-text".',
          type: 'VAttribute'
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">#uniqueID(v-if="!visible", v-for="item in items", v-once, is="header", v-on:click="functionCall", ref="header", :prop="headerData", v-text="textContent", myProp="prop")</template>`,
      options: [
        {
          order: [
            'EVENTS',
            'TWO_WAY_BINDING',
            'UNIQUE',
            'DEFINITION',
            'CONDITIONALS',
            'LIST_RENDERING',
            'RENDER_MODIFIERS',
            'GLOBAL',
            'OTHER_ATTR',
            'OTHER_DIRECTIVES',
            'CONTENT'
          ]
        }
      ],
      output: `<template lang="pug">#uniqueID(v-if="!visible", v-for="item in items", is="header", v-once, v-on:click="functionCall", ref="header", :prop="headerData", v-text="textContent", myProp="prop")</template>`,
      errors: [
        {
          message: 'Attribute "is" should go before "v-once".',
          type: 'VAttribute'
        },
        {
          message: 'Attribute "v-on:click" should go before "v-once".',
          type: 'VAttribute'
        },
        {
          message: 'Attribute "ref" should go before "v-once".',
          type: 'VAttribute'
        },
        {
          message: 'Attribute "id" should go before "v-text".',
          type: 'VAttribute'
        },
        {
          message: 'Attribute "myProp" should go before "v-text".',
          type: 'VAttribute'
        }
      ]
    },
    {
      code: `<template lang="pug">.content(v-if="!visible", v-model="foo", v-text="textContent")</template>`,
      options: [
        {
          order: [
            'CONDITIONALS',
            'LIST_RENDERING',
            'RENDER_MODIFIERS',
            'DEFINITION',
            'EVENTS',
            'UNIQUE',
            ['TWO_WAY_BINDING', 'OTHER_ATTR'],
            'CONTENT',
            'GLOBAL'
          ]
        }
      ],
      output: `<template lang="pug">.content(v-if="!visible", v-model="foo", v-text="textContent")</template>`,
      errors: [
        {
          message: 'Attribute "v-if" should go before "class".',
          type: 'VAttribute'
        }
      ]
    },
    {
      code: `<template lang="pug">my-component(v-if="!visible", v-model="content", v-slot="textContent")</template>`,
      output: `<template lang="pug">my-component(v-if="!visible", v-slot="textContent", v-model="content")</template>`,
      errors: [
        {
          message: 'Attribute "v-slot" should go before "v-model".',
          type: 'VAttribute'
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(z-prop="Z", a-prop="A")</template>`,
      options: [{ alphabetical: true }],
      output: `<template lang="pug">div(a-prop="A", z-prop="Z")</template>`,
      errors: [
        {
          message: 'Attribute "a-prop" should go before "z-prop".',
          type: 'VAttribute'
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(:z-prop="Z", :a-prop="A")</template>`,
      options: [{ alphabetical: true }],
      output: `<template lang="pug">div(:a-prop="A", :z-prop="Z")</template>`,
      errors: [
        {
          message: 'Attribute ":a-prop" should go before ":z-prop".',
          type: 'VAttribute'
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(@input="bar", @change="foo")</template>`,
      options: [{ alphabetical: true }],
      output: `<template lang="pug">div(@change="foo", @input="bar")</template>`,
      errors: [
        {
          message: 'Attribute "@change" should go before "@input".',
          type: 'VAttribute'
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(z-prop="value", boolean-prop)</template>`,
      options: [{ alphabetical: true }],
      output: `<template lang="pug">div(boolean-prop, z-prop="value")</template>`,
      errors: [
        {
          message: 'Attribute "boolean-prop" should go before "z-prop".',
          type: 'VAttribute'
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(v-on:click="functionCall", v-on:[c]="functionCall")</template>`,
      options: [{ alphabetical: true }],
      output: `<template lang="pug">div(v-on:[c]="functionCall", v-on:click="functionCall")</template>`,
      errors: [
        {
          message: 'Attribute "v-on:[c]" should go before "v-on:click".',
          type: 'VAttribute'
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(v-text="textContent", v-on:click="functionCall")</template>`,
      options: [{ alphabetical: true }],
      output: `<template lang="pug">div(v-on:click="functionCall", v-text="textContent")</template>`,
      errors: [
        {
          message: 'Attribute "v-on:click" should go before "v-text".',
          type: 'VAttribute'
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">.bar(:class="foo")</template>`,
      options: [{ alphabetical: true }],
      output: `<template lang="pug">.bar(:class="foo")</template>`,
      errors: [
        {
          message: 'Attribute "class" should go before ":class".'
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(v-show="foo", v-if="bar")</template>`,
      options: [{ alphabetical: true }],
      output: `<template lang="pug">div(v-if="bar", v-show="foo")</template>`,
      errors: [
        {
          message: 'Attribute "v-if" should go before "v-show".'
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(v-foo="foo", v-bar="bar")</template>`,
      options: [{ alphabetical: true }],
      output: `<template lang="pug">div(v-bar="bar", v-foo="foo")</template>`,
      errors: [
        {
          message: 'Attribute "v-bar" should go before "v-foo".'
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(v-foo.b="b", v-foo.a="a")</template>`,
      options: [{ alphabetical: true }],
      output: `<template lang="pug">div(v-foo.a="a", v-foo.b="b")</template>`,
      errors: [
        {
          message: 'Attribute "v-foo.a" should go before "v-foo.b".'
        }
      ]
    },

    {
      filename: 'test.vue',
      code: `<template lang="pug">div(v-cloak, v-is="foo")</template>`,
      output: `<template lang="pug">div(v-is="foo", v-cloak)</template>`,
      errors: [
        {
          message: 'Attribute "v-is" should go before "v-cloak".'
        }
      ]
    },

    // v-bind="..."
    {
      filename: 'test.vue',
      code: `
      <template lang="pug">div(v-bind:id="a", v-bind="b", v-if="x")</template>`,
      output: `
      <template lang="pug">div(v-if="x", v-bind:id="a", v-bind="b")</template>`,
      errors: ['Attribute "v-if" should go before "v-bind:id".']
    },
    {
      filename: 'test.vue',
      code: `
      <template lang="pug">div(v-bind:id="a", v-if="x", v-bind="b")</template>`,
      output: `
      <template lang="pug">div(v-if="x", v-bind:id="a", v-bind="b")</template>`,
      errors: ['Attribute "v-if" should go before "v-bind:id".']
    },
    {
      filename: 'test.vue',
      code: `
      <template lang="pug">div(v-bind="b", v-bind:id="a", v-if="x")</template>`,
      output: `
      <template lang="pug">div(v-bind="b", v-if="x", v-bind:id="a")</template>`,
      errors: ['Attribute "v-if" should go before "v-bind:id".']
    },
    {
      filename: 'test.vue',
      code: `
      <template lang="pug">div(v-on:click="x", v-bind:id="a", v-bind="b")</template>`,
      options: [{ alphabetical: true }],
      output: `
      <template lang="pug">div(v-bind:id="a", v-on:click="x", v-bind="b")</template>`,
      errors: ['Attribute "v-bind:id" should go before "v-on:click".']
    },
    {
      filename: 'test.vue',
      code: `
      <template lang="pug">div(v-bind:id="a", v-on:click="x", v-bind="b")</template>`,
      options: [{ alphabetical: true }],
      output: `
      <template lang="pug">div(v-bind:id="a", v-bind="b", v-on:click="x")</template>`,
      errors: ['Attribute "v-bind" should go before "v-on:click".']
    },
    {
      filename: 'test.vue',
      code: `
      <template lang="pug">div(v-on:click="x", v-bind="b", v-bind:id="a")</template>`,
      options: [{ alphabetical: true }],
      output: `
      <template lang="pug">div(v-bind="b", v-bind:id="a", v-on:click="x")</template>`,
      errors: ['Attribute "v-bind:id" should go before "v-on:click".']
    },
    {
      filename: 'test.vue',
      code: `
      <template lang="pug">div(v-on:click="x", v-bind:a="x", v-bind="x", v-if="x")</template>`,
      options: [{ alphabetical: true }],
      output: `
      <template lang="pug">div(v-bind:a="x", v-on:click="x", v-bind="x", v-if="x")</template>`,
      errors: [
        'Attribute "v-bind:a" should go before "v-on:click".',
        'Attribute "v-if" should go before "v-on:click".'
      ]
    },
    {
      filename: 'test.vue',
      code: `
      <template lang="pug">div(v-bind:a="x", v-on:click="x", v-bind="x", v-if="x")</template>`,
      options: [{ alphabetical: true }],
      output: `
      <template lang="pug">div(v-bind:a="x", v-bind="x", v-on:click="x", v-if="x")</template>`,
      errors: [
        'Attribute "v-bind" should go before "v-on:click".',
        'Attribute "v-if" should go before "v-on:click".'
      ]
    },
    {
      filename: 'test.vue',
      code: `
      <template lang="pug">div(a="x", v-bind="x", v-if="x")</template>`,
      options: [{ alphabetical: true }],
      output: `
      <template lang="pug">div(v-if="x", a="x", v-bind="x")</template>`,
      errors: ['Attribute "v-if" should go before "a".']
    },
    {
      filename: 'test.vue',
      code: `
      <template lang="pug">div(v-on:click="x", v-bind="x", v-if="x")</template>`,
      options: [{ alphabetical: true }],
      output: `
      <template lang="pug">div(v-bind="x", v-on:click="x", v-if="x")</template>`,
      errors: [
        'Attribute "v-bind" should go before "v-on:click".',
        'Attribute "v-if" should go before "v-on:click".'
      ]
    },
    {
      filename: 'test.vue',
      code: `
      <template lang="pug">div(v-custom-directive="x", v-bind="b", v-model="c", v-bind:value="a")</template>`,
      output: `
      <template lang="pug">div(v-bind="b", v-model="c", v-custom-directive="x", v-bind:value="a")</template>`,
      errors: ['Attribute "v-model" should go before "v-custom-directive".']
    },
    {
      filename: 'test.vue',
      code: `
      <template lang="pug">div(v-if="x", v-model="c", v-bind="b", v-bind:id="a")</template>`,
      output: `
      <template lang="pug">div(v-if="x", v-bind="b", v-bind:id="a", v-model="c")</template>`,
      errors: ['Attribute "v-bind:id" should go before "v-model".']
    },

    // omit order
    {
      filename: 'test.vue',
      code: `
      <template lang="pug">div(v-if="a", attr="a", v-for="a in items")</template>`,
      options: [{ order: ['LIST_RENDERING', 'CONDITIONALS'] }],
      output: `
      <template lang="pug">div(v-for="a in items", v-if="a", attr="a")</template>`,
      errors: ['Attribute "v-for" should go before "v-if".']
    },
    {
      filename: 'test.vue',
      code: `
      <template lang="pug">div(attr="a", v-if="a", v-for="a in items")</template>`,
      options: [{ order: ['LIST_RENDERING', 'CONDITIONALS'] }],
      output: `
      <template lang="pug">div(attr="a", v-for="a in items", v-if="a")</template>`,
      errors: ['Attribute "v-for" should go before "v-if".']
    },

    // slot
    {
      filename: 'test.vue',
      options: [
        {
          order: [
            'UNIQUE',
            'LIST_RENDERING',
            'CONDITIONALS',
            'RENDER_MODIFIERS',
            'GLOBAL',
            'TWO_WAY_BINDING',
            'OTHER_DIRECTIVES',
            'OTHER_ATTR',
            'EVENTS',
            'CONTENT',
            'DEFINITION',
            'SLOT'
          ]
        }
      ],
      code: `<template lang="pug">div(ref="foo", v-slot="{ qux }", bar="baz")</template>`,
      output:
        `<template lang="pug">div(ref="foo", bar="baz", v-slot="{ qux }")</template>`,
      errors: [
        {
          message: 'Attribute "bar" should go before "v-slot".'
        }
      ]
    },

    {
      filename: 'test.vue',
      options: [
        {
          order: [
            'UNIQUE',
            'LIST_RENDERING',
            'CONDITIONALS',
            'RENDER_MODIFIERS',
            'GLOBAL',
            'TWO_WAY_BINDING',
            'OTHER_DIRECTIVES',
            'OTHER_ATTR',
            'EVENTS',
            'CONTENT',
            'DEFINITION',
            'SLOT'
          ]
        }
      ],
      code: `<template lang="pug">div(bar="baz", ref="foo", v-slot="{ qux }")</template>`,
      output:
        `<template lang="pug">div(ref="foo", bar="baz", v-slot="{ qux }")</template>`,
      errors: [
        {
          message: 'Attribute "ref" should go before "bar".'
        }
      ]
    },

    {
      filename: 'test.vue',
      code: `
      <template lang="pug">div(v-bind="object", v-if="show", v-model="model", ref="ref", @click="handleClick")</template>`,
      output: `
      <template lang="pug">div(v-if="show", v-bind="object", ref="ref", v-model="model", @click="handleClick")</template>`,
      errors: [
        'Attribute "v-if" should go before "v-bind".',
        'Attribute "ref" should go before "v-model".'
      ]
    },

    {
      filename: 'test.vue',
      code: `
      <template lang="pug">div(@click="handleClick", v-bind="object")</template>`,
      output: `
      <template lang="pug">div(v-bind="object", @click="handleClick")</template>`,
      errors: ['Attribute "v-bind" should go before "@click".']
    },

    {
      filename: 'test.vue',
      code: `
      <template lang="pug">div(ref="ref", @click="handleClick", v-bind="object", @input="handleInput")</template>`,
      output: `
      <template lang="pug">div(ref="ref", v-bind="object", @click="handleClick", @input="handleInput")</template>`,
      errors: ['Attribute "v-bind" should go before "@click".']
    },

    {
      filename: 'test.vue',
      code: `
      <template lang="pug">div(ref="ref", @click="handleClick", v-bind="object", @input="handleInput")</template>`,
      options: [{ order: ['UNIQUE', 'EVENTS', 'OTHER_ATTR'] }],
      output: `
      <template lang="pug">div(ref="ref", @click="handleClick", @input="handleInput", v-bind="object")</template>`,
      errors: ['Attribute "@input" should go before "v-bind".']
    },

    {
      filename: 'test.vue',
      code: `
      <template lang="pug">div(v-bind="object", @click="handleClick", attr="foo")</template>`,
      options: [{ order: ['UNIQUE', 'EVENTS', 'OTHER_ATTR'] }],
      output: `
      <template lang="pug">div(@click="handleClick", v-bind="object", attr="foo")</template>`,
      errors: ['Attribute "@click" should go before "v-bind".']
    }
  ]
})
