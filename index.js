const { Lexer } = require('pug-lexer')
const pugParse = require('./pug-parser')
const pugWalk = require('pug-walk')

const DUMMY_PARENT = Object.freeze({})

const HTML_VOID_ELEMENT_TAGS = new Set([
	'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta',
	'param', 'source', 'track', 'wbr',
])

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
		this.htmlTokens = []

		try {
			const lexerTokens = lexer.getTokens()
			lexerTokens.forEach(this.convertLexerToken.bind(this))
			const ast = pugParse(lexerTokens)
			pugWalk(ast, this.before.bind(this), this.after.bind(this))
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
		this.htmlTokenIterator = this.htmlTokens[Symbol.iterator]()
		// for (const token of this.htmlTokens) {
		// 	console.log(code.substring(token.range[0], token.range[1]), JSON.stringify(token, (key, value) => {
		// 		if (key === 'parent') return
		// 		if (key === 'loc') return value.start.line + ':' + value.start.column + '-' + value.end.line + ':' + value.end.column
		// 		if (key === 'range') return value[0] + '-' + value[1]
		// 		return value
		// 	}, 2))
		// }
	}

	nextToken () {
		return this.htmlTokenIterator.next().value
	}

	before (node) {
		switch (node.type) {
			case 'Tag':
				this.htmlTokens.push(
					this.createTokenFromPugNode(
						node,
						'StartTag',
						{
							name: node.name.toLowerCase(),
							rawName: node.name,
							selfClosing: node.selfClosing || HTML_VOID_ELEMENT_TAGS.has(node.name),
							attributes: node.attrs.map(this.createAttributeToken.bind(this))
						}
					)
				)
				break
			case 'Text': {
				// resolve mustaches
				const mustacheTokens = this.findMustacheTokens(node)
				let mustache = null
				for (const token of mustacheTokens) {
					if (token.type === 'VExpressionStart') {
						mustache = {
							type: 'Mustache',
							value: '',
							startToken: token,
							range: token.range,
							loc: token.loc,
						}
						continue
					} else if (mustache && token.type === 'VExpressionEnd') {
						mustache.endToken = token
						mustache.range[1] = token.range[1]
						mustache.loc.end = token.loc.end
						this.htmlTokens.push(mustache)
						mustache = null
						continue
					}
					if (mustache) {
						mustache.value += token.value
						continue
					}
					this.htmlTokens.push(Object.assign({}, token, {type: 'Text'}))
				}
				break
			}
			case 'Code':
			case 'Comment':
			case 'Conditional':
			case 'Case':
			case 'When':
			case 'Each':
			case 'While':
			case 'Default':
			case 'Include':
			case 'FileReference':
			case 'Extends':
			case 'NamedBlock':
			case 'Mixin':
			case 'Block':
				break
			default:
				console.log('UNHANDLED BEFORE NODE', node)
				break
		}
		return true
	}

	after (node) {
		switch (node.type) {
			case 'Tag':
				if (!node.selfClosing && !HTML_VOID_ELEMENT_TAGS.has(node.name)) {
					this.htmlTokens.push(
						this.createTokenFromPugNode(
							node,
							'EndTag',
							{
								name: node.name.toLowerCase()
							}, {
								start: node.loc.end,
								end: node.loc.end,
							},
						),
					)
				}
				break
			case 'Text':
			case 'Code':
			case 'Comment':
			case 'Conditional':
			case 'Case':
			case 'When':
			case 'Each':
			case 'While':
			case 'Default':
			case 'Include':
			case 'FileReference':
			case 'Extends':
			case 'NamedBlock':
			case 'Mixin':
			case 'Block':
				break
			default:
				console.log('UNHANDLED AFTER NODE', node)
				break
		}
	}

	convertLexerToken (token) {
		if (!LEXER_TOKEN_MAP[token.type]) {
			console.log('UNHANDLED TOKEN TYPE', token)
		}
		if (token.type === 'attribute') {
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
			// include , in the range
			// if (this.text[identifier.range[1]] === ',') identifier.range[1] += 1
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
				const offset = this.text.indexOf(value, identifier.range[1])
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
				// include , in the range
				// if (this.text[literal.range[1]] === ',') literal.range[1] += 1
				this.tokens.push(literal)
			}
			return
		}
		if (token.type === 'text') {
			this.tokens.push(...this.findMustacheTokens(token))
			return
		}
		const tok = this.createTokenFromPugNode(token, LEXER_TOKEN_MAP[token.type], { value: token.val })
		// newlines having no width bricks the parser
		if (token.type === 'newline') {
			tok.range[0] -= 1
			tok.value = '\n'
		}
		if (token.type === 'comment') {
			this.comments.push(tok)
		} else {
			this.tokens.push(tok)
		}
	}

	createTokenFromPugNode (
		token,
		type,
		content,
		loc = token.loc,
	) {
		return {
			type,
			...content,
			loc: {
				start: {
					line: loc.start.line,
					column: loc.start.column - 1,
				},
				end: {
					line: loc.end.line,
					column: loc.end.column - 1,
				},
			},
			range: this.getRangeFromPugLoc(loc),
		}
	}

	createAttributeToken (attr) {
		// TODO generate distint lexer tokens? HTMLAssociation
		const attribute = this.createTokenFromPugNode(attr, 'VAttribute', {
			parent: DUMMY_PARENT,
			directive: false,
			value: null
		})

		// include , in the range
		// if (this.text[attribute.range[1]] === ',') attribute.range[1] += 1

		attribute.key = this.createTokenFromPugNode(attr, 'VIdentifier', {
			parent: attribute,
			name: attr.name,
			rawName: attr.name,
		}, {
			start: {
				line: attr.loc.start.line,
				column: attr.loc.start.column
			},
			end: {
				line: attr.loc.start.line,
				column:
					attr.loc.start.column +
					attr.name.length
			},
		})
		// ignore =
		// unquoted values are parsed as js by pug

		if (typeof attr.val === 'string') {
			const value = attr.val.replace(/^['"`](.*)['"`]$/s, '$1')
			const offset = !value ? attribute.key.range[1] + 1 + !!attr.val.match(/^['"`]/)?.length : this.text.indexOf(value, attribute.key.range[1])
			const { line, column } = this.getLocFromOffset(offset)
			attribute.value = this.createTokenFromPugNode(attr, 'VLiteral', {
				parent: attribute,
				value
			}, {
				// include quotes in loc
				start: {
					line,
					column: column +
						attr.val.includes('\n') // WHY?!
				},
				end: attr.loc.end,
			})
		}
		return attribute
	}

	getRangeFromPugLoc (loc) {
		return [
			this.lineToOffset[loc.start.line - 1] + loc.start.column - 1,
			this.lineToOffset[loc.end.line - 1] + loc.end.column - 1,
		]
	}

	getLocFromOffset (offset) {
		const line = this.text.slice(0, offset).split('\n').length
		const column = offset - this.lineToOffset[line - 1]
		return {
			line,
			column,
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
		console.log(mustacheMatches)
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
				start: this.getLocFromOffset(tokenRange[0] + match.index),
				end: this.getLocFromOffset(tokenRange[0] + match.index + 2)
			}))

			tokens.push(this.createTokenFromPugNode(token, 'PugText', {
				value: match[1]
			}, {
				start: this.getLocFromOffset(tokenRange[0] + match.index + 2),
				end: this.getLocFromOffset(tokenRange[0] + match[0].length - 2)
			}))

			tokens.push(this.createTokenFromPugNode(token, 'VExpressionEnd', {
				value: '}}'
			}, {
				start: this.getLocFromOffset(tokenRange[0] + match.index + match[0].length - 2),
				end: this.getLocFromOffset(tokenRange[0] + match.index + match[0].length)
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
}
