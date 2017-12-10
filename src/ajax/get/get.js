$.get = (url, data, success, type) => {
	const isFunc = data && $.isFunction(data);
	return $.ajax(typeof(url) === "object" ? url : {
		url: url,
		data: isFunc ? {} : data,
		success: isFunc ? data : success,
		dataType: isFunc ? success : type
	});
};
