$.fn.serialize = function () {
	var params = {},
		selector = "input[name][type!=file][type!=submit],textarea[name],select[name]",
		obj = this.is(selector) ? this :$(selector, this);

	// proecss values
	obj.each(function () {
		params[this.getAttribute("name")] = $(this).val();
	});
	return $.params(params);
};