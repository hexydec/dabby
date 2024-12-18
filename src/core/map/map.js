import $, {Dabby} from "../../core/dabby/dabby.js";
import "../../traversal/add/add.js";

/**
 * A callback to receive nodes from a Dabby object
 * 
 * @callback mapCallback
 * @param {number} [index] The index of the node in the Dabby object 
 * @param {Node} [element] A Node object
 * @returns {node|node[]|Dabby} A node, array of nodes, or a Dabby object
 */

/**
 * Run a custom callback function on each item in a Dabby collection
 * 
 * @param {mapCallback} callback - A callback to process each node in the Dabby object
 * @returns {Dabby} A Dabby object containing the mapped nodes
 */
const map = function (callback) {
	let len = this.length,
		arr = $(),
		i = 0;

	for (; i < len; i++) {
		arr = arr.add($(callback.call(this[i], i, this[i])));
	}
	return arr;
};

Object.defineProperty(Dabby.prototype, "map", {value: map});