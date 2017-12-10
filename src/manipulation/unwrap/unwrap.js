$.fn.unwrap = function (selector) {
	return this.parent(selector).not("body").each(function () {
		var item = this,
			parent = item.parentNode;

		$(item.childNodes).each((i, node) => {
			parent.insertBefore(node, item);
		});
		return $(parent.removeChild(item));
	});
};
