/**
 * Type tests for DabbyJS Modular Builds
 * Tests the createDabby factory with explicit method types
 */

import { expectType, expectAssignable } from 'tsd'
import { createDabby, type DabbyWithMethods, type DabbyAuto } from '../src/dabby.js'
import type { Dabby } from '../src/core/dabby/dabby.js'
import type { DOMNode } from '../src/types.js'

// Import specific modules
import '../src/manipulation/html/html.js'
import '../src/manipulation/text/text.js'
import '../src/events/on/on.js'

// =============================================================================
// Modular Factory Tests
// =============================================================================

// Test: createDabby with explicit method list
const $minimal = createDabby<'html' | 'text' | 'on'>()

// Test: Factory returns proper type (DabbyWithMethods extends Dabby)
const instance = $minimal('#test')
expectType<DabbyWithMethods<'html' | 'text' | 'on'>>(instance)
expectAssignable<Dabby>(instance)

// Test: Methods are available and properly typed
const htmlResult = $minimal('#test').html()
expectType<string | undefined>(htmlResult)

const htmlSetResult = $minimal('#test').html('<div>test</div>')
expectAssignable<Dabby>(htmlSetResult)

const textResult = $minimal('#test').text()
expectType<string>(textResult)

const textSetResult = $minimal('#test').text('hello')
expectAssignable<Dabby>(textSetResult)

const onResult = $minimal('#test').on('click', function(event: Event) {
	expectType<Event>(event)
})
expectAssignable<Dabby>(onResult)

// =============================================================================
// Chaining Tests
// =============================================================================

// Test: Method chaining works correctly
const chainedResult = $minimal('#test')
	.html('<div>content</div>')
	.text('new text')
	.on('click', () => {})
expectAssignable<Dabby>(chainedResult)

// =============================================================================
// Auto-Inferred Modular Build Tests
// =============================================================================

// Import the auto-inferred factory
import $ from '../src/dabby.js'

// Test: Auto-inferred factory works
const autoInstance = $('#test')
expectType<DabbyAuto>(autoInstance)
expectAssignable<Dabby>(autoInstance)

// Test: Imported methods are available
const autoHtml = $('#test').html()
expectType<string | undefined>(autoHtml)

const autoText = $('#test').text('content')
expectAssignable<Dabby>(autoText)

const autoOn = $('#test').on('click', () => {})
expectAssignable<Dabby>(autoOn)

// =============================================================================
// Empty Modular Build Test
// =============================================================================

// Test: createDabby with no methods still returns valid Dabby
const $empty = createDabby()
const emptyInstance = $empty('#test')
expectType<DabbyWithMethods<never>>(emptyInstance)
expectAssignable<Dabby>(emptyInstance)

// Core methods should still be available
const eachResult = $empty('#test').each(function(index, element) {
	expectType<number>(index)
	expectType<DOMNode>(element)
})
expectAssignable<Dabby>(eachResult)

const getResult = $empty('#test').get(0)
expectType<DOMNode | undefined>(getResult)
