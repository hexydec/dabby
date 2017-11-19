$.fn.has = function (selector) {
	return $([].filter.call(this, function (node) {
		return $(selector, node).length !== 0;
	}));
};
