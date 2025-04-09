import $, {Dabby} from "../../core/dabby/dabby.js";
import filterNodes from "../../internal/filternodes/filternodes.js";

/**
 * Find the closest parent matching a selector for each item in the collection
 * 
 * @memberof Dabby#
 * @function closest
 * @type {{
 * 	(selector:string) => Dabby;
* 	(selector:string, context:selector) => Dabby;
 * }}
* @param {string} selector An optional CSS selector to filter the collection by
 * @param {selector} context An HTML string, Node, array of Nodes or function that returns HTML indicating where a selector should start matching
 * @returns {Dabby} A new Dabby collection containing the matching parents
 */
const closest = function (selector, context) {
	let i = this.length,
		nodes = [];

	while (i--) {
		let node = this[i];
		while (node && node.nodeType === 1) { // Node.ELEMENT_NODE
			if (filterNodes(node, selector, context).length) {
				nodes.unshift(node);
				break;
			}
			node = node.parentNode;
		}
	}
	return $(nodes);
};

Object.defineProperty(Dabby.prototype, "closest", {value: closest});
