["get", "post"].forEach(name => {
	$[name] = (url, data, success, type) => {
		const isFunc = $.isFunction(data);
		let settings = typeof(url) === "object" ? url : {
			url: url,
			data: isFunc ? {} : data,
			success: isFunc ? data : success,
			dataType: isFunc ? success : type
		};
		settings.method = name.toUpperCase();
		return $.ajax(settings);
	};
});
