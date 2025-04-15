import $, {Dabby} from "../../core/dabby/dabby.js";
import "../../traversal/eq/eq.js";
import "../../manipulation/clone/clone.js";

/**
 * Wraps all elements in the collection with the supplied HTML, if there are multiple nodes, the first element will wrap the items
 * 
 * @memberof Dabby#
 * @function wrapAll
 * @param {selector} html A selector, HTML string, Node, array of Nodes, Dabby collection or a callback function
 * @returns {Dabby} The original Dabby collection
 */
const wrapall = function (html) {
	if (this[0]) {
		if (typeof html === "function") {
			html = html.call(this[0]);
		}

		// set variables
		let len = this.length,
			i = 0,
			node = $(html).eq(0).clone(true).get(0);

		// insert clone into parent
		this[0].parentNode.insertBefore(node, null);

		// find innermost child of node
		while (node.firstElementChild) {
			node = node.firstElementChild;
		}

		// attach nodes to the new node
		for (; i < len; i++) {
			node.appendChild(this[i]);
		}
	}
	return this;
};

Object.defineProperty(Dabby.prototype, "wrapAll", {value: wrapall});