$.fn.serialize = function () {
	const selector = "input[name]:not([type=file]):not([type=submit]),textarea[name],select[name]",
		obj = this.is(selector) ? this.filter(selector) : $(selector, this),
		add = (name, value, params) => {
			let match;

			if ((match = name.match(/([^\[]*)\[([^\]]*)\](.*)/)) !== null) {
				name = match[1];
				let arr = add(match[2] + match[3], value, params[name] || {});
				value = arr;
			}

			if (name !== "") {
				params[name] = value;
			} else {
				if (!$.isArray(params)) {
					params = [];
				}
				params = params.concat($.isArray(value) ? value : [value]);
			}
			return params;
		};
		
	let params = {};

	// process values
	obj.each(function () {
		const value = $(this).val();
		if (!this.disabled && value !== undefined) {
			params = add(this.getAttribute("name"), value, params);
		}
	});
	return $.param(params);
};
