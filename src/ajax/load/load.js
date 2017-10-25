$.fn.load = function (url, data, complete) {
	if (this[0]) {
		var obj = this;
		$.ajax(url, {
			data: data,
			method: data instanceof Object ? "POST" : "GET",
			complete: function (html, status, xhr) {
				complete.call(this, html, status, xhr);
				obj.html(html);
			}
		});
	}
	return this;
};
