$.fn.eq = function (i) {
	return $(this[i >= 0 ? i : i + this.length]);
};