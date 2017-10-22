$.fn.is = function (selector) {
	return filterNodes.call(this, selector).length > 0;
};
