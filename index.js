const { Lexer } = require('pug-lexer')
const pugParse = require('./pug-parser')
const pugWalk = require('pug-walk')

const DUMMY_PARENT = Object.freeze({})

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
	comment: 'HTMLComment'
}

module.exports = class PugTokenizer {
	constructor (text, code, { startingLine, startingColumn }) {
		this.text = code
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
			if (!error.code.startsWith('PUG:')) throw error
			this.errors.push({
				code: error.code,
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
							name: node.name,
							rawName: node.name, // TODO öh?
							selfClosing: node.selfClosing,
							attributes: node.attrs.map(this.createAttributeToken.bind(this))
						}
					)
				)
				break
			case 'Text':
				this.htmlTokens.push(
					this.createTokenFromPugNode(
						node,
						'Text',
						{
							name: node.name
						}
					)
				)
				break
			case 'Comment':
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
				if (!node.selfClosing) {
					this.htmlTokens.push(
						this.createTokenFromPugNode(
							node,
							'EndTag',
							{
								name: node.name
							}, {
								start: node.loc.end,
								end: node.loc.end,
							},
						),
					)
				}
				break
			case 'Text':
			case 'Comment':
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
			directive: false
		})

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
			attribute.value = this.createTokenFromPugNode(attr, 'VLiteral', {
				parent: attribute,
				value: attr.val.replace(/^['"`](.*)['"`]$/s, '$1')
			}, {
				// include quotes in loc
				start: {
					line: attr.loc.start.line,
					column: attr.loc.start.column +
					attr.name.length + 1 +
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
}
