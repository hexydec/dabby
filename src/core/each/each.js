$.fn.each = function (callback) {
	$.each(Array.from(this), callback);
	return this;
};
