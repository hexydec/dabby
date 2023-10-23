/**
 * Tests a value to see if it is a window object
 * @function isWindow
 * @param {any} obj The value to be tested
 * @returns {boolean} Whether the input value is a window object
 */

export default obj => obj != null && obj === obj.window;