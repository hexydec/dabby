$.fn.load = function (url, data, complete) {
	if (this[0]) {
		this.html($.ajax(url, {
			data: data,
			type: data instanceof Object ? "POST" : "GET"
		}));
		if (complete) {
			this.each(complete);
		}
	}
	return this;
};
