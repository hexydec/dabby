import $ from "../../../dist/core/dabby/dabby.js";

/**
 * @callback eachCallback
 * @param {number} key The index of the current item being processed
 * @param {any} value The value of the current item
 * @returns {(undefined|false)} false to end the loop early, or undefined to continue
 */

/**
 * A generic iterator for looping through arrayLike objects
 * 
 * @param {(Dabby|Object)} obj A Dabby object, or ArrayLike object that can be iterated over
 * @param {eachCallback} callback A callback function to process each item in the list
 * @returns {(Dabby|Object)} The input object
 */
const each = (obj, callback) => {
	const isArr = Array.isArray(obj) || obj.length !== undefined,
		keys = isArr ? 0 : Object.keys(obj), // only get keys if object
		len = (isArr ? obj : keys).length;

	for (let i = 0, key; i < len; i++) {
		key = isArr ? i : keys[i]; // get index or key
		if (callback.call(obj[key], key, obj[key]) === false) {
			break; // stop if callback returns false
		}
	}
	return obj;
};
Object.defineProperty($, "each", {value: each});