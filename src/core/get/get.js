import $ from "../../core/dabby/dabby.js";

/**
 * Retrieve raw HTML nodes from a Dabby collection
 * @memberof dabby
 * @method get
 * @instance
 * @param {int} [i] - The index of the node you want to retrieve, or `undefined` to retrieve all nodes as an array
 * @returns {(Node|Node[])} A `Node` object or and array of `Node` objects
 */
$.fn.get = function (i) {
	return i === undefined ? Array.from(this) : this[i >= 0 ? i : i + this.length];
};
