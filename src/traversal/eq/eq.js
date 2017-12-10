$.fn.eq = function (i) {
	let key = i < 0 ? i + this.length : i;
	return $(this[key] || null);
};
