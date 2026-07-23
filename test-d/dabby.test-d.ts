/**
 * Type tests for DabbyJS
 * Tests the seamless TypeScript experience: import modules, get perfect inference.
 * No type imports required — just import $ and the modules you need.
 * Run with: npm run test:types
 */

import { expectType, expectError, expectAssignable } from 'tsd'

// The only import a user needs — everything else is module augmentation
import $ from '../src/dabby.js'

// Import modules — types are auto-added to $ via module augmentation
import '../src/manipulation/html/html.js'
import '../src/manipulation/text/text.js'
import '../src/manipulation/empty/empty.js'
import '../src/manipulation/insert/insert.js'
import '../src/manipulation/remove/remove.js'
import '../src/manipulation/clone/clone.js'
import '../src/events/on/on.js'
import '../src/events/off/off.js'
import '../src/events/trigger/trigger.js'
import '../src/events/named/named.js'
import '../src/attributes/class/class.js'
import '../src/attributes/hasclass/hasclass.js'
import '../src/attributes/css/css.js'
import '../src/attributes/attr/attr.js'
import '../src/attributes/data/data.js'
import '../src/attributes/val/val.js'
import '../src/attributes/show-hide/show-hide.js'
import '../src/traversal/find/find.js'
import '../src/traversal/filter/filter.js'
import '../src/traversal/children/children.js'
import '../src/traversal/add/add.js'
import '../src/traversal/eq/eq.js'
import '../src/traversal/first/first.js'
import '../src/traversal/last/last.js'
import '../src/traversal/parents/parents.js'
import '../src/traversal/siblings/siblings.js'
import '../src/traversal/next-prev/next-prev.js'
import '../src/dimensions/width-height/width-height.js'

// =============================================================================
// Seamless Inference — no type imports needed
// =============================================================================

// $ returns a fully-typed object with all imported methods
const $el = $('#test')

// =============================================================================
// HTML Method Tests
// =============================================================================

const htmlContent = $el.html()
expectType<string | undefined>(htmlContent)

const htmlSetter = $el.html('<div>test</div>')
expectAssignable<typeof $el>(htmlSetter)

$el.html(function(index, currentHTML) {
	expectType<number>(index)
	expectType<string>(currentHTML)
	return '<div>new</div>'
})

// =============================================================================
// Text Method Tests
// =============================================================================

const textContent = $el.text()
expectType<string>(textContent)

$el.text('Hello World')
$el.text(123)
$el.text(true)
$el.text(function(index, currentText) {
	expectType<number>(index)
	expectType<string>(currentText)
	return 'new text'
})

// =============================================================================
// Event Method Tests
// =============================================================================

$el.on('click', function(event) {
	expectType<Event>(event)
	expectType<Element>(this)
})

$el.on('click', '.button', function(event) {
	expectType<Event>(event)
})

$el.on({
	click: function(event) { expectType<Event>(event) },
	mouseover: function(event) { expectType<Event>(event) }
})

$el.off()
$el.off('click', (_e: Event) => {})
$el.trigger('click')

// =============================================================================
// Named Event Tests — auto-added by importing named.js
// =============================================================================

$el.click(() => {})
$el.click()
$el.mousedown(() => {})
$el.keyup(() => {})
$el.focus(() => {})
$el.blur(() => {})
$el.submit(() => {})
$el.change(() => {})

// =============================================================================
// Attribute & Class Tests
// =============================================================================

$el.addClass('active')
$el.addClass(['active', 'selected'])
$el.addClass(function(index, currentClass) {
	expectType<number>(index)
	expectType<string>(currentClass)
	return 'new-class'
})

$el.removeClass('active')
$el.toggleClass('active')
$el.toggleClass('active', true)

const hasClass = $el.hasClass('active')
expectType<boolean>(hasClass)

const cssValue = $el.css('color')
expectType<string>(cssValue)

const cssValues = $el.css(['color', 'background'])
expectType<Record<string, string>>(cssValues)

$el.css('color', 'red')
$el.css({ color: 'red', fontSize: 14 })

const attrValue = $el.attr('id')
expectType<string | null>(attrValue)
$el.attr('id', 'new-id')
$el.attr('id', null)

const dataAll = $el.data()
expectType<Record<string, unknown>>(dataAll)

const valResult = $el.val()
expectType<string | string[] | undefined>(valResult)
$el.val('hello')

$el.hide()
$el.show()
$el.toggle()

// =============================================================================
// Traversal Tests
// =============================================================================

$el.find('.item')
$el.filter('.active')
$el.filter(function(index) {
	expectType<number>(index)
	expectType<Element>(this)
	return index % 2 === 0
})

$el.children()
$el.children('.item')
$el.add('.other')
$el.eq(0)
$el.first()
$el.last()
$el.parent()
$el.parents('.container')
$el.siblings()
$el.next()
$el.prev()
$el.nextAll()
$el.prevAll()

// =============================================================================
// Manipulation Tests
// =============================================================================

$el.empty()
$el.append('<div>new</div>')
$el.prepend('<div>new</div>')
$el.before('<div>new</div>')
$el.after('<div>new</div>')
$el.remove()
$el.clone()
$el.clone(true, true)

// =============================================================================
// Dimension Tests
// =============================================================================

const w = $el.width()
expectType<number | undefined>(w)
$el.width(100)

const h = $el.height()
expectType<number | undefined>(h)
$el.height('50%')

// =============================================================================
// Method Chaining — the core seamless experience
// =============================================================================

// Every chained method returns the full type with ALL imported methods available
$el
	.html('<div>content</div>')
	.addClass('active')
	.css('color', 'red')
	.on('click', () => {})
	.find('.inner')
	.text('hello')
	.attr('data-id', '123')
	.show()

// Chaining also works from named events
$el.click(() => {}).addClass('clicked').text('done')

// =============================================================================
// Static Method Tests
// =============================================================================

// $.each is available as core static
// $.fn points to prototype

// =============================================================================
// Type Safety Tests — these should error
// =============================================================================

expectError($el.attr('id', ['invalid']))
expectError($el.addClass(123))
expectError($el.css('color', true))
expectError($el.hasClass('class1', 'class2'))
