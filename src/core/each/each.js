import $ from "../../core/dabby/dabby.js";
import "../../utils/each/each.js";

/**
 * A callback to receive nodes from a Dabby object
 * 
 * @callback eachCallback
 * @param {int} [index] The index of the node in the Dabby object 
 * @param {Node} [element] A Node object
 * @returns {(void|false)} No return value, or false to end the each loop
 */

/**
 * Run a custom callback function on each item in a Dabby collection
 * @memberof dabby
 * @method each
 * @instance
 * @param {eachCallback} callback - A callback to process each node in the Dabby object
 * @returns {dabby} The original Dabby object
 */
$.fn.each = function (callback) {
	$.each(this, callback);
	return this;
};