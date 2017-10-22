$.fn.eq = function (i) {
	var key = i < 0 ? i + this.length : i;
	return $(this[key] || undefined);
};
