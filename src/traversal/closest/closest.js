import $ from "../../core/core.js";
import filterNodes from "../../internal/filternodes/filternodes.js";

$.fn.closest = function (selector, context) {
	let i = this.length,
		nodes = [];

	while (i--) {
		let node = this[i];
		while (node && node.nodeType === Node.ELEMENT_NODE) {
			if (filterNodes(node, selector, context).length) {
				nodes.unshift(node);
				break;
			}
			node = node.parentNode;
		}
	}
	return $(nodes);
};
