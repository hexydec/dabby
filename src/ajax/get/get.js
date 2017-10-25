$.fn.get = function (url, data, complete, type) {
	// needs work fo sho
	
	return $.ajax({
		url: url,
		data: data,
		complete: complete,
		type: type
	});
};
