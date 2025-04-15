import $, {Dabby} from "../../core/dabby/dabby.js";
import filterNodes from "../../internal/filternodes/filternodes.js";

/**
 * Retrieve the sliblings of each item in a collection, optionally filtered by a selector
 * 
 * @memberof Dabby#
 * @function siblings
 * @type {{
*  () => Dabby;
* 	(selector:selector) => Dabby;
* }}
 * @param {selector} selector A optional selector, HTML string, Node, array of Nodes, Dabby collection or a callback function to filter the collection by
 * @returns {Dabby} A Dabby collection 
 */
const siblings = function (selector) {
	let i = this.length,
		nodes = [];

	while (i--) {
		[...this[i].parentNode.children].forEach(child => {
			if (child !== this[i]) {
				nodes.push(child);
			}
		});
	}
	return $(selector ? filterNodes(nodes, selector) : nodes);
};
Object.defineProperty(Dabby.prototype, "siblings", {value: siblings});