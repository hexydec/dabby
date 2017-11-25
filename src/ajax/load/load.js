$.fn.load = function (url, data, success) {
	var self = this;
	if (self[0]) {
		$.ajax(url, {
			data: data,
			type: data instanceof Object ? "POST" : "GET",
			success: function (response) {

				// set HTML to nodes in collection
				self.html(response);

				// fire success callback on nodes
				if (success) {
					self.each(success);
				}
			}
		})
	}
	return self;
};
