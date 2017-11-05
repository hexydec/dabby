$.fn.unwrap = function (selector) {
	return this.parent(selector).not("body").each(function () {
		var item = this,
			parent = item.parentNode;
		[].slice.call(this.childNodes, function (node) {
			parent.insertBefore(node, item);
		});
		parent.remove();
	});
};
