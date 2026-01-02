import {Dabby} from "../../../dist/core/dabby/dabby.js";
	
/**
 * Retrieve raw HTML nodes from a Dabby collection
 * 
 * @param {number} [i] - The index of the node you want to retrieve, or `undefined` to retrieve all nodes as an array
 * @returns {Node|Node[]} A `Node` object or an array of `Node` objects
 */
const get = function (i) {
	return i === undefined ? Array.from(this) : this[i >= 0 ? i : i + this.length];
}

Object.defineProperty(Dabby.prototype, "get", {value: get});
