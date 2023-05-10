/**
 * Converts CSS property names from camelCase to dashed lowercase, the inverse of `camelise`
 * @function dasherise
 * @param {string} prop The property name
 * @returns {string} The dasherised property
 */

export default prop => prop.indexOf("--") === 0 ? prop : prop.replace(/[A-Z]/g, letter => "-" + letter.toLowerCase());