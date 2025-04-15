import $, {Dabby} from "../../core/dabby/dabby.js";
import getVal from "../../internal/getval/getval.js";
import "../wrapall/wrapall.js";

/**
 * Wraps each item in the collection with the supplied nodes
 * 
 * @memberof Dabby#
 * @function wrap
 * @param {selector} html A selector, HTML string, Node, array of Nodes, Dabby collection or a callback function
 * @returns {Dabby} The original Dabby collection
 */
const wrap = function (html) {
	let i = this.length,
		values = getVal(this, html);

	while (i--) {
		$(this[i]).wrapAll(values[i]);
	}
	return this;
};

Object.defineProperty(Dabby.prototype, "wrap", {value: wrap});