/**
 * Converts CSS property names to camelCase, the inverse of `dasherise`
 * @function camelise
 * @param {string} prop The property name
 * @returns {string} The camelCase formatted property
 */

export default prop => prop.indexOf("--") === 0 ? prop : prop.replace(/-([\w])/g, (text, letter) => letter.toUpperCase()); // matches underscore too but you shouldn't do that anyway