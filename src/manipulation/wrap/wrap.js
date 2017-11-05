$.fn.wrapAll = function (html) {
	if (this[0]) {
		var len = this.length,
			i = 0,
			node = $(html).get(0).cloneNode(true);

		// insert clone into parent
		this[0].parentNode.insertBefore(node, null);

		// find innermost child of node
		while (node.firstElementChild) {
			node = node.firstElementChild;
		}

		// attach nodes to the new node
		for (; i < len; i++) {
			node.appendChild(this[i]);
		}
	}
	return this;
}

$.fn.wrap = function (html) {
	var i = this.length;
	while (i--) {
		$(this[i]).wrapAll(html);
	}
	return this;
}
