import $, {Dabby} from "../../core/dabby/dabby.js";
import filterNodes from "../../internal/filternodes/filternodes.js";

const factory = (obj, selector, filter, single, until) => {
	let nodes = [],
		i = obj.length,
		parent;

	while (i--) {
		parent = obj[i].parentNode;
		while (parent && parent.nodeType === 1) { // Node.ELEMENT_NODE
			if (until && filterNodes(parent, selector).length) {
				break;
			}
			nodes.push(parent);
			if (single) {
				break;
			}
			parent = parent.parentNode;
		}
	}
	if (!until) {
		filter = selector;
	}
	return $(filter ? filterNodes(nodes, filter) : nodes);
}

/**
 * Retrieve the parent of each item in a collection, optionally filtered by a selector
 * 
 * @memberof Dabby#
 * @function parent
 * @type {{
 *  () => Dabby;
* 	(selector:selector) => Dabby;
* }}
 * @param {selector} selector A optional selector, HTML string, Node, array of Nodes, Dabby collection or a callback function to filter the collection by
 * @returns {Dabby} A Dabby collection 
 */
const parent = function (selector) {
	return factory(this, selector, null, true);
};
Object.defineProperty(Dabby.prototype, "parent", {value: parent});

/**
 * Retrieve all the parents of each item in a collection, optionally filtered by a selector
 * 
 * @memberof Dabby#
 * @function parents
 * @type {{
 *  () => Dabby;
* 	(selector:selector) => Dabby;
* }}
 * @param {selector} selector A optional selector, HTML string, Node, array of Nodes, Dabby collection or a callback function to filter the collection by
 * @returns {Dabby} A Dabby collection 
 */
const parents = function (selector) {
	return factory(this, selector);
};
Object.defineProperty(Dabby.prototype, "parents", {value: parents});

/**
 * Retrieve the parents of each item in a collection until but not including the matched selector, optionally filtered by a selector
 * 
 * @memberof Dabby#
 * @function parentsUntil
 * @type {{
* 	(selector:selector) => Dabby;
 *  (selector:selector, filter:selector) => Dabby;
* }}
* @param {selector} selector A optional selector, HTML string, Node, array of Nodes, Dabby collection or a callback function indicating the where to stop matching parent nodes
 * @param {selector} filteer A optional selector, HTML string, Node, array of Nodes, Dabby collection or a callback function to filter the collection by
 * @returns {Dabby} A Dabby collection 
 */
const until = function (selector, filter) {
	return factory(this, selector, filter, false, true);
};
Object.defineProperty(Dabby.prototype, "parentsUntil", {value: until});