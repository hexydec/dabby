$.fn.unwrap = function (selector) {
	this.parent(selector).not("body").each(function () {
		const item = this,
			parent = item.parentNode;

		$(item.children).each((i, node) => {
			parent.insertBefore(node, item);
		});
		parent.removeChild(item);
	});
	return this;
};
