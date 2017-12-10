$.get = (url, data, success, type) => {
	const isFunc = $.isFunction(data);
	let settings = typeof(url) === "object" ? url : {
		url: url,
		data: isFunc ? {} : data,
		success: isFunc ? data : success,
		dataType: isFunc ? success : type
	};
	settings.type = "POST";
	return $.ajax(settings);
};
