import $ from "../../core/dabby/dabby.js";

/**
 * A callback to receive nodes from a Dabby object
 * 
 * @callback mapCallback
 * @param {int} [index] The index of the node in the Dabby object 
 * @param {Node} [element] A Node object
 * @returns {any} Any value can be returned from each call
 */

/**
 * Run a custom callback function on each item in a Dabby collection
 * @memberof dabby
 * @method map
 * @instance
 * @param {mapCallback} callback - A callback to process each node in the Dabby object
 * @returns {any[]} An array of values returned from each callback on a node
 */
Object.defineProperty($.fn, "map", {
	value: function (callback) {
		let len = this.length,
			values = [],
			i = 0;
	
		for (; i < len; i++) {
			values.push(callback.call(this[i], i, this[i]));
		}
		return values;
	}
});
// $.fn.map = function (callback) {
// 	let len = this.length,
// 		values = [],
// 		i = 0;

// 	for (; i < len; i++) {
// 		values.push(callback.call(this[i], i, this[i]));
// 	}
// 	return values;
// };
