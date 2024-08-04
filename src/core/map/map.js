import $, {Dabby} from "../../core/dabby/dabby.js";
import "../../traversal/add/add.js";

/**
 * A callback to receive nodes from a Dabby object
 * 
 * @callback mapCallback
 * @param {number} [index] The index of the node in the Dabby object 
 * @param {Node} [element] A Node object
 * @returns {any} A node, array of nodes, or a Dabby object
 */

/**
 * Run a custom callback function on each item in a Dabby collection
 * 
 * @param {mapCallback} callback - A callback to process each node in the Dabby object
 * @returns {any[]} An array containing the mapped values
 */
const map = function (callback) {
	let len = this.length,
		arr = [],
		i = 0;

	for (; i < len; i++) {
		const result = callback.call(this[i], i, this[i]);
		if (result != null) { // double equals to capture undefined also
			arr = arr.concat(Array.isArray(result) ? result : [result]);
		}
	}
	return arr;
};

Object.defineProperty(Dabby.prototype, "map", {value: map});