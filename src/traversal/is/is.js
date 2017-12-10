$.fn.is = function (selector) {
	return filterNodes(this, selector).length !== 0;
};
