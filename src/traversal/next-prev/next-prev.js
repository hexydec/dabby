import $, {Dabby} from "../../core/dabby/dabby.js";
import filterNodes from "../../internal/filternodes/filternodes.js";

const factory = (obj, selector, filter, notall, until, next) => {
	let nodes = [],
		i = 0,
		len = obj.length, 
		method = (next ? "next" : "previous") + "ElementSibling";

	// look through each node and get siblings
	for (; i < len; i++) {
		let sibling = obj[i][method];
		while (sibling) {

			// end when we match until
			if (until && filterNodes(sibling, selector).length) {
				break;
			}

			// add the node
			nodes.push(sibling);

			// end when not finding all
			if (notall) {
				break;
			}
			sibling = sibling[method];
		}
	}

	// swap args for *Until methods
	if (until) {
		selector = filter;
	}

	// return new collection
	return $(selector ? filterNodes(nodes, selector) : nodes);
};

/**
 * Retrieve the next sibling of the first item in the collection
 * 
 * @memberof Dabby#
 * @function next
 * @type {{
 *  () => Dabby;
 * 	(selector:selector) => Dabby;
 * }}
 * @param {selector} selector A optional selector, HTML string, Node, array of Nodes, Dabby collection or a callback function to filter the collection by
 * @returns {Dabby} A new Dabby collection containing the next sibling
 */
const next = function (selector) {
	return factory(this, selector, null, true, false, true);
};
Object.defineProperty(Dabby.prototype, "next", {value: next});

/**
 * Retrieve the next sibling of every item in the collection, optionally filtered by a selector
 * 
 * @memberof Dabby#
 * @function nextAll
 * @type {{
 *  () => Dabby;
 * 	(selector:selector) => Dabby;
 * }}
 * @param {selector} selector A optional selector, HTML string, Node, array of Nodes, Dabby collection or a callback function to filter the collection by
 * @returns {Dabby} A new Dabby collection containing the matching parents
 */
const nextall = function (selector) {
	return factory(this, selector, null, false, false, true);
};
Object.defineProperty(Dabby.prototype, "nextAll", {value: nextall});

/**
 * Retrieve the following siblings of each item inthe collection up until the matched selector
 * 
 * @memberof Dabby#
 * @function nextUntil
 * @type {{
 * 	(selector:selector) => Dabby;
* 	(selector:selector, filter:selector) => Dabby;
 * }}
* @param {selector} selector A optional selector, HTML string, Node, array of Nodes, Dabby collection or a callback function to capture all the following siblings until but not including the matched node
 * @param {selector} filter A optional selector, HTML string, Node, array of Nodes, Dabby collection or a callback function to filter the collection by
 * @returns {Dabby} A new Dabby collection containing the matching siblings
 */
const nextuntil = function (selector, filter) {
	return factory(this, selector, filter, false, true, true);
};
Object.defineProperty(Dabby.prototype, "nextUntil", {value: nextuntil});

/**
 * Retrieve the next sibling of the first item in the collection
 * 
 * @memberof Dabby#
 * @function prev
 * @type {{
 *  () => Dabby;
 * 	(selector:selector) => Dabby;
 * }}
 * @param {selector} selector A optional selector, HTML string, Node, array of Nodes, Dabby collection or a callback function to filter the collection by
 * @returns {Dabby} A new Dabby collection containing the prev sibling
 */
const prev = function (selector) {
	return factory(this, selector, true, true);
};
Object.defineProperty(Dabby.prototype, "prev", {value: prev});

/**
 * Retrieve the next sibling of every item in the collection, optionally filtered by a selector
 * 
 * @memberof Dabby#
 * @function prevAll
 * @type {{
 *  () => Dabby;
 * 	(selector:selector) => Dabby;
 * }}
 * @param {selector} selector A optional selector, HTML string, Node, array of Nodes, Dabby collection or a callback function to filter the collection by
 * @returns {Dabby} A new Dabby collection containing the matching siblings
 */
const prevall = function (selector) {
	return factory(this, selector);
};
Object.defineProperty(Dabby.prototype, "prevAll", {value: prevall});

/**
 * Retrieve the preceding siblings of each item inthe collection up until the matched selector
 * 
 * @memberof Dabby#
 * @function prevUntil
 * @type {{
 * 	(selector:selector) => Dabby;
* 	(selector:selector, filter:selector) => Dabby;
 * }}
* @param {selector} selector A optional selector, HTML string, Node, array of Nodes, Dabby collection or a callback function to capture all the preceding siblings until but not including the matched node
 * @param {selector} filter A optional selector, HTML string, Node, array of Nodes, Dabby collection or a callback function to filter the collection by
 * @returns {Dabby} A new Dabby collection containing the matching siblings
 */
const prevuntil = function (selector, filter) {
	return factory(this, selector, filter, false, true);
};
Object.defineProperty(Dabby.prototype, "prevUntil", {value: prevuntil});