import $ from "../../core/dabby/dabby.js";
import "../../events/off/off.js";
import filterNodes from "../../internal/filternodes/filternodes.js";

["detach", "remove"].forEach((func, f) => {
	$.fn[func] = function (selector) {
		let i = this.length,
			nodes = [];

		// detach selected nodes
		while (i--) {
			if (!selector || filterNodes(this[i], selector).length) {

				// remove data from removed nodes
				if (f) {
					$(this[i]).off();
				}
				nodes.push(this[i].parentNode ? this[i].parentNode.removeChild(this[i]) : this[i]); // only remove it attached to something
			}
		}

		// create a new dabby object to return
		return f ? this : $(nodes);
	};
});
