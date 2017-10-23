["", "s"].forEach(function (suffix) {
	$.fn["parent" + suffix] = function (selector) {
		var nodes = [],
			i = this.length,
			parent;

		while (i--) {
			parent = this[i].parentNode;
			while (parent) {
				nodes.push(parent);
				if (!suffix) {
					break;
				}
				parent = parent.parentNode;
			}
		}
		if (selector) {
			nodes = filterNodes.call(nodes, selector);
		}
		return $(nodes);
	}
});
