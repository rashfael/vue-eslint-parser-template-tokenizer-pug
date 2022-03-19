// SKIP AUTOGENERATION
// AUTOGENERATED FROM https://github.com/vuejs/eslint-plugin-vue/blob/8f094200664a2b10bc597016f5486066a174e098/tests/lib/rules/no-static-inline-styles.js
/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */
'use strict'

const RuleTester = require('eslint').RuleTester
const path = require('path')
const rule = require('../../fixtures/eslint-plugin-vue/lib/rules/no-static-inline-styles')

const tester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: { 
    ecmaVersion: 2019
  , templateTokenizer: { pug: path.resolve(__dirname, '../../../')}}
})

tester.run('no-static-inline-styles', rule, {
  valid: [
    `<template lang="pug">div(class="hidden")</template>`,
    `<template lang="pug">div(:style="prop")</template>`,
    `<template lang="pug">div(:style="{backgroundImage: 'url('+data.img+')'}")</template>`,
    `<template lang="pug">div(:style="{[backgroundImage]: 'url(./img.png)'}" })</template>`,
    `<template lang="pug">div(v-bind:style)</template>`,
    {
      code: `<template lang="pug">div(:style="{backgroundImage: 'url(./img.png)'}")</template>`,
      options: [{ allowBinding: true }]
    },
    // has unknown key name
    `<template lang="pug">div(:style="{[computed]: 'url(./img.png)', 'background-image': 'url(./img.png)', color: 'red',}")</template>`,
    `<template lang="pug">div(:style="{...spread,'background-image': 'url(./img.png)', color: 'red',}")</template>`,
    // array
    `<template lang="pug">div(:style="[{ ...propStyle }, { backgroundImage: 'url(./img.png)' },]")</template>`,
    // parse error
    `<template lang="pug">div(v-bind:style="{'background-image': 'url(./img.png)'")</template>`
  ],
  invalid: [
    {
      code: `<template lang="pug">div(style="display: none;")</template>`,
      errors: [
        {
          message: '`style` attributes are forbidden.',
          line: 3
        }
      ]
    },
    {
      code: `<template lang="pug">div(style)</template>`,
      errors: [
        {
          message: '`style` attributes are forbidden.',
          line: 3
        }
      ]
    },
    {
      code: `<template lang="pug">div(:style="{backgroundImage: 'url(./img.png)'}")</template>`,
      errors: [
        {
          message: 'Static inline `style` are forbidden.',
          line: 3
        }
      ]
    },
    {
      code: `<template lang="pug">div(:style="{'background-image': 'url(./img.png)'}")</template>`,
      errors: [
        {
          message: 'Static inline `style` are forbidden.',
          line: 3
        }
      ]
    },
    {
      code: `<template lang="pug">div(v-bind:style="{'background-image': 'url(./img.png)'}")</template>`,
      errors: [
        {
          message: 'Static inline `style` are forbidden.',
          line: 3
        }
      ]
    },
    // property
    {
      code: `<template lang="pug">div(:style="{color: color, 'background-image': 'url(./img.png)'}")</template>`,
      errors: [
        {
          message: 'Static inline `style` are forbidden.',
          line: 5
        }
      ]
    },
    {
      code: `<template lang="pug">div(:style="{'background-image': 'url(./img.png)', color, }")</template>`,
      errors: [
        {
          message: 'Static inline `style` are forbidden.',
          line: 4
        }
      ]
    },
    // array
    {
      code: `<template lang="pug">div(:style="[{ 'background-image': 'url(./img.png)' }, { color: 'red' }]")</template>`,
      errors: [
        {
          message: 'Static inline `style` are forbidden.',
          line: 3
        }
      ]
    },
    {
      code: `<template lang="pug">div(:style="[{ backgroundImage: 'url(./img.png)' }, { ...propStyle }, { backgroundImage: 'url(./img.png)' },]")</template>`,
      errors: [
        {
          message: 'Static inline `style` are forbidden.',
          line: 4
        }
      ]
    },
    {
      code: `<template lang="pug">div(:style="[{ backgroundImage: 'url(./img.png)' }, { backgroundImage: 'url(./img.png)', color, font: 'xxx', }, { backgroundImage: 'url(./img.png)' },]")</template>`,
      errors: [
        {
          message: 'Static inline `style` are forbidden.',
          line: 4
        },
        {
          message: 'Static inline `style` are forbidden.',
          line: 5
        },
        {
          message: 'Static inline `style` are forbidden.',
          line: 5
        }
      ]
    },
    {
      code: `<template lang="pug">div(:style="[{ backgroundImage: 'url(./img.png)' }, , { backgroundImage: 'url(./img.png)' },]")</template>`,
      errors: [
        {
          message: 'Static inline `style` are forbidden.',
          line: 3
        }
      ]
    },
    {
      code: `<template lang="pug">div(:style="[{ backgroundImage: 'url(./img.png)' }, 'string', { backgroundImage: 'url(./img.png)' },]")</template>`,
      errors: [
        {
          message: 'Static inline `style` are forbidden.',
          line: 4
        }
      ]
    }
  ]
})
