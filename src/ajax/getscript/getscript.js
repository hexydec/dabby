$.getScript = (url, success) => $.ajax({
	url: url,
	dataType: "script",
	success: success
});
