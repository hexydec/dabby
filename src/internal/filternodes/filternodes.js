function filterNodes(dabby, filter, not) {
	let func,
		nodes = Array.from(dabby);

	// function
	if ($.isFunction(filter)) {
		func = filter;

	// nodes
	} else {
		filter = $(filter).get();
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
