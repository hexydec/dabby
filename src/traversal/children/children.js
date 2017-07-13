$.fn.children = function (selector) {
	var nodes = [],
		children,
		i = this.length;

	while (i--) {
		children = this[i].children;
		if (selector) {
			children = [].filter.call(children, function (node) {
				return node.matches(selector);
			});
		}
		nodes.concat(children);
	}
	return $(nodes);
};