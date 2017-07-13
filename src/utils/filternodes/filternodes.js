function filterNodes(filter, not) {
	var func, len;

	// selector
	if (typeof filter === "string") {
		func = function (node) {
			return node.matches(filter);
		};

	// function
	} else if (filter.constructor === Function) {
		func = filter;

	// nodes
	} else {
		if (![].isArray(filter)) {
			filter = [filter];
		}
		len = filter.length;
		func = function (node) {
			var i = len;
			while (i--) {
				if (node.isSameNode(filter[i])) {
					return true;
				}
			}
			return false;
		};
	}
	return $([].filter(not ? function (item) {return !func(item);} : func));
}