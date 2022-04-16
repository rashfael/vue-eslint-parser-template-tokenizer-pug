const should = require('chai').should()

const PugTokenizer = require('../index.js')

describe('mustaches', () => {
	it ('should be parsed correctly', () => {
		const templateText = `
p this {{ mustache should }} be parsed
		`
		const tokenizer = new PugTokenizer(templateText, `<template lang="pug">${templateText}</template>`, {
			startingLine: 1,
			startingColumn: 21,
		})

		const expectedNodes = [{
			type: 'StartTag',
			name: 'p'
		}, {
			type: 'Text',
			value: 'this '
		}, {
			type: 'Mustache',
			value: ' mustache should '
		}, {
			type: 'Text',
			value: ' be parsed'
		}, {
			type: 'EndTag',
			name: 'p'
		}]

		for (const [index, node] of expectedNodes.entries()) {
			tokenizer.htmlTokens[index].should.include(node)
		}

		const expectedTokens = [{
			type: 'PugNewline',
			value: '\n'
		}, {
			type: 'PugTag',
			value: 'p'
		}, {
			type: 'PugText',
			value: 'this ',
			range: [23, 28]
		}, {
			type: 'VExpressionStart',
			value: '{{',
			range: [28, 30]
		}, {
			type: 'PugText',
			value: ' mustache should ',
			range: [30, 42]
		}, {
			type: 'VExpressionEnd',
			value: '}}',
			range: [47, 49]
		}, {
			type: 'PugText',
			value: ' be parsed',
			range: [49, 60]
		}, {
			type: 'PugIndent',
			value: 2
		}, {
			type: 'PugOutdent'
		}, {
			type: 'PugEndOfSource'
		}]

		for (const [index, node] of expectedTokens.entries()) {
			tokenizer.tokens[index].should.deep.include(node)
		}
	})
})
