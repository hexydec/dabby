import $, {Dabby} from "../../core/dabby/dabby.js";
import "../insert/insert.js";

function factory(func, obj, selector) {
	$(selector)[func](obj);
	return obj;
}

/**
 * Add nodes before each object in a Dabby collection
 * 
 * @memberof Dabby#
 * @function insertBefore
 * @param {selector} [selector] A string specifying a CSS selector, a node, an array of nodes, a document, or a Dabby collection to attach the current Dabby collection to
 * @returns {Dabby} The original dabby collection
 */
const insertBefore = function (selector) {
	return factory("before", this, selector);
};
Object.defineProperty(Dabby.prototype, "insertBefore", {value: insertBefore});

/**
 * Prepend nodes to each object in a Dabby collection
 * 
 * @memberof Dabby#
 * @function prependTo
 * @param {selector} [selector] A string specifying a CSS selector, a node, an array of nodes, a document, or a Dabby collection to attach the current Dabby collection to
 * @returns {Dabby} The original dabby collection
 */
const prependTo = function (selector) {
	return factory("prepend", this, selector);
};
Object.defineProperty(Dabby.prototype, "prependTo", {value: prependTo});

/**
 * Append nodes to each object in a Dabby collection
 * 
 * @memberof Dabby#
 * @function appendTo
 * @param {selector} [selector] A string specifying a CSS selector, a node, an array of nodes, a document, or a Dabby collection to attach the current Dabby collection to
 * @returns {Dabby} The original dabby collection
 */
const appendTo = function (selector) {
	return factory("append", this, selector);
};
Object.defineProperty(Dabby.prototype, "appendTo", {value: appendTo});

/**
 * Add nodes after each object in a Dabby collection
 * 
 * @memberof Dabby#
 * @function insertAfter
 * @param {selector} [selector] A string specifying a CSS selector, a node, an array of nodes, a document, or a Dabby collection to attach the current Dabby collection to
 * @returns {Dabby} The original dabby collection
 */
const insertAfter = function (selector) {
	return factory("after", this, selector);
};
Object.defineProperty(Dabby.prototype, "insertAfter", {value: insertAfter});