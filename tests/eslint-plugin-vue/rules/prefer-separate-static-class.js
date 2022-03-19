// AUTOGENERATED FROM https://github.com/vuejs/eslint-plugin-vue/blob/8f094200664a2b10bc597016f5486066a174e098/tests/lib/rules/prefer-separate-static-class.js
/**
 * @author Flo Edelmann
 * See LICENSE file in root directory for full license.
 */
'use strict'

const RuleTester = require('eslint').RuleTester
const path = require('path')
const rule = require('../../fixtures/eslint-plugin-vue/lib/rules/prefer-separate-static-class')

const tester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: { 
    ecmaVersion: 2020,
    sourceType: 'module'
  , templateTokenizer: { pug: path.resolve(__dirname, '../../../')}}
})

tester.run('prefer-separate-static-class', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: `<template lang="pug">.static-class</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(:class="dynamicClass")</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(:class="\`dynamic-class-\${foo}\`")</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(:class="'dynamic-class-' + foo")</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">.static-class(:class="dynamicClass")</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">.static-class(:class="[dynamicClass]")</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">.static-class(:class="{'dynamic-class': foo}")</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">.static-class(:class="{foo, [computedName]: true}")</template>`
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">.static-class(:class="[dynamicClass, {'dynamic-class': foo}]")</template>`
    }
  ],
  invalid: [
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(v-bind:class="'static-class'")</template>`,
      output: `<template lang="pug">.static-class</template>`,
      errors: [
        {
          message:
            'Static class "static-class" should be in a static `class` attribute.',
          line: 1,
          endLine: 1,
          column: 30,
          endColumn: 44
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(:class="'static-class'")</template>`,
      output: `<template lang="pug">.static-class</template>`,
      errors: [
        {
          message:
            'Static class "static-class" should be in a static `class` attribute.',
          line: 1,
          endLine: 1,
          column: 24,
          endColumn: 38
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(:class="\`static-class\`")</template>`,
      output: `<template lang="pug">.static-class</template>`,
      errors: [
        {
          message:
            'Static class "static-class" should be in a static `class` attribute.',
          line: 1,
          endLine: 1,
          column: 24,
          endColumn: 38
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(:class='"static-class"')</template>`,
      output: `<template lang="pug">.static-class</template>`,
      errors: [
        {
          message:
            'Static class "static-class" should be in a static `class` attribute.',
          line: 1,
          endLine: 1,
          column: 24,
          endColumn: 38
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(:class="['static-class']")</template>`,
      output: `<template lang="pug">.static-class</template>`,
      errors: [
        {
          message:
            'Static class "static-class" should be in a static `class` attribute.',
          line: 1,
          endLine: 1,
          column: 25,
          endColumn: 39
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(:class="{'static-class': true}")</template>`,
      output: `<template lang="pug">.static-class</template>`,
      errors: [
        {
          message:
            'Static class "static-class" should be in a static `class` attribute.',
          line: 1,
          endLine: 1,
          column: 25,
          endColumn: 39
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(:class="{foo: true}")</template>`,
      output: `<template lang="pug">.foo</template>`,
      errors: [
        {
          message:
            'Static class "foo" should be in a static `class` attribute.',
          line: 1,
          endLine: 1,
          column: 25,
          endColumn: 28
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(:class="{['static-class']: true}")</template>`,
      output: `<template lang="pug">.static-class</template>`,
      errors: [
        {
          message:
            'Static class "static-class" should be in a static `class` attribute.',
          line: 1,
          endLine: 1,
          column: 26,
          endColumn: 40
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(:class="['static-class', dynamicClass]")</template>`,
      output: `<template lang="pug">.static-class(:class="[dynamicClass]")</template>`,
      errors: [
        {
          message:
            'Static class "static-class" should be in a static `class` attribute.',
          line: 1,
          endLine: 1,
          column: 25,
          endColumn: 39
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(:class="[dynamicClass, otherDynamicClass, 'static-class']")</template>`,
      output: `<template lang="pug">.static-class(:class="[dynamicClass, otherDynamicClass]")</template>`,
      errors: [
        {
          message:
            'Static class "static-class" should be in a static `class` attribute.',
          line: 1,
          endLine: 1,
          column: 58,
          endColumn: 72
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(:class="{'static-class': true, 'dynamic-class': foo}")</template>`,
      output: `<template lang="pug">.static-class(:class="{'dynamic-class': foo}")</template>`,
      errors: [
        {
          message:
            'Static class "static-class" should be in a static `class` attribute.',
          line: 1,
          endLine: 1,
          column: 25,
          endColumn: 39
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(:class="[{'dynamic-class': foo, 'static-class': true}]")</template>`,
      output: `<template lang="pug">.static-class(:class="[{'dynamic-class': foo}]")</template>`,
      errors: [
        {
          message:
            'Static class "static-class" should be in a static `class` attribute.',
          line: 1,
          endLine: 1,
          column: 48,
          endColumn: 62
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `<template lang="pug">div(:class="[dynamicClass, {staticClass: true}]")</template>`,
      output: `<template lang="pug">.staticClass(:class="[dynamicClass]")</template>`,
      errors: [
        {
          message:
            'Static class "staticClass" should be in a static `class` attribute.',
          line: 1,
          endLine: 1,
          column: 40,
          endColumn: 51
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">
.other-class(other-attribute, :class="[
  {'dynamic-class-a': foo, 'static-class': true},
  dynamicClassB,
]")
</template>`,
      output: `
        <template lang="pug">
.other-class.static-class(other-attribute, :class="[
  {'dynamic-class-a': foo},
  dynamicClassB,
]")
</template>`,
      errors: [
        {
          message:
            'Static class "static-class" should be in a static `class` attribute.',
          line: 7,
          endLine: 7,
          column: 40,
          endColumn: 54
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `
        <template lang="pug">
.other-class-a.other-class-b(other-attribute, :class="[
  'static-class-a',
  {'static-class-b': true, 'dynamic-class-a': foo},
  dynamicClassB,
]")
</template>`,
      output: `
        <template lang="pug">
.other-class-a.other-class-b.static-class-a(other-attribute, :class="[
  {'static-class-b': true, 'dynamic-class-a': foo},
  dynamicClassB,
]")
</template>`,
      errors: [
        {
          message:
            'Static class "static-class-a" should be in a static `class` attribute.',
          line: 7,
          endLine: 7,
          column: 15,
          endColumn: 31
        },
        {
          message:
            'Static class "static-class-b" should be in a static `class` attribute.',
          line: 8,
          endLine: 8,
          column: 16,
          endColumn: 32
        }
      ]
    }
  ]
})
