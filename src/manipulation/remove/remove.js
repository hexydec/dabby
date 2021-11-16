import $ from "../../core/core.js";
import filterNodes from "../../internal/filternodes/filternodes.js";

["remove", "detach"].forEach((func, f) => {
	$.fn[func] = function (selector) {
		let i = this.length,
			nodes = [],
			obj = [];

		// detach selected nodes
		while (i--) {
			if (!selector || filterNodes(this[i], selector).length) {
				nodes.push(this[i].parentNode.removeChild(this[i]));
			}
		}

		// create a new dabby object to return
		return f ? $(nodes) : this;
	};
});
