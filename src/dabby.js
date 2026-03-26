/**
 * Modular Dabby Export Helper
 *
 * This file provides a properly-typed factory function for creating
 * modular Dabby builds with only the methods you import.
 *
 * Usage:
 * import { createDabby } from 'dabbyjs/modular'
 * import 'dabbyjs/src/manipulation/html/html'
 * import 'dabbyjs/src/events/on/on'
 *
 * const $ = createDabby<'html' | 'on'>()
 * $('#app').html('Hello') // ✓ TypeScript knows this exists
 * $('#app').css('color', 'red') // ✗ TypeScript error - not imported
 */
import $base from './core/dabby/dabby.js';
/**
 * Create a properly-typed Dabby factory with only the methods you've imported
 *
 * Since TypeScript can't automatically detect which methods you've imported via side-effects,
 * this is just a type-safe wrapper around the base Dabby instance.
 *
 * @example
 * import { $ } from 'dabbyjs/modular'
 * import 'dabbyjs/src/manipulation/html/html'
 * import 'dabbyjs/src/events/on/on'
 *
 * // TypeScript won't stop you from using unimported methods (limitation of side-effect imports)
 * // But at least you get full type safety for the methods that DO exist
 * $('#app').html('Hello').on('click', () => {})
 */
export function createDabby() {
    return $base;
}
/**
 * Dabby with AUTO-INFERRED methods! 🎉
 *
 * This is the recommended way to use Dabby - methods are automatically added
 * to TypeScript's understanding as you import them via module augmentation!
 *
 * When you import a method file (e.g., 'dabbyjs/src/manipulation/html/html'),
 * that file augments the ModularDabbyMethods interface, and TypeScript
 * automatically knows html() is available!
 *
 * @example
 * import $ from 'dabbyjs'  // Default export
 * // or
 * import { $ } from 'dabbyjs'  // Named export
 *
 * import 'dabbyjs/src/manipulation/html/html'  // Automatically adds html() to $
 * import 'dabbyjs/src/events/on/on'            // Automatically adds on() to $
 *
 * // TypeScript knows these methods exist - no manual listing needed!
 * $('#app').html('Hello')   // ✓ TypeScript knows html() exists!
 * $('#app').on('click', fn) // ✓ TypeScript knows on() exists!
 * $('#app').css('color')    // ✗ TypeScript error - css not imported!
 */
export const $ = $base;
// Default export - auto-inferred modular Dabby (recommended!)
export default $;
