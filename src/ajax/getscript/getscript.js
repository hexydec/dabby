$.getScript = function (url, success) {
	return $.ajax({
		url: url,
		dataType: "script",
		success: success
	});
};
