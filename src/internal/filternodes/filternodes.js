function filterNodes(dabby, filter, context, not) {
	let func,
		nodes = Array.from(dabby);

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
		func = node => {
			let i = filter.length;
			while (i--) {
				if (node[typeof(filter[i]) === "string" ? "matches" : "isSameNode"](filter[i])) {
					return true;
				}
			}
			return false;
		};
	}
	return nodes.filter(not ? function (item) {return !func.call(this, item);} : func, nodes);
}
