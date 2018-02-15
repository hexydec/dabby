$.fn.has = function (selector) {
	return $(this.get().filter(node => !!$(selector, node).length));
};
