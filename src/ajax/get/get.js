$.get = function (url, data, success, type) {
	var isFunc = typeof(data) === "function";
	return $.ajax(typeof(url) === "object" ? url : {
		url: url,
		data: isFunc ? {} : data,
		success: isFunc ? data : success,
		dataType: isFunc ? success : type
	});
};
