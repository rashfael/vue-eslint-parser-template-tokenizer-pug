/* eslint-disable no-labels */
// Modified Pug parser preserving full token locations
// https://github.com/pugjs/pug/tree/master/packages/pug-parser

const assert = require('assert')
const TokenStream = require('token-stream')
const error = require('pug-error')
const inlineTags = [
	'a',
	'abbr',
	'acronym',
	'b',
	'br',
	'code',
	'em',
	'font',
	'i',
	'img',
	'ins',
	'kbd',
	'map',
	'samp',
	'small',
	'span',
	'strong',
	'sub',
	'sup',
]

module.exports = parse
module.exports.Parser = Parser

function parse (tokens, options) {
	const parser = new Parser(tokens, options)
	const ast = parser.parse()
	return JSON.parse(JSON.stringify(ast))
}

/**
 * Initialize `Parser` with the given input `str` and `filename`.
 *
 * @param {String} str
 * @param {String} filename
 * @param {Object} options
 * @api public
 */

function Parser (tokens, options) {
	options = options || {}
	if (!Array.isArray(tokens)) {
		throw new Error(
			'Expected tokens to be an Array but got "' + typeof tokens + '"',
		)
	}
	if (typeof options !== 'object') {
		throw new Error(
			'Expected "options" to be an object but got "' +
				typeof options +
				'"',
		)
	}
	this.tokens = new TokenStream(tokens)
	this.filename = options.filename
	this.src = options.src
	this.inMixin = 0
	this.plugins = options.plugins || []
}

/**
 * Parser prototype.
 */

Parser.prototype = {
	/**
	 * Save original constructor
	 */

	constructor: Parser,

	error: function (code, message, token) {
		const err = error(code, message, {
			loc: token.loc,
			src: this.src,
		})
		throw err
	},

	/**
	 * Return the next token object.
	 *
	 * @return {Object}
	 * @api private
	 */

	advance: function () {
		return this.tokens.advance()
	},

	/**
	 * Single token lookahead.
	 *
	 * @return {Object}
	 * @api private
	 */

	peek: function () {
		return this.tokens.peek()
	},

	/**
	 * `n` token lookahead.
	 *
	 * @param {Number} n
	 * @return {Object}
	 * @api private
	 */

	lookahead: function (n) {
		return this.tokens.lookahead(n)
	},

	/**
	 * Parse input returning a string of js for evaluation.
	 *
	 * @return {String}
	 * @api public
	 */

	parse: function () {
		const block = this.emptyBlock(0)

		while (this.peek().type != 'eos') {
			if (this.peek().type == 'newline') {
				this.advance()
			} else if (this.peek().type == 'text-html') {
				block.nodes = block.nodes.concat(this.parseTextHtml())
			} else {
				const expr = this.parseExpr()
				if (expr) {
					if (expr.type === 'Block') {
						block.nodes = block.nodes.concat(expr.nodes)
					} else {
						block.nodes.push(expr)
					}
				}
			}
		}

		return block
	},

	/**
	 * Expect the given type, or throw an exception.
	 *
	 * @param {String} type
	 * @api private
	 */

	expect: function (type) {
		if (this.peek().type === type) {
			return this.advance()
		} else {
			this.error(
				'INVALID_TOKEN',
				'expected "' + type + '", but got "' + this.peek().type + '"',
				this.peek(),
			)
		}
	},

	/**
	 * Accept the given `type`.
	 *
	 * @param {String} type
	 * @api private
	 */

	accept: function (type) {
		if (this.peek().type === type) {
			return this.advance()
		}
	},

	initBlock: function (line, nodes) {
		/* istanbul ignore if */
		if ((line | 0) !== line) throw new Error('`line` is not an integer')
		/* istanbul ignore if */
		if (!Array.isArray(nodes)) throw new Error('`nodes` is not an array')
		return {
			type: 'Block',
			nodes,
			line,
			filename: this.filename,
		}
	},

	emptyBlock: function (line) {
		return this.initBlock(line, [])
	},

	runPlugin: function (context, tok) {
		const rest = [this]
		for (var i = 2; i < arguments.length; i++) {
			rest.push(arguments[i])
		}
		let pluginContext
		for (var i = 0; i < this.plugins.length; i++) {
			const plugin = this.plugins[i]
			if (plugin[context] && plugin[context][tok.type]) {
				if (pluginContext)
					throw new Error(
						'Multiple plugin handlers found for context ' +
							JSON.stringify(context) +
							', token type ' +
							JSON.stringify(tok.type),
					)
				pluginContext = plugin[context]
			}
		}
		if (pluginContext)
			return pluginContext[tok.type].apply(pluginContext, rest)
	},

	/**
	 *   tag
	 * | doctype
	 * | mixin
	 * | include
	 * | filter
	 * | comment
	 * | text
	 * | text-html
	 * | dot
	 * | each
	 * | code
	 * | yield
	 * | id
	 * | class
	 * | interpolation
	 */

	parseExpr: function () {
		switch (this.peek().type) {
			case 'tag':
				return this.parseTag()
			case 'mixin':
				return this.parseMixin()
			case 'block':
				return this.parseBlock()
			case 'mixin-block':
				return this.parseMixinBlock()
			case 'case':
				return this.parseCase()
			case 'extends':
				return this.parseExtends()
			case 'include':
				return this.parseInclude()
			case 'doctype':
				return this.parseDoctype()
			case 'filter':
				return this.parseFilter()
			case 'comment':
				return this.parseComment()
			case 'text':
			case 'interpolated-code':
			case 'start-pug-interpolation':
				return this.parseText({ block: true })
			case 'text-html':
				return this.initBlock(
					this.peek().loc.start.line,
					this.parseTextHtml(),
				)
			case 'dot':
				return this.parseDot()
			case 'each':
				return this.parseEach()
			case 'eachOf':
				return this.parseEachOf()
			case 'code':
				return this.parseCode()
			case 'blockcode':
				return this.parseBlockCode()
			case 'if':
				return this.parseConditional()
			case 'while':
				return this.parseWhile()
			case 'call':
				return this.parseCall()
			case 'interpolation':
				return this.parseInterpolation()
			case 'yield':
				return this.parseYield()
			case 'id':
			case 'class':
				if (!this.peek().loc.start) debugger
				this.tokens.defer({
					type: 'tag',
					val: 'div',
					loc: this.peek().loc,
					filename: this.filename,
				})
				return this.parseExpr()
			default:
				var pluginResult = this.runPlugin(
					'expressionTokens',
					this.peek(),
				)
				if (pluginResult) return pluginResult
				this.error(
					'INVALID_TOKEN',
					'unexpected token "' + this.peek().type + '"',
					this.peek(),
				)
		}
	},

	parseDot: function () {
		this.advance()
		return this.parseTextBlock()
	},

	/**
	 * Text
	 */

	parseText: function (options) {
		const tags = []
		const lineno = this.peek().loc.start.line
		let nextTok = this.peek()
		loop: while (true) {
			switch (nextTok.type) {
				case 'text':
					var tok = this.advance()
					tags.push({
						type: 'Text',
						val: tok.val,
						loc: tok.loc,
					})
					break
				case 'interpolated-code':
					var tok = this.advance()
					tags.push({
						type: 'Code',
						val: tok.val,
						buffer: tok.buffer,
						mustEscape: tok.mustEscape !== false,
						isInline: true,
						loc: tok.loc,
					})
					break
				case 'newline':
					if (!options || !options.block) break loop
					var tok = this.advance()
					var nextType = this.peek().type
					if (
						nextType === 'text' ||
						nextType === 'interpolated-code'
					) {
						tags.push({
							type: 'Text',
							val: '\n',
							loc: tok.loc,
						})
					}
					break
				case 'start-pug-interpolation':
					this.advance()
					tags.push(this.parseExpr())
					this.expect('end-pug-interpolation')
					break
				default:
					var pluginResult = this.runPlugin(
						'textTokens',
						nextTok,
						tags,
					)
					if (pluginResult) break
					// eslint-disable-next-line no-labels
					break loop
			}
			nextTok = this.peek()
		}
		if (tags.length === 1) return tags[0]
		else return this.initBlock(lineno, tags)
	},

	parseTextHtml: function () {
		const nodes = []
		let currentNode = null
		loop: while (true) {
			switch (this.peek().type) {
				case 'text-html':
					var text = this.advance()
					if (!currentNode) {
						currentNode = {
							type: 'Text',
							val: text.val,
							loc: text.loc,
							isHtml: true,
						}
						nodes.push(currentNode)
					} else {
						currentNode.val += '\n' + text.val
					}
					break
				case 'indent':
					var block = this.block()
					block.nodes.forEach(function (node) {
						if (node.isHtml) {
							if (!currentNode) {
								currentNode = node
								nodes.push(currentNode)
							} else {
								currentNode.val += '\n' + node.val
							}
						} else {
							currentNode = null
							nodes.push(node)
						}
					})
					break
				case 'code':
					currentNode = null
					nodes.push(this.parseCode(true))
					break
				case 'newline':
					this.advance()
					break
				default:
					break loop
			}
		}
		return nodes
	},

	/**
	 *   ':' expr
	 * | block
	 */

	parseBlockExpansion: function () {
		const tok = this.accept(':')
		if (tok) {
			const expr = this.parseExpr()
			return expr.type === 'Block'
				? expr
				: this.initBlock(tok.loc.start.line, [expr])
		} else {
			return this.block()
		}
	},

	/**
	 * case
	 */

	parseCase: function () {
		const tok = this.expect('case')
		const node = {
			type: 'Case',
			expr: tok.val,
			loc: tok.loc,
		}

		const block = this.emptyBlock(tok.loc.start.line + 1)
		this.expect('indent')
		while (this.peek().type != 'outdent') {
			switch (this.peek().type) {
				case 'comment':
				case 'newline':
					this.advance()
					break
				case 'when':
					block.nodes.push(this.parseWhen())
					break
				case 'default':
					block.nodes.push(this.parseDefault())
					break
				default:
					var pluginResult = this.runPlugin(
						'caseTokens',
						this.peek(),
						block,
					)
					if (pluginResult) break
					this.error(
						'INVALID_TOKEN',
						'Unexpected token "' +
							this.peek().type +
							'", expected "when", "default" or "newline"',
						this.peek(),
					)
			}
		}
		this.expect('outdent')

		node.block = block

		return node
	},

	/**
	 * when
	 */

	parseWhen: function () {
		const tok = this.expect('when')
		if (this.peek().type !== 'newline') {
			return {
				type: 'When',
				expr: tok.val,
				block: this.parseBlockExpansion(),
				debug: false,
				loc: tok.loc,
			}
		} else {
			return {
				type: 'When',
				expr: tok.val,
				debug: false,
				loc: tok.loc,
			}
		}
	},

	/**
	 * default
	 */

	parseDefault: function () {
		const tok = this.expect('default')
		return {
			type: 'When',
			expr: 'default',
			block: this.parseBlockExpansion(),
			debug: false,
			loc: tok.loc,
		}
	},

	/**
	 * code
	 */

	parseCode: function (noBlock) {
		const tok = this.expect('code')
		assert(
			typeof tok.mustEscape === 'boolean',
			'Please update to the newest version of pug-lexer.',
		)
		const node = {
			type: 'Code',
			val: tok.val,
			buffer: tok.buffer,
			mustEscape: tok.mustEscape !== false,
			isInline: !!noBlock,
			loc: tok.loc,
		}
		// todo: why is this here?  It seems like a hacky workaround
		if (node.val.match(/^ *else/)) node.debug = false

		if (noBlock) return node

		let block

		// handle block
		block = this.peek().type == 'indent'
		if (block) {
			if (tok.buffer) {
				this.error(
					'BLOCK_IN_BUFFERED_CODE',
					'Buffered code cannot have a block attached to it',
					this.peek(),
				)
			}
			node.block = this.block()
		}

		return node
	},
	parseConditional: function () {
		let tok = this.expect('if')
		const node = {
			type: 'Conditional',
			test: tok.val,
			consequent: this.emptyBlock(tok.loc.start.line),
			alternate: null,
			loc: tok.loc,
		}

		// handle block
		if (this.peek().type == 'indent') {
			node.consequent = this.block()
		}

		let currentNode = node
		while (true) {
			if (this.peek().type === 'newline') {
				this.expect('newline')
			} else if (this.peek().type === 'else-if') {
				tok = this.expect('else-if')
				currentNode = currentNode.alternate = {
					type: 'Conditional',
					test: tok.val,
					consequent: this.emptyBlock(tok.loc.start.line),
					alternate: null,
					loc: tok.loc,
				}
				if (this.peek().type == 'indent') {
					currentNode.consequent = this.block()
				}
			} else if (this.peek().type === 'else') {
				this.expect('else')
				if (this.peek().type === 'indent') {
					currentNode.alternate = this.block()
				}
				break
			} else {
				break
			}
		}

		return node
	},
	parseWhile: function () {
		const tok = this.expect('while')
		const node = {
			type: 'While',
			test: tok.val,
			loc: tok.loc,
		}

		// handle block
		if (this.peek().type == 'indent') {
			node.block = this.block()
		} else {
			node.block = this.emptyBlock(tok.loc.start.line)
		}

		return node
	},

	/**
	 * block code
	 */

	parseBlockCode: function () {
		let tok = this.expect('blockcode')
		const body = this.peek()
		let text = ''
		if (body.type === 'start-pipeless-text') {
			this.advance()
			while (this.peek().type !== 'end-pipeless-text') {
				tok = this.advance()
				switch (tok.type) {
					case 'text':
						text += tok.val
						break
					case 'newline':
						text += '\n'
						break
					default:
						var pluginResult = this.runPlugin(
							'blockCodeTokens',
							tok,
							tok,
						)
						if (pluginResult) {
							text += pluginResult
							break
						}
						this.error(
							'INVALID_TOKEN',
							'Unexpected token type: ' + tok.type,
							tok,
						)
				}
			}
			this.advance()
		}
		return {
			type: 'Code',
			val: text,
			buffer: false,
			mustEscape: false,
			isInline: false,
			loc: tok.loc,
		}
	},
	/**
	 * comment
	 */

	parseComment: function () {
		const tok = this.expect('comment')
		let block
		if ((block = this.parseTextBlock())) {
			return {
				type: 'BlockComment',
				val: tok.val,
				block,
				buffer: tok.buffer,
				loc: tok.loc,
			}
		} else {
			return {
				type: 'Comment',
				val: tok.val,
				buffer: tok.buffer,
				loc: tok.loc,
			}
		}
	},

	/**
	 * doctype
	 */

	parseDoctype: function () {
		const tok = this.expect('doctype')
		return {
			type: 'Doctype',
			val: tok.val,
			loc: tok.loc,
		}
	},

	parseIncludeFilter: function () {
		const tok = this.expect('filter')
		let attrs = []

		if (this.peek().type === 'start-attributes') {
			attrs = this.attrs()
		}

		return {
			type: 'IncludeFilter',
			name: tok.val,
			attrs,
			loc: tok.loc,
		}
	},

	/**
	 * filter attrs? text-block
	 */

	parseFilter: function () {
		const tok = this.expect('filter')
		let block
		let attrs = []

		if (this.peek().type === 'start-attributes') {
			attrs = this.attrs().attrs
		}

		if (this.peek().type === 'text') {
			const textToken = this.advance()
			block = this.initBlock(textToken.loc.start.line, [
				{
					type: 'Text',
					val: textToken.val,
					loc: textToken.loc,
				},
			])
		} else if (this.peek().type === 'filter') {
			block = this.initBlock(tok.loc.start.line, [this.parseFilter()])
		} else {
			block = this.parseTextBlock() || this.emptyBlock(tok.loc.start.line)
		}

		return {
			type: 'Filter',
			name: tok.val,
			block,
			attrs,
			loc: tok.loc,
		}
	},

	/**
	 * each block
	 */

	parseEach: function () {
		const tok = this.expect('each')
		const node = {
			type: 'Each',
			obj: tok.code,
			val: tok.val,
			key: tok.key,
			block: this.block(),
			loc: tok.loc,
		}
		if (this.peek().type == 'else') {
			this.advance()
			node.alternate = this.block()
		}
		return node
	},

	parseEachOf: function () {
		const tok = this.expect('eachOf')
		const node = {
			type: 'EachOf',
			obj: tok.code,
			val: tok.val,
			block: this.block(),
			loc: tok.loc,
		}
		return node
	},
	/**
	 * 'extends' name
	 */

	parseExtends: function () {
		const tok = this.expect('extends')
		const path = this.expect('path')
		return {
			type: 'Extends',
			file: {
				type: 'FileReference',
				path: path.val.trim(),
				loc: path.loc,
			},
			loc: tok.loc,
		}
	},

	/**
	 * 'block' name block
	 */

	parseBlock: function () {
		const tok = this.expect('block')

		const node =
			this.peek().type == 'indent'
				? this.block()
				: this.emptyBlock(tok.loc.start.line)
		node.type = 'NamedBlock'
		node.name = tok.val.trim()
		node.mode = tok.mode
		node.loc = tok.loc

		return node
	},

	parseMixinBlock: function () {
		const tok = this.expect('mixin-block')
		if (!this.inMixin) {
			this.error(
				'BLOCK_OUTISDE_MIXIN',
				'Anonymous blocks are not allowed unless they are part of a mixin.',
				tok,
			)
		}
		return {
			type: 'MixinBlock',
			loc: tok.loc,
		}
	},

	parseYield: function () {
		const tok = this.expect('yield')
		return {
			type: 'YieldBlock',
			loc: tok.loc,
		}
	},

	/**
	 * include block?
	 */

	parseInclude: function () {
		const tok = this.expect('include')
		const node = {
			type: 'Include',
			file: {
				type: 'FileReference',
				filename: this.filename,
			},
			loc: tok.loc,
		}
		const filters = []
		while (this.peek().type === 'filter') {
			filters.push(this.parseIncludeFilter())
		}
		const path = this.expect('path')

		node.file.path = path.val.trim()
		node.file.loc = path.loc

		if (
			(/\.jade$/.test(node.file.path) || /\.pug$/.test(node.file.path)) &&
			!filters.length
		) {
			node.block =
				this.peek().type == 'indent'
					? this.block()
					: this.emptyBlock(tok.loc.start.line)
			if (/\.jade$/.test(node.file.path)) {
				console.warn(
					this.filename +
						', line ' +
						tok.loc.start.line +
						':\nThe .jade extension is deprecated, use .pug for "' +
						node.file.path +
						'".',
				)
			}
		} else {
			node.type = 'RawInclude'
			node.filters = filters
			if (this.peek().type === 'indent') {
				this.error(
					'RAW_INCLUDE_BLOCK',
					'Raw inclusion cannot contain a block',
					this.peek(),
				)
			}
		}
		return node
	},

	/**
	 * call ident block
	 */

	parseCall: function () {
		const tok = this.expect('call')
		const name = tok.val
		const args = tok.args
		const mixin = {
			type: 'Mixin',
			name,
			args,
			block: this.emptyBlock(tok.loc.start.line),
			call: true,
			attrs: [],
			attributeBlocks: [],
			loc: tok.loc,
		}

		this.tag(mixin)
		if (mixin.code) {
			mixin.block.nodes.push(mixin.code)
			delete mixin.code
		}
		if (mixin.block.nodes.length === 0) mixin.block = null
		return mixin
	},

	/**
	 * mixin block
	 */

	parseMixin: function () {
		const tok = this.expect('mixin')
		const name = tok.val
		const args = tok.args

		if (this.peek().type == 'indent') {
			this.inMixin++
			const mixin = {
				type: 'Mixin',
				name,
				args,
				block: this.block(),
				call: false,
				loc: tok.loc,
			}
			this.inMixin--
			return mixin
		} else {
			this.error(
				'MIXIN_WITHOUT_BODY',
				'Mixin ' + name + ' declared without body',
				tok,
			)
		}
	},

	/**
	 * indent (text | newline)* outdent
	 */

	parseTextBlock: function () {
		var tok = this.accept('start-pipeless-text')
		if (!tok) return
		const block = this.emptyBlock(tok.loc.start.line)
		while (this.peek().type !== 'end-pipeless-text') {
			var tok = this.advance()
			switch (tok.type) {
				case 'text':
					block.nodes.push({
						type: 'Text',
						val: tok.val,
						loc: tok.loc,
					})
					break
				case 'newline':
					block.nodes.push({
						type: 'Text',
						val: '\n',
						loc: tok.loc,
					})
					break
				case 'start-pug-interpolation':
					block.nodes.push(this.parseExpr())
					this.expect('end-pug-interpolation')
					break
				case 'interpolated-code':
					block.nodes.push({
						type: 'Code',
						val: tok.val,
						buffer: tok.buffer,
						mustEscape: tok.mustEscape !== false,
						isInline: true,
						loc: tok.loc,
					})
					break
				default:
					var pluginResult = this.runPlugin(
						'textBlockTokens',
						tok,
						block,
						tok,
					)
					if (pluginResult) break
					this.error(
						'INVALID_TOKEN',
						'Unexpected token type: ' + tok.type,
						tok,
					)
			}
		}
		this.advance()
		return block
	},

	/**
	 * indent expr* outdent
	 */

	block: function () {
		const tok = this.expect('indent')
		const block = this.emptyBlock(tok.loc.start.line)
		while (this.peek().type != 'outdent') {
			if (this.peek().type == 'newline') {
				this.advance()
			} else if (this.peek().type == 'text-html') {
				block.nodes = block.nodes.concat(this.parseTextHtml())
			} else {
				const expr = this.parseExpr()
				if (expr.type === 'Block') {
					block.nodes = block.nodes.concat(expr.nodes)
				} else {
					block.nodes.push(expr)
				}
			}
		}
		this.expect('outdent')
		return block
	},

	/**
	 * interpolation (attrs | class | id)* (text | code | ':')? newline* block?
	 */

	parseInterpolation: function () {
		const tok = this.advance()
		const tag = {
			type: 'InterpolatedTag',
			expr: tok.val,
			selfClosing: false,
			block: this.emptyBlock(tok.loc.start.line),
			attrs: [],
			attributeBlocks: [],
			isInline: false,
			loc: tok.loc,
		}

		return this.tag(tag, { selfClosingAllowed: true })
	},

	/**
	 * tag (attrs | class | id)* (text | code | ':')? newline* block?
	 */

	parseTag: function () {
		const tok = this.advance()
		const tag = {
			type: 'Tag',
			name: tok.val,
			selfClosing: false,
			block: this.emptyBlock(tok.loc.start.line),
			attrs: [],
			attributeBlocks: [],
			isInline: inlineTags.indexOf(tok.val) !== -1,
			loc: tok.loc,
		}

		return this.tag(tag, { selfClosingAllowed: true })
	},

	/**
	 * Parse tag.
	 */

	tag: function (tag, options) {
		let seenAttrs = false
		const attributeNames = []
		const selfClosingAllowed = options && options.selfClosingAllowed
		// (attrs | class | id)*
		out: while (true) {
			switch (this.peek().type) {
				case 'id':
				case 'class':
					var tok = this.advance()
					continue
				case 'start-attributes':
					if (seenAttrs) {
						console.warn(
							this.filename +
								', line ' +
								this.peek().loc.start.line +
								':\nYou should not have pug tags with multiple attributes.',
						)
					}
					seenAttrs = true
					const {attrs, end} = this.attrs(attributeNames)
					tag.attrs = tag.attrs.concat(attrs)
					tag.loc.end = end.loc.end
					continue
				case '&attributes':
					var tok = this.advance()
					tag.attributeBlocks.push({
						type: 'AttributeBlock',
						val: tok.val,
						loc: tok.loc,
					})
					break
				default:
					var pluginResult = this.runPlugin(
						'tagAttributeTokens',
						this.peek(),
						tag,
						attributeNames,
					)
					if (pluginResult) break
					break out
			}
		}

		// check immediate '.'
		if (this.peek().type == 'dot') {
			tag.textOnly = true
			this.advance()
		}

		// (text | code | ':')?
		switch (this.peek().type) {
			case 'text':
			case 'interpolated-code':
				var text = this.parseText()
				if (text.type === 'Block') {
					tag.block.nodes.push.apply(tag.block.nodes, text.nodes)
				} else {
					tag.block.nodes.push(text)
				}
				break
			case 'code':
				tag.block.nodes.push(this.parseCode(true))
				break
			case ':':
				this.advance()
				var expr = this.parseExpr()
				tag.block =
					expr.type === 'Block'
						? expr
						: this.initBlock(tag.loc.start.line, [expr])
				break
			case 'newline':
			case 'indent':
			case 'outdent':
			case 'eos':
			case 'start-pipeless-text':
			case 'end-pug-interpolation':
				break
			case 'slash':
				if (selfClosingAllowed) {
					this.advance()
					tag.selfClosing = true
					break
				}
			default:
				var pluginResult = this.runPlugin(
					'tagTokens',
					this.peek(),
					tag,
					options,
				)
				if (pluginResult) break
				this.error(
					'INVALID_TOKEN',
					'Unexpected token `' +
						this.peek().type +
						'` expected `text`, `interpolated-code`, `code`, `:`' +
						(selfClosingAllowed ? ', `slash`' : '') +
						', `newline` or `eos`',
					this.peek(),
				)
		}

		// newline*
		while (this.peek().type == 'newline') this.advance()

		// block?
		if (tag.textOnly) {
			tag.block = this.parseTextBlock() || this.emptyBlock(tag.line)
		} else if (this.peek().type == 'indent') {
			const block = this.block()
			for (let i = 0, len = block.nodes.length; i < len; ++i) {
				tag.block.nodes.push(block.nodes[i])
			}
		}

		return tag
	},

	attrs: function (attributeNames) {
		this.expect('start-attributes')

		const attrs = []
		let tok = this.advance()
		while (tok.type === 'attribute') {
			if (tok.name !== 'class' && attributeNames) {
				// if (attributeNames.indexOf(tok.name) !== -1) {
				// 	this.error(
				// 		'DUPLICATE_ATTRIBUTE',
				// 		'Duplicate attribute "' +
				// 			tok.name +
				// 			'" is not allowed.',
				// 		tok,
				// 	)
				// }
				attributeNames.push(tok.name)
			}
			attrs.push({
				name: tok.name,
				val: tok.val,
				loc: tok.loc,
				mustEscape: tok.mustEscape !== false,
			})
			tok = this.advance()
		}
		this.tokens.defer(tok)
		return {
			attrs,
			end: this.expect('end-attributes')
		}
	},
}
