$.fn.serialize = function () {
	var params = {},
		selector = "input[name]:not([type=file]):not([type=submit]),textarea[name],select[name]",
		obj = this.is(selector) ? this.filter(selector) : $(selector, this),
		value;

	// process values
	obj.each(function () {
		value = $(this).val();
		if (!this.disabled && value !== undefined) {
			params[this.getAttribute("name")] = value;
		}
	});
	return $.param(params);
};
