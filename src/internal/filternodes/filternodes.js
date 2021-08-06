import $ from "../../core/core.js";
import "../../core/get/get.js";
import isFunction from "../../internal/isfunction/isfunction.js";

export default (dabby, filter, context, not) => {
	let func,
		nodes = dabby.nodeType ? [dabby] : Array.from(dabby);

	// sort out args
	if (typeof context === "boolean") {
		not = context;
		context = null;
	}

	// custom filter function
	if (isFunction(filter)) {
		func = filter;

	// nodes
	} else {

		// normalise filters
		if (typeof filter === "string") {
			filter = [filter];
		} else {
			filter = $(filter, context).get();
		}

		// default filter function
		func = (n, node) => {
			let i = filter.length;
			while (i--) {
				if (typeof(filter[i]) === "string" && node.matches ? node.matches(filter[i]) : node === filter[i]) {
					return true;
				}
			}
			return false;
		};
	}
	return nodes.filter((item, i) => func.call(item, i, item) === !not, nodes);
}
