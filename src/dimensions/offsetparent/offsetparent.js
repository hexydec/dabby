$.fn.offsetParent = function (coords) {
	return $(this[0] ? this[0].offsetParent : null);
};