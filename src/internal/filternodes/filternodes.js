function filterNodes(dabby, filter, context, not) {
	let func,
		nodes = dabby.nodeType ? [dabby] : Array.from(dabby);

	// sort out args
	if (typeof context === "boolean") {
		not = context;
		context = null;
	}

	// function
	if ($.isFunction(filter)) {
		func = filter;

	// nodes
	} else {

		// normalise filters
		if (typeof(filter) === "string") {
			filter = [filter];
		} else {
			filter = Array.from($(filter, context));
		}

		// filter function
		func = (n, node) => {
			let i = filter.length;
			while (i--) {
				if (node[typeof(filter[i]) === "string" ? "matches" : "isSameNode"](filter[i])) {
					return true;
				}
			}
			return false;
		};
	}
	return nodes.filter((item, i) => func.call(item, i, item) !== Boolean(not), nodes);
}
