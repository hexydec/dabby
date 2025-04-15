import $, {Dabby} from "../../core/dabby/dabby.js";

/**
 * Find descendants underneath the input collection
 * 
 * @memberof Dabby#
 * @function find
* @param {selector} selector A optional selector, HTML string, Node, array of Nodes, Dabby collection or a callback function to filter the collection by
 * @returns {Dabby} A new Dabby collection containing the matched descendants
 */
const find = function (selector) {
	return $(selector, this);
};
Object.defineProperty(Dabby.prototype, "find", {value: find});
