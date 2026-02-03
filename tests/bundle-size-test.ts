/**
 * Bundle Size Test
 * This file demonstrates that TypeScript produces tree-shakeable code
 * that results in small bundles when only specific modules are imported
 */

// Import ONLY the modules we need - this should result in a small bundle
import $ from '../src/modular.js';
import '../src/manipulation/html/html.js';
import '../src/attributes/css/css.js';
import '../src/events/on/on.js';

// Usage - TypeScript ensures type safety
const $elem = $('<div>');

if ($elem.html && $elem.css && $elem.on) {
	$elem
		.html('<p>Hello TypeScript!</p>')
		.css('color', 'blue')
		.on('click', (event: Event) => {
			console.log('Clicked!', event);
		});
}

export {};
