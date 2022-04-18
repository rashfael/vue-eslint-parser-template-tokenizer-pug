const fs = require('fs')
const path = require('path')
const Tokenizer = require('../')

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

const ROOT = path.join(__dirname, '../tests/fixtures/tokens')
const TARGETS = fs.readdirSync(ROOT)

function replacer (key, value) {
	if (key === 'parent') return
	return value
}

for (const name of TARGETS) {
	console.log('Update fixture:', name)
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

	fs.writeFileSync(intermediateTokensPath, JSON.stringify(intermediates, replacer, 2))
	fs.writeFileSync(tokensPath, JSON.stringify({
		tokens: tokenizer.tokens,
		comments: tokenizer.comments,
		errors: tokenizer.errors
	}, replacer, 2))
}
