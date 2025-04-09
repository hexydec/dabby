import $, {Dabby} from "../../core/dabby/dabby.js";
import filterNodes from "../../internal/filternodes/filternodes.js";

/**
 * Retrieves the children from some or all items in the collection
 * 
 * @memberof Dabby#
 * @function children
 * @type {{
 * 	(selector:string) => Dabby;
 * 	() => Dabby;
 * }}
 * @param {string} selector An optional CSS selector to filter the collection by
 * @returns {Dabby} A new Dabby collection containing the matched children
 */
const children = function (selector) {
	let nodes = [],
		i = this.length;

	while (i--) {
		nodes = [...nodes, ...this[i].children];
	}

	// filter nodes by selector
	return $(selector ? filterNodes(nodes, selector) : nodes);
};

Object.defineProperty(Dabby.prototype, "children", {value: children});
