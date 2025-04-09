import $, {Dabby} from "../../core/dabby/dabby.js";
import getVal from "../../internal/getval/getval.js";
import "../../core/get/get.js";
import "../../manipulation/clone/clone.js";

const factory = (obj, html, all) => {
	let source = (all ? $(html) : obj).get(),
		target = (all ? obj : $(html)).get(),
		isFunc = typeof target === "function",
		i = source.length;

	if (!isFunc) {
		target = $(target);
	}

	while (i--) {
		let n = target.length,
			parent = source[i].parentNode;
		while (n--) {
			const replace = isFunc ? getVal(target[n], n, target[n]) : target[n];
			if (n) {
				source[i].insertAdjacentElement("beforebegin", $(replace).clone(true).get(0));
			} else {
				source[i] = parent.replaceChild(i ? $(replace).clone(true).get(0) : replace, source[i]);
			}
		}
	}
	return $(source);
};

/**
 * Removes some or all of the items in the collection from the DOM
 * 
 * @memberof Dabby#
 * @function replaceWith
 * @param {(string|Node|Node[]|Dabby|function)} html An HTML string, Node, array of Nodes or function that returns HTML
 * @returns {Dabby} The original Dabby collection
 */
const replaceWith = function (html) {
	return factory(this, html, false);
}
Object.defineProperty(Dabby.prototype, "replaceWith", {value: replaceWith});

/**
 * Removes some or all of the items in the collection from the DOM
 * 
 * @memberof Dabby#
 * @function replaceAll
 * @param {selector} html An HTML string, Node, array of Nodes or function that returns HTML
 * @returns {Dabby} The original Dabby collection
 */
const replaceAll = function (html) {
	return factory(this, html, true);
}
Object.defineProperty(Dabby.prototype, "replaceAll", {value: replaceAll});