const { Lexer } = require('pug-lexer')

const DUMMY_PARENT = Object.freeze({})

const HTML_VOID_ELEMENT_TAGS = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'])

// TODO handle &attributes

const LEXER_TOKEN_MAP = {
	tag: 'PugTag',
	':': 'PugBlockExpansion', // might mean something else?
	'start-attributes': 'PugStartAttributes',
	'end-attributes': 'PugEndAttributes',
	attribute: 'PugAttribute',
	indent: 'PugIndent',
	outdent: 'PugOutdent',
	newline: 'PugNewline',
	eos: 'PugEndOfSource',
	id: 'PugId',
	class: 'PugClass',
	text: 'PugText',
	// https://pugjs.org/language/plain-text.html#block-in-a-tag
	dot: 'PugDot',
	'start-pipeless-text': 'PugStartPipelessText',
	'end-pipeless-text': 'PugEndPipelessText',
	'start-pug-interpolation': 'PugStartTagInterpolation',
	'end-pug-interpolation': 'PugEndTagInterpolation',
	filter: 'PugFilter',
	code: 'PugCode',
	if: 'PugIf',
	else: 'PugElse',
	'else-if': 'PugElseIf',
	case: 'PugCase',
	when: 'PugWhen',
	each: 'PugEach',
	while: 'PugWhile',
	default: 'PugDefault',
	include: 'PugInclude',
	path: 'PugPath',
	extends: 'PugExtends',
	block: 'PugBlock',
	'interpolated-code': 'PugInterpolatedCode',
	mixin: 'PugMixin',
	call: 'PugCall',
	comment: 'HTMLComment',
}

module.exports = class PugTokenizer {
	constructor (text, code, { startingLine, startingColumn }) {
		this.text = code
		// TODO take into account this flag when parsing
		this.expressionEnabled = true
		this.namespace = 'http://www.w3.org/1999/xhtml'
		const lexer = new Lexer(text, {
			filename: '',
			startingLine,
			startingColumn: startingColumn + 1,
		})

		this.lineToOffset = []
		let lastOffset = 0
		for (const line of code.split('\n')) {
			this.lineToOffset.push(lastOffset)
			lastOffset += line.length + 1 // add \n again
		}
		this.tokens = []
		this.comments = []
		this.errors = []

		this.tokenBuffer = []
		this.tagStack = []
		this._nextIndex = 0
		this._tokens = []

		try {
			this._tokens = lexer.getTokens()
		} catch (error) {
			if (!error.code?.startsWith('PUG:')) throw error
			this.errors.push({
				code: error.code.slice(4), // remove 'PUG:' prefix
				message: error.msg,
				index: this.lineToOffset[error.line - 1] + error.column - 1,
				lineNumber: error.line,
				column: error.column - 1
			})
		}
	}

	nextToken () {
		if (this.tokenBuffer.length) return this.tokenBuffer.shift()
		// TODO parse text-html
		if (this.peek() === null) return

		while (this.tokenBuffer.length === 0) {
			if (!this.peek()) return
			switch (this.peek().type) {
				case 'eos': return null
				case 'id':
				case 'class':
				case 'tag': {
					const tag = this.parseTag(this.peek().type === 'tag' ? null : 'div')
					this.tagStack.unshift(tag)
					return tag
				}
				case 'text': {
					this.parseText()
					break
				}
				case 'newline': {
					const token = this.recordToken(this.next())
					token.range[0] -= 1
					token.loc.start.line -= 1
					// actually find start of whitespace, pug-lexer only generates one newline token for multiple newlines
					while (this.text[token.range[0] - 1] === '\n') {
						token.range[0] -= 1
						token.loc.start.line -= 1
					}
					token.loc.start.column = this.lineToOffset[token.loc.start.line] - 1
					token.value = this.text.substring(token.range[0], token.range[1])
					while (this.tagStack[0]?.loc.end.line === token.loc.start.line) {
						const startTag = this.tagStack.shift()
						if (startTag.type === 'filter' || startTag.selfClosing) continue
						this.tokenBuffer.push({
							type: 'EndTag',
							name: startTag.name.toLowerCase(),
							loc: token.loc,
							range: token.range
						})
					}
					break
				}
				case 'outdent':
				case 'end-pug-interpolation': {
					const token = this.recordToken(this.next())
					token.range[0] -= 1
					token.loc.start.line -= 1
					// actually find start of whitespace, pug-lexer only generates one newline token for multiple newlines
					while (this.text[token.range[0] - 1] === '\n') {
						token.range[0] -= 1
						token.loc.start.line -= 1
					}
					token.loc.start.column = this.lineToOffset[token.loc.start.line] - 1
					token.value = this.text.substring(token.range[0], token.range[1])
					while (this.tagStack[0]?.loc.end.line === token.loc.start.line) {
						const startTag = this.tagStack.shift()
						if (startTag.type === 'filter' || startTag.selfClosing) continue
						this.tokenBuffer.push({
							type: 'EndTag',
							name: startTag.name.toLowerCase(),
							loc: token.loc,
							range: token.range
						})
					}
					const startTag = this.tagStack.shift()
					this.tokenBuffer.push({
						type: 'EndTag',
						name: startTag.name.toLowerCase(),
						loc: token.loc,
						range: token.range
					})
					break
				}
				case 'indent':
				case 'start-pug-interpolation':
				case 'start-pipeless-text': // TODO concat pipeless text blocks?
				case 'end-pipeless-text':
					this.recordToken(this.next())
					break
				case 'filter': {
					const token = this.recordToken(this.next())
					this.tagStack.unshift(token)
					break
				}
				case 'comment':
					this.comments.push(this.createTokenFromPugNode(this.next()))
					break
				// skip pug features we can't really lint
				case 'mixin':
				case 'call':
				case 'code':
				case 'if':
				case 'else':
				case 'else-if':
				case 'case':
				case 'when':
				case 'default':
				case 'each':
				case 'while':
				case 'include':
				case 'path':
				case 'extends':
				case 'block':
				case 'interpolated-code':
					this.skipIndentLevel()
					break
				default:
					this.error(
						'INVALID_TOKEN',
						'unexpected token "' + this.peek().type + '"',
						this.peek(),
					)
					return
			}
		}
		if (this.tokenBuffer.length) return this.tokenBuffer.shift()
	}

	// internal methods

	next () {
		if (this._nextIndex >= this._tokens.length) return null
		return this._tokens[this._nextIndex++]
	}

	peek () {
		if (this._nextIndex >= this._tokens.length) return null
		return this._tokens[this._nextIndex]
	}

	expect (type) {
		if (this.peek().type === type) {
			return this.next()
		} else {
			this.error(
				'INVALID_TOKEN',
				'expected "' + type + '", but got "' + this.peek().type + '"',
				this.peek(),
			)
		}
	}

	error (code, message, token) {
		this.errors.push({
			code,
			message,
			index: this.lineToOffset[token.loc.start.line - 1] + token.loc.start.column - 1,
			lineNumber: token.loc.start.line,
			column: token.loc.start.column - 1
		})
	}

	recordToken (token) {
		const transformedToken = this.createTokenFromPugNode(token)
		this.tokens.push(transformedToken)
		return transformedToken
	}

	parseTag (tagName) {
		const token = this.recordToken(this.next())
		tagName = tagName || token.value
		const tag = {
			type: 'StartTag',
			name: tagName.toLowerCase(),
			rawName: tagName,
			selfClosing: HTML_VOID_ELEMENT_TAGS.has(tagName),
			attributes: [],
			range: token.range.slice(),
			loc: Object.assign({}, token.loc)
		}

		return this.fillTag(tag)
	}

	fillTag (tag) {
		// eslint-disable-next-line no-labels
		out: while (true) {
			switch (this.peek().type) {
				case 'id':
				case 'class': {
					const token = this.recordToken(this.next())
					tag.loc.end = token.loc.end
					tag.range[1] = token.range[1]
					continue
				}
				case 'start-attributes': {
					this.recordToken(this.next())
					while (this.peek().type === 'attribute') {
						tag.attributes.push(this.parseAttribute(this.next()))
					}
					const endToken = this.recordToken(this.expect('end-attributes'))
					tag.loc.end = endToken.loc.end
					tag.range[1] = endToken.range[1]
					continue
				}
				default:
					// eslint-disable-next-line no-labels
					break out
			}
		}

		switch (this.peek().type) {
			case 'dot':
			case ':':
				this.recordToken(this.next())
				break
			case 'slash':
				this.next()
				tag.selfClosing = true
				break
			case 'text':
			case 'interpolated-code':
			case 'newline':
			case 'indent':
			case 'outdent':
			case 'eos':
			case 'start-pipeless-text':
			case 'end-pug-interpolation':
				break
			default:
				this.error(
					'INVALID_TOKEN',
					'Unexpected token `' +
						this.peek().type +
						'` expected `text`, `interpolated-code`, `code`, `:`, `slash`, `newline` or `eos`',
					this.peek()
				)
		}
		return tag
	}

	parseAttribute (token) {
		const identifier = this.createTokenFromPugNode(token, 'PugIdentifier', {
			value: token.name
		}, {
			start: {
				line: token.loc.start.line,
				column: token.loc.start.column
			},
			end: {
				line: token.loc.start.line,
				column:
					token.loc.start.column +
					token.name.length
			},
		})

		const attribute = this.createTokenFromPugNode(token, 'VAttribute', {
			parent: DUMMY_PARENT,
			directive: false,
			value: null
		})

		attribute.key = {
			type: 'VIdentifier',
			parent: attribute,
			name: token.name,
			rawName: token.name,
			loc: identifier.loc,
			range: identifier.range
		}

		this.tokens.push(identifier)
		this.tokens.push(this.createTokenFromPugNode(token, 'PugAssociation', {
			value: '='
		}, {
			start: {
				line: token.loc.start.line,
				column: token.loc.start.column + token.name.length
			},
			end: {
				line: token.loc.start.line,
				column:
					token.loc.start.column +
					token.name.length + 1
			},
		}))
		if (typeof token.val === 'string') {
			const value = token.val.replace(/^['"`](.*)['"`]$/s, '$1')
			const offset = !value ? identifier.range[1] + 1 + !!token.val.match(/^['"`]/)?.length : this.text.indexOf(value, identifier.range[1])
			const { line, column } = this.getLocFromOffset(offset)
			const literal = this.createTokenFromPugNode(token, 'PugLiteral', {
				value,
			}, {
				start: {
					line,
					column: column +
						token.val.includes('\n') // WHY?!
				},
				end: token.loc.end,
			})
			this.tokens.push(literal)
			attribute.value = {
				type: 'VLiteral',
				parent: attribute,
				value,
				loc: literal.loc,
				range: literal.range
			}
		}
		return attribute
	}

	parseText () {
		const token = this.next()
		const mustacheTokens = this.findMustacheTokens(token)
		this.tokens.push(...mustacheTokens)
		let mustache = null
		for (const token of mustacheTokens) {
			if (token.type === 'VExpressionStart') {
				mustache = {
					type: 'Mustache',
					value: '',
					startToken: token,
					range: token.range.slice(),
					loc: Object.assign({}, token.loc),
				}
				continue
			} else if (mustache && token.type === 'VExpressionEnd') {
				mustache.endToken = token
				mustache.range[1] = token.range[1]
				mustache.loc.end = token.loc.end
				this.tokenBuffer.push(mustache)
				mustache = null
				continue
			}
			if (mustache) {
				mustache.value += token.value
				continue
			}
			this.tokenBuffer.push(Object.assign({}, token, { type: 'Text' }))
		}
	}

	findMustacheTokens (token) {
		const text = token.val
		const mustacheMatches = Array.from(text.matchAll(/{{(.*?)}}/g))
		if (mustacheMatches.length === 0) return [this.createTokenFromPugNode(token, 'PugText', {
			value: text
		})]
		const tokenRange = this.getRangeFromPugLoc(token.loc)
		const tokens = []
		let lastIndex = 0
		for (const match of mustacheMatches) {
			if (match.index > lastIndex) {
				tokens.push(this.createTokenFromPugNode(token, 'PugText', {
					value: text.slice(lastIndex, match.index)
				}, {
					start: this.getLocFromOffset(tokenRange[0] + lastIndex),
					end: this.getLocFromOffset(tokenRange[0] + match.index)
				}))
			}
			tokens.push(this.createTokenFromPugNode(token, 'VExpressionStart', {
				value: '{{'
			}, {
				start: this.getLocFromOffset(tokenRange[0] + match.index + 1),
				end: this.getLocFromOffset(tokenRange[0] + match.index + 3)
			}))

			tokens.push(this.createTokenFromPugNode(token, 'PugText', {
				value: match[1]
			}, {
				start: this.getLocFromOffset(tokenRange[0] + match.index + 3),
				end: this.getLocFromOffset(tokenRange[0] + match[0].length - 1)
			}))

			tokens.push(this.createTokenFromPugNode(token, 'VExpressionEnd', {
				value: '}}'
			}, {
				start: this.getLocFromOffset(tokenRange[0] + match.index + match[0].length - 1),
				end: this.getLocFromOffset(tokenRange[0] + match.index + match[0].length + 1)
			}))

			lastIndex = match.index + match[0].length
		}

		if (lastIndex < text.length) {
			tokens.push(this.createTokenFromPugNode(token, 'PugText', {
				value: text.slice(lastIndex, text.length)
			}, {
				start: this.getLocFromOffset(tokenRange[0] + lastIndex),
				end: token.loc.end
			}))
		}
		return tokens
	}

	skipIndentLevel () {
		// skip tokens until we match indents with outdents
		let indentLevel = 0
		while (true) {
			let token = this.next()
			if (!token || token.type === 'eos') return
			token = this.recordToken(token)
			if (token.type === 'PugIndent') indentLevel++
			else if (token.type === 'PugOutdent') {
				if (indentLevel === 0) break
				indentLevel--
			} else if (token.type === 'PugNewline') {
				if (indentLevel === 0) break
			}
		}
	}

	// utils

	createTokenFromPugNode (
		token,
		type = LEXER_TOKEN_MAP[token.type],
		content = { value: token.val },
		loc = token.loc,
	) {
		return {
			type,
			...content,
			loc: this.pugLocToEslintLoc(loc),
			range: this.getRangeFromPugLoc(loc),
		}
	}

	pugLocToEslintLoc (loc) {
		return {
			start: {
				line: loc.start.line,
				column: loc.start.column - 1,
			},
			end: {
				line: loc.end.line,
				column: loc.end.column - 1,
			},
		}
	}

	getRangeFromPugLoc (loc) {
		return [
			this.lineToOffset[loc.start.line - 1] + loc.start.column - 1,
			this.lineToOffset[loc.end.line - 1] + loc.end.column - 1,
		]
	}

	getLocFromOffset (offset) {
		// TODO make less inefficient
		const line = this.text.slice(0, offset).split('\n').length
		const column = offset - this.lineToOffset[line - 1]
		return {
			line,
			column,
		}
	}
}
