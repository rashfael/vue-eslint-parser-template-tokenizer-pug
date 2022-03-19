// AUTOGENERATED FROM https://github.com/vuejs/eslint-plugin-vue/blob/8f094200664a2b10bc597016f5486066a174e098/tests/lib/rules/use-v-on-exact.js @2022-03-19T14:17:43.803Z
/**
 * @fileoverview enforce usage of `exact` modifier on `v-on`.
 * @author Armano
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const path = require('path')
const rule = require('../../fixtures/eslint-plugin-vue/lib/rules/use-v-on-exact')

const RuleTester = require('eslint').RuleTester

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {  ecmaVersion: 2015 , templateTokenizer: { pug: path.resolve(__dirname, '../../../')}}
})

ruleTester.run('use-v-on-exact', rule, {
  valid: [
    {
      code: `<template lang="pug">button(@click="foo")</template>`
    },
    {
      code: `<template lang="pug">button(@click="foo", :click="foo")</template>`
    },
    {
      code: `<template lang="pug">button(@click.ctrl="foo")</template>`
    },
    {
      code: `<template lang="pug">button(@click.exact="foo")</template>`
    },
    {
      code: `<template lang="pug">button(v-on:click="foo")</template>`
    },
    {
      code: `<template lang="pug">button(v-on:click.ctrl="foo")</template>`
    },
    {
      code: `<template lang="pug">button(v-on:click.exact="foo")</template>`
    },
    {
      code: `<template lang="pug">button(@click="foo", @click.stop="bar")</template>`
    },
    {
      code: `<template lang="pug">button(@click="foo", @click.prevent="bar", @click.stop="baz")</template>`
    },
    {
      code: `<template lang="pug">button(@click.prevent="foo", @click.stop="bar")</template>`
    },
    {
      code: `<template lang="pug">button(@click.exact="foo", @click.ctrl="bar")</template>`
    },
    {
      code: `<template lang="pug">button(@click.exact="foo", @click.ctrl.exact="bar", @click.ctrl.shift="baz")</template>`
    },
    {
      code: `<template lang="pug">button(@click.ctrl.exact="foo", @click.ctrl.shift="bar")</template>`
    },
    {
      code: `<template lang="pug">button(@click.exact="foo", @click.ctrl="foo")</template>`
    },
    {
      code: `<template lang="pug">button(@click="foo", @focus="foo")</template>`
    },
    {
      code: `<!-- CONVERT ERROR -->Duplicate attribute.<template><button @click="foo" @click="foo"/></template>`
    },
    {
      code: `<template lang="pug">
button(@click="foo")
button(@click.ctrl="foo")
</template>`
    },
    {
      code: `<template lang="pug">button(v-on:click.exact="foo", v-on:click.ctrl="foo")</template>`
    },
    {
      code: `<template lang="pug">a(@mouseenter="showTooltip", @mouseenter.once="attachTooltip")</template>`
    },
    {
      code: `<template lang="pug">input(@keypress.exact="foo", @keypress.esc.exact="bar", @keypress.ctrl="baz")</template>`
    },
    {
      code: `<template lang="pug">input(@keypress.a="foo", @keypress.b="bar", @keypress.a.b="baz")</template>`
    },
    {
      code: `<template lang="pug">input(@keypress.shift="foo", @keypress.ctrl="bar")</template>`
    },
    {
      code: `<template lang="pug">input(@keypress.27="foo", @keypress.27.middle="bar")</template>`
    },
    {
      code: `<template lang="pug">input(@keydown.a.b.c="abc", @keydown.a="a", @keydown.b="b", @keydown.c="c")</template>`
    },
    {
      code: `<template lang="pug">input(@keydown.a.b="ab", @keydown.a="a", @keydown.b="b", @keydown.c="c", @keydown.a.c="ac")</template>`
    },
    {
      code: `<template lang="pug">input(@keydown.a.b="ab", @keydown.a="a", @keydown.b="b", @keydown.c="c")</template>`
    },
    {
      code: `<template lang="pug">UiButton(@click="foo")</template>`
    },
    {
      code: `<template lang="pug">UiButton(@click="foo", @click.native="bar")</template>`
    },
    {
      code: `<template lang="pug">UiButton(@click="foo", @click.native.ctrl="bar")</template>`
    },
    {
      code: `<template lang="pug">UiButton(@click="foo", @click.native.exact="bar", @click.native.ctrl="baz")</template>`
    },
    {
      code: `<template lang="pug">UiButton(@click.native.exact="bar", @click.ctrl.native="baz")</template>`
    },
    {
      code: `<template lang="pug">UiButton(@click.native.ctrl.exact="foo", @click.native.ctrl.shift="bar")</template>`
    },
    {
      code: `<template lang="pug">UiButton(@click.native="foo", @click.native.stop="bar")</template>`
    },
    {
      code: `<template lang="pug">UiButton(@click.native.stop="foo", @click.native.prevent="bar")</template>`
    },
    {
      code: `<template lang="pug">button(@[click]="foo")</template>`
    },
    {
      code: `<template lang="pug">button(@[foo]="foo", @[bar].ctrl="bar")</template>`
    },
    {
      code: `<template lang="pug">input(@keydown.enter="foo", @keydown.shift.tab="bar")</template>`
    },
    {
      code: `<template lang="pug">input(@keydown.enter="foo", @keydown.shift.tab.prevent="bar")</template>`
    },
    {
      code: `<template lang="pug">input-component(@keydown.enter.native="foo", @keydown.shift.tab.native="bar")</template>`
    }
  ],

  invalid: [
    {
      code: `<template lang="pug">button(@click="foo", @click.ctrl="bar")</template>`,
      errors: [{ message: "Consider to use '.exact' modifier.", line: 3 }]
    },
    {
      code: `<template lang="pug">button(@click="foo", @click.ctrl.stop="bar")</template>`,
      errors: [{ message: "Consider to use '.exact' modifier.", line: 3 }]
    },
    {
      code: `<template lang="pug">button(@click.prevent="foo", @click.ctrl="bar")</template>`,
      errors: [{ message: "Consider to use '.exact' modifier.", line: 3 }]
    },
    {
      code: `<template lang="pug">button(@click.exact="foo", @click.ctrl="bar", @click.ctrl.shift="baz")</template>`,
      errors: [{ message: "Consider to use '.exact' modifier.", line: 4 }]
    },
    {
      code: `<template lang="pug">button(@click="foo", @click.ctrl="bar", @click.ctrl.shift="baz")</template>`,
      errors: [
        { message: "Consider to use '.exact' modifier.", line: 3 },
        { message: "Consider to use '.exact' modifier.", line: 4 }
      ]
    },
    {
      code: `<template lang="pug">input(@keypress.27="foo", @keypress.27.shift="bar")</template>`,
      errors: [{ message: "Consider to use '.exact' modifier.", line: 3 }]
    },
    {
      code: `<template lang="pug">input(@keypress.exact="foo", @keypress.esc="bar", @keypress.ctrl="baz")</template>`,
      errors: [{ message: "Consider to use '.exact' modifier.", line: 4 }]
    },
    {
      code: `<template lang="pug">UiButton(@click="foo", @click.native="bar", @click.ctrl.native="baz")</template>`,
      errors: [{ message: "Consider to use '.exact' modifier.", line: 4 }]
    },
    {
      code: `<template lang="pug">UiButton(@click.native.ctrl="foo", @click.native.ctrl.shift="bar")</template>`,
      errors: [{ message: "Consider to use '.exact' modifier.", line: 3 }]
    },
    {
      code: `<template lang="pug">UiButton(@click.native="foo", @click.native.ctrl="bar", @click.native.ctrl.shift="baz")</template>`,
      errors: [
        { message: "Consider to use '.exact' modifier.", line: 3 },
        { message: "Consider to use '.exact' modifier.", line: 4 }
      ]
    },
    {
      code: `<template lang="pug">button(@[foo]="foo", @[foo].ctrl="bar")</template>`,
      errors: [{ message: "Consider to use '.exact' modifier.", line: 3 }]
    }
  ]
})
