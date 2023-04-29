/**
 * Tests a value to see if it is an object
 * @function isObject
 * @param {string} obj The value to be tested
 * @returns {boolean} Whether the input value is an object
 */

export default obj => obj != null && typeof obj === "object";