$.param = obj => {
	let params = [],
		add = (key, value, params) => {
			if ($.isArray(value) || typeof value === "object") {
				$.each(value, (i, val) => {
					params = add(key + "[" + i + "]", val, params);
				});
			} else {
				params.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
			}
			return params;
		};

	// process values
	$.each(obj, function (i) {
		params = add(i, this, params);
	});
	return params.join("&");
};
