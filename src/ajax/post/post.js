$.get = function (url, data, success, type) {
	var isFunc = typeof(data) === "function",
		settings = typeof(url) === "object" ? url : {
			url: url,
			data: isFunc ? {} : data,
			success: isFunc ? data : success,
			dataType: isFunc ? success : type
		};
	settings.type = "POST";
	return $.ajax(settings);
};
