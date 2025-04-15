import $, {Dabby} from "../../core/dabby/dabby.js";
import "../../traversal/parents/parents.js";
import "../../traversal/filter/filter.js";
import "../../core/each/each.js";

/**
 * Removes the parents of some or all the items in the collection
 * 
 * @memberof Dabby#
 * @function unwrap
 * @type {{
* 	(selector:selector) => Dabby;
* 	() => Dabby;
* }}
* @param {selector} selector A optional selector, HTML string, Node, array of Nodes, Dabby collection or a callback function to match the parent
 * @returns {Dabby} The original Dabby collection
 */
const unwrap = function (selector) {
	this.parent(selector).not("body").each((key, obj) => {
		$(obj.children).each((i, node) => {
			obj.parentNode.insertBefore(node, obj);
		});
		obj.parentNode.removeChild(obj);
	});
	return this;
};
Object.defineProperty(Dabby.prototype, "unwrap", {value: unwrap});
