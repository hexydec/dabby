import $, {Dabby} from "../../core/dabby/dabby.js";
import filterNodes from "../../internal/filternodes/filternodes.js";

const factory = (obj, selector, filter, not) => {
	const nodes = filterNodes(obj, selector, not); // "not"
	return filter ? $(nodes) : !!nodes.length; // not "is" : "is"
};

/**
 * Determine whether any item in the collection matches the given selector
 * 
 * @memberof Dabby#
 * @function is
 * @param {selector} selector A optional selector, HTML string, Node, array of Nodes, Dabby collection or a callback function to filter the collection by
 * @returns {boolean} Whether any item in the collection matches the input selector
 */
const is = function (selector) {
	return factory(this, selector);
};
Object.defineProperty(Dabby.prototype, "is", {value: is});

/**
 * Filter the collection by the given selector
 * 
 * @memberof Dabby#
 * @function filter
* @param {selector} selector A optional selector, HTML string, Node, array of Nodes, Dabby collection or a callback function to filter the collection by
 * @returns {Dabby} A new Dabby collection containing the node matched via the supplied index
 */
const filter = function (selector) {
	return factory(this, selector, true);
};
Object.defineProperty(Dabby.prototype, "filter", {value: filter});

/**
 * Create a new collection containing only the items in the input collection that do not match the input selector
 * 
 * @memberof Dabby#
 * @function not
* @param {selector} selector A optional selector, HTML string, Node, array of Nodes, Dabby collection or a callback function to filter the collection by
 * @returns {Dabby} A new Dabby collection containing the nodes that don't match the selector
 */
const not = function (selector) {
	return factory(this, selector, true, true);
};
Object.defineProperty(Dabby.prototype, "not", {value: not});
