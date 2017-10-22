["", "s"].forEach(function (suffix) {
	$.fn["parent" + suffix] = function (selector) {
		var nodes = [],
			i = this.length,
			node,
			parent;

		while (i--) {
			node = this[i];
			while (node.parentNode) {
				parent = node.parentNode;
				if (!selector || filterNodes.call(parent, selector) > 0) {
					nodes.push(parent);
				}
				if (!suffix) {
					break;
				}
				node = parent;
			}
		}
		return $(nodes);
	}
});
