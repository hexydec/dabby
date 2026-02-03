/**
 * TypeScript Import Test
 * This file tests that all module imports work correctly with TypeScript
 */

// Test default import
import $ from '../src/modular.js';

// Test individual module imports - Manipulation
import '../src/manipulation/html/html.js';
import '../src/manipulation/text/text.js';
import '../src/manipulation/empty/empty.js';
import '../src/manipulation/remove/remove.js';
import '../src/manipulation/clone/clone.js';
import '../src/manipulation/insert/insert.js';
import '../src/manipulation/insertto/insertto.js';
import '../src/manipulation/replace/replace.js';
import '../src/manipulation/wrap/wrap.js';
import '../src/manipulation/wrapall/wrapall.js';
import '../src/manipulation/unwrap/unwrap.js';

// Test individual module imports - Attributes
import '../src/attributes/attr/attr.js';
import '../src/attributes/class/class.js';
import '../src/attributes/css/css.js';
import '../src/attributes/data/data.js';
import '../src/attributes/hasclass/hasclass.js';
import '../src/attributes/prop/prop.js';
import '../src/attributes/removeprop/removeprop.js';
import '../src/attributes/show-hide/show-hide.js';
import '../src/attributes/val/val.js';

// Test individual module imports - Events
import '../src/events/on/on.js';
import '../src/events/off/off.js';
import '../src/events/trigger/trigger.js';
import '../src/events/triggerhandler/triggerhandler.js';

// Test individual module imports - Traversal
import '../src/traversal/children/children.js';
import '../src/traversal/closest/closest.js';
import '../src/traversal/eq/eq.js';
import '../src/traversal/filter/filter.js';
import '../src/traversal/first/first.js';
import '../src/traversal/last/last.js';
import '../src/traversal/has/has.js';
import '../src/traversal/index/index.js';
import '../src/traversal/next-prev/next-prev.js';
import '../src/traversal/parents/parents.js';
import '../src/traversal/siblings/siblings.js';
import '../src/traversal/slice/slice.js';
import '../src/traversal/find/find.js';
import '../src/traversal/add/add.js';

// Test individual module imports - Dimensions
import '../src/dimensions/offset/offset.js';
import '../src/dimensions/offsetparent/offsetparent.js';
import '../src/dimensions/position/position.js';
import '../src/dimensions/scroll/scroll.js';
import '../src/dimensions/width-height/width-height.js';

// Test individual module imports - Ajax
import '../src/ajax/ajax/ajax.js';
import '../src/ajax/getpost/getpost.js';
import '../src/ajax/getscript/getscript.js';
import '../src/ajax/param/param.js';
import '../src/ajax/serialize/serialize.js';
import '../src/ajax/load/load.js';

// Test individual module imports - Utils
import '../src/utils/extend/extend.js';
import '../src/utils/map/map.js';
import '../src/utils/isplainobject/isplainobject.js';
import '../src/utils/parsehtml/parsehtml.js';

console.log('TypeScript Import Test - Starting...');

// Test basic selector functionality
const $div = $('div');
console.log('✓ Basic selector works', typeof $div);

// Test manipulation methods
if ($div.html) {
	const html: string = $div.html();
	console.log('✓ html() method available and returns string');
}

if ($div.text) {
	const text: string = $div.text();
	console.log('✓ text() method available and returns string');
}

if ($div.empty) {
	$div.empty();
	console.log('✓ empty() method available');
}

// Test attribute methods
if ($div.attr) {
	const attrValue: string | undefined = $div.attr('id');
	console.log('✓ attr() method available');
}

if ($div.hasClass) {
	const hasClass: boolean = $div.hasClass('test');
	console.log('✓ hasClass() method available and returns boolean');
}

if ($div.css) {
	const cssValue: string = $div.css('color');
	console.log('✓ css() method available');
}

// Test event methods
if ($div.on) {
	$div.on('click', (event: Event) => {
		console.log('Event triggered', event);
	});
	console.log('✓ on() method available');
}

if ($div.off) {
	$div.off('click');
	console.log('✓ off() method available');
}

// Test traversal methods
if ($div.find) {
	const found = $div.find('.test');
	console.log('✓ find() method available');
}

if ($div.children) {
	const children = $div.children();
	console.log('✓ children() method available');
}

if ($div.filter) {
	const filtered = $div.filter('.test');
	console.log('✓ filter() method available');
}

// Test dimensions methods
if ($div.width) {
	const width: number = $div.width();
	console.log('✓ width() method available and returns number');
}

if ($div.height) {
	const height: number = $div.height();
	console.log('✓ height() method available and returns number');
}

// Test static utility methods
if ($.extend) {
	const extended = $.extend({ a: 1 }, { b: 2 });
	console.log('✓ $.extend() method available');
}

if ($.map) {
	const mapped = $.map([1, 2, 3], (value: number) => value * 2);
	console.log('✓ $.map() method available');
}

// Test ajax methods
if ($.ajax) {
	console.log('✓ $.ajax() method available');
}

if ($.get) {
	console.log('✓ $.get() method available');
}

if ($.post) {
	console.log('✓ $.post() method available');
}

console.log('TypeScript Import Test - All imports successful!');

export {};
