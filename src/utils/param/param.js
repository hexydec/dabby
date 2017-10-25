$.param = function (obj) {
	var params = [],
		add = function (key, value, params) {
			if ($.isArray(value)) {
				$.each(value, function (i) {
					params = add(key + "[" + i + "]", this, params);
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
