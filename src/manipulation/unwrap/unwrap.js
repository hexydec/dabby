$.fn.unwrap = function (selector) {
	return this.parent(selector).not("body").each(function () {
		var item = this,
			parent = item.parentNode;
		[].slice.call(item.childNodes).forEach(function (node) {
			parent.insertBefore(node, item);
		});
		return $(parent.removeChild(item));
	});
};
