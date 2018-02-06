$.fn.has = function (selector) {
	return $(this.get().filter(node => {
		return $(selector, node).length > 0;
	}));
};
