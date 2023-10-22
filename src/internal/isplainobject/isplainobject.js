import isObj from "../../internal/isobj/isobj.js";

/**
 * Tests a value to see if it is a plain object
 * @function isPlainObject
 * @param {string} obj The value to be tested
 * @returns {boolean} Whether the input value is a plain object
 */

export default obj => {
	if (isObj(obj)) {
		const proto = Object.getPrototypeOf(obj);
		return proto === null || proto === Object.prototype;
	}
	return false;
};
