const fs = require('fs')
const path = require('path')
const should = require('chai').should()
const Tokenizer = require('..')

const ROOT = path.join(__dirname, 'fixtures/tokens')
const TARGETS = fs.readdirSync(ROOT)

function replacer (key, value) {
	if (key === 'parent') return
	return value
}

// ------------------------------------------------------------------------------
// Main
// ------------------------------------------------------------------------------

describe('Template tokens', () => {
	for (const name of TARGETS) {
		const sourcePath = path.join(ROOT, `${name}/source.pug`)
		const intermediateTokensPath = path.join(ROOT, `${name}/intermediates.json`)
		const tokensPath = path.join(ROOT, `${name}/tokens.json`)

		const source = fs.readFileSync(sourcePath, 'utf8')

		const tokenizer = new Tokenizer(source, `<template lang="pug">${source}</template>`, {
			startingLine: 1,
			startingColumn: 21,
		})

		const intermediates = []

		let intermediate
		while ((intermediate = tokenizer.nextToken()) != null) {
			intermediates.push(intermediate)
		}

		describe(`'test/fixtures/tokens/${name}/source.pug'`, () => {
			it('should match intermediate tokens', () => {
				const expected = fs.readFileSync(intermediateTokensPath, 'utf8')

				JSON.stringify(intermediates, replacer, 2).should.equal(expected)
			})

			it('should match base tokens', () => {
				const expected = fs.readFileSync(tokensPath, 'utf8')

				JSON.stringify({
					tokens: tokenizer.tokens,
					comments: tokenizer.comments,
					errors: tokenizer.errors
				}, replacer, 2).should.equal(expected)
			})
		})
	}
})
