import $, {Dabby} from "../../core/dabby/dabby.js";
import "../core/get/get.js";

/**
 * Reduce the input collection to those that match the input selector
 * 
 * @memberof Dabby#
 * @function has
* @param {selector} selector A optional selector, HTML string, Node, array of Nodes, Dabby collection or a callback function to filter the collection by
 * @returns {Dabby} A new Dabby collection containing the nodes in the original collection that have descendants matching the selector
 */
const has = function (selector) {
	const compare = $(selector).get();
	return $(Array.from(this).filter(node => compare.some(item => node.contains(item))));
};
Object.defineProperty(Dabby.prototype, "has", {value: has});
