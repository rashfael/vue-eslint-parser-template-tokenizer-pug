// SKIP AUTOGENERATION
// AUTOGENERATED FROM https://github.com/vuejs/eslint-plugin-vue/blob/8f094200664a2b10bc597016f5486066a174e098/tests/lib/rules/block-spacing.js
/**
 * @author Yosuke Ota
 */
'use strict'

const RuleTester = require('eslint').RuleTester
const path = require('path')
const rule = require('../../fixtures/eslint-plugin-vue/lib/rules/block-spacing')

const tester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {  ecmaVersion: 2015 , templateTokenizer: { pug: path.resolve(__dirname, '../../../')}}
})

tester.run('block-spacing', rule, {
  valid: [
    `<template lang="pug">div(:attr="function foo() { return true; }")</template>`,
    {
      code: `<template lang="pug">div(:attr="function foo() {return true;}")</template>`,
      options: ['never']
    },
    `<template lang="pug">div(:[(function(){return(1)})()]="a")</template>`
  ],
  invalid: [
    {
      code: `
        <template lang="pug">div(:attr="function foo() {return true;}")</template>`,
      output: `
        <template lang="pug">div(:attr="function foo() { return true; }")</template>`,
      errors: [
        {
          messageId: 'missing',
          data: {
            location: 'after',
            token: '{'
          },
          // message: 'Requires a space after \'{\'',
          line: 2
        },
        {
          messageId: 'missing',
          data: {
            location: 'before',
            token: '}'
          },
          // message: 'Requires a space before \'}\'',
          line: 2
        }
      ]
    },
    {
      code: `
        <template lang="pug">button(@click="() => {return true;}")</template>`,
      output: `
        <template lang="pug">button(@click="() => { return true; }")</template>`,
      errors: [
        {
          messageId: 'missing',
          data: {
            location: 'after',
            token: '{'
          },
          // message: 'Requires a space after \'{\'',
          line: 2
        },
        {
          messageId: 'missing',
          data: {
            location: 'before',
            token: '}'
          },
          // message: 'Requires a space before \'}\'',
          line: 2
        }
      ]
    },
    {
      code: `
        <template lang="pug">div(:attr="function foo() { return true; }")</template>`,
      options: ['never'],
      output: `
        <template lang="pug">div(:attr="function foo() {return true;}")</template>`,
      errors: [
        {
          messageId: 'extra',
          data: {
            location: 'after',
            token: '{'
          },
          // message: 'Unexpected space(s) after \'{\'',
          line: 2
        },
        {
          messageId: 'extra',
          data: {
            location: 'before',
            token: '}'
          },
          // message: 'Unexpected space(s) before \'}\'',
          line: 2
        }
      ]
    },
    {
      code: `<template lang="pug">div(:[(function(){return(1)})()]="(function(){return(1)})()")</template>`,
      output:
        `<template lang="pug">div(:[(function(){return(1)})()]="(function(){ return(1) })()")</template>`,
      errors: [
        {
          messageId: 'missing',
          data: {
            location: 'after',
            token: '{'
          }
          // message: 'Requires a space after \'{\'',
        },
        {
          messageId: 'missing',
          data: {
            location: 'before',
            token: '}'
          }
          // message: 'Requires a space before \'}\'',
        }
      ]
    }
  ]
})
