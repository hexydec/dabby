import $, {Dabby} from "../../core/dabby/dabby.js";
import "../../core/get/get.js";

/**
 * Wraps all elements in the collection with the supplied HTML, if there are multiple nodes, the first element will wrap the items
 * 
 * @memberof Dabby#
 * @function add
 * @type {{
 * 	(nodes:selector) => Dabby;
* 	(selector:string, context:selector) => Dabby;
 * }}
 * @param {selector} nodes An HTML string, Node, array of Nodes or function that returns HTML
 * @param {selector} context An HTML string, Node, array of Nodes or function that returns HTML indicating where a selector should start matching
 * @returns {Dabby} A new Dabby collection containing all the nodes from the input collection plus the nodes that were added
 */
const add = function (nodes, context) {
	nodes = $(nodes, context).get();
	return $(Array.from(this).concat(nodes));
};

Object.defineProperty(Dabby.prototype, "add", {value: add});
