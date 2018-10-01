import $ from "../../core/core.js";
import filterNodes from "../../internal/filternodes/filternodes.js";

["filter", "not", "is"].forEach(name => {
	$.fn[name] = function (selector) {
		const nodes = filterNodes(this, selector, name === "not");
		return name === "is" ? !!nodes.length : $(nodes);
	};
});
