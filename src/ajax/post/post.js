$.get = function (url, data, success, type) {
	var isFunc = $.isFunction(data),
		settings = typeof(url) === "object" ? url : {
			url: url,
			data: isFunc ? {} : data,
			success: isFunc ? data : success,
			dataType: isFunc ? success : type
		};
	settings.type = "POST";
	return $.ajax(settings);
};
