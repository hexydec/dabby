$.fn.serialize = function () {
	const selector = "input[name]:not([type=file]):not([type=submit]),textarea[name],select[name]",
		obj = this.is(selector) ? this.filter(selector) : $(selector, this);

	let params = {};

	// process values
	obj.each(function () {
		const value = $(this).val();
		if (!this.disabled && value !== undefined) {
			params[this.getAttribute("name")] = value;
		}
	});
	return $.param(params);
};
