$.fn.each = function (callback) {
	$.each([].slice.call(this), callback);
	return this;
};
