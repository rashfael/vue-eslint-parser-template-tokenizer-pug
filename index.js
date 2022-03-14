const { Lexer } = require('pug-lexer')
const pugParse = require('./pug-parser')
const pugWalk = require('pug-walk')

const DUMMY_PARENT = Object.freeze({})

module.exports = class PugTokenizer {
	constructor (text, code, { startingLine, startingColumn }) {
		this.code = code
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

		this.tokens = lexer.getTokens()
		const ast = pugParse(this.tokens.slice())

		const htmlTokens = []
		const before = (node) => {
			switch (node.type) {
				case 'Tag':
					htmlTokens.push(
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
				case 'Block':
					break
				default:
					console.warn('UNHANDLED BEFORE NODE', node)
					break
			}
			return true
		}

		const after = (node) => {
			switch (node.type) {
				case 'Tag':
					if (!node.selfClosing) {
						htmlTokens.push(
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
				case 'Block':
					break
				default:
					console.warn('UNHANDLED AFTER NODE', node)
					break
			}
		}

		pugWalk(ast, before, after)
		this.htmlTokenIterator = htmlTokens[Symbol.iterator]()
		// for (const token of htmlTokens) {
		// 	console.log(code.substring(token.range[0], token.range[1]), JSON.stringify(token))
		// }
	}

	nextToken () {
		return this.htmlTokenIterator.next().value
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

		if (typeof attr.val === 'string') {
			attribute.value = this.createTokenFromPugNode(attr, 'VLiteral', {
				parent: attribute,
				value: attr.val
			}) // add loc
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
