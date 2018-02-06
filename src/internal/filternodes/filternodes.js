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
		filter = Array.from($(filter, context));
		func = node => {
			let i = filter.length;
			while (i--) {
				if (node.isSameNode(filter[i])) {
					return true;
				}
			}
			return false;
		};
	}
	return nodes.filter(not ? function (item) {return !func.call(this, item);} : func, nodes);
}
