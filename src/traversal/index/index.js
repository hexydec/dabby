$.fn.index = function (selector) {
	let index = -1;

	if (this[0]) {
		let nodes,
			subject = this[0],
			type = typeof selector,
			i;

		// if no selector, match against first elements siblings
		if (type === "undefined") {
			nodes = this[0].parentNode.children;

		// if selector is string, match first node in current collection against resulting collection
		} else if (type === "string") {
			nodes = $(selector);

		// if element or collection match the element or first node against current collection
		} else {
			nodes = this;
			subject = $(selector)[0];
		}

		i = nodes.length;
		while (i--) {
			if (nodes[i].isSameNode(subject)) {
				return i;
			}
		}
	}
	return index;
};
