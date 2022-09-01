import $ from "../../core/dabby/dabby";
import isFunction from "../../internal/isfunction/isfunction.js";
import "../../traversal/eq/eq.js";
import "../../manipulation/clone/clone.js";

$.fn.wrapAll = function (html: { call: (arg0: any) => any; }) {
	if (this[0]) {
		if (isFunction(html)) {
			html = html.call(this[0]);
		}

		// set variables
		let len = this.length,
			i = 0,
			node = $(html).eq(0).clone(true).get(0);

		// insert clone into parent
		this[0].parentNode.insertBefore(node, null);

		// find innermost child of node
		while (node.firstElementChild) {
			node = node.firstElementChild;
		}

		// attach nodes to the new node
		for (; i < len; i++) {
			node.appendChild(this[i]);
		}
	}
	return this;
}
