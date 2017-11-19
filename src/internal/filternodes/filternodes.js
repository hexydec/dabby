function filterNodes(filter, not) {
	var func, len, nodes = [].slice.call(this);

	// selector
	if (typeof filter === "string") {
		func = function (node) {
			if (node.nodeType === Node.DOCUMENT_NODE) {
				node = node.documentElement;
			}
			return node.matches(filter);
		};

	// function
	} else if ($.isFunction(filter)) {
		func = filter;

	// nodes
	} else {
		if (filter instanceof dabby) {
			filter = filter.get();
		} else if (!$.isArray(filter)) {
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
	return nodes.filter(not ? function (item) {return !func.call(this, item);} : func, nodes);
}
