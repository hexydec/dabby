import isObj from "../../internal/isobj/isobj.js";

/**
 * A plain object, that was defined with {} and has a prototype of Object
 * @typedef {Record<string, number>} PlainObject
 */

/**
 * Tests a value to see if it is a plain object
 * @function isPlainObject
 * @param {any} obj The value to be tested
 * @returns {boolean} Whether the input value is a plain object
 */

export default obj => {
	if (isObj(obj)) {
		const proto = Object.getPrototypeOf(obj);
		return proto === null || proto === Object.prototype;
	}
	return false;
};
