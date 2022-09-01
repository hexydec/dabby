import $ from "../../core/dabby/dabby";
import filterNodes from "../../internal/filternodes/filternodes.js";

["is", "filter", "not"].forEach((func, f) => {
	$.fn[func] = function (selector) {
		const nodes = filterNodes(this, selector, f > 1); // "not"
		return f ? $(nodes) : !!nodes.length; // not "is" : "is"
	};
});
