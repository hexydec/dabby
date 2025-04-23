import $ from "../../core/dabby/dabby.js";

/**
 * @callback mapCallback
 * @param {any} value The value of the current item
 * @param {number} key The index of the current item being processed
 * @returns {any} The result of the callback, or null not to include the output in the mapped array
 */

/**
 * Run a callback function on each item in an array
 * 
 * @memberof Dabby
 * @function map
 * @param {any[]|Object} obj An array or object
 * @param {mapCallback} callback A number indicating the end index
 * @returns {Array} A new array containing each item from the original array, transformed by the callback function
 */
const map = (obj, callback) => {
	let keys = Object.keys(obj),
		len = keys.length,
		arr = [],
		i = 0;

	for (; i < len; i++) {
		const result = callback.call(window, obj[keys[i]], keys[i]);
		if (result != null) { // double equals to capture undefined also
			arr = arr.concat(Array.isArray(result) ? result : [result]);
		}
	}
	return arr;
};
Object.defineProperty($, "map", {value: map});