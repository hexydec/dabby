$.fn.load = function (url, data, success) {
	var self = this,
		parts;
	if (self[0]) {

		// get selector from URL
		parts = url.split(" ", 2);

		// check for data
		if ($.isFunction(data)) {
			success = data;
			data = undefined;
		}

		// make AJAX request
		$.ajax(parts[0], {
			data: data,
			type: data instanceof Object ? "POST" : "GET",
			success: function (response, status, xhr) {

				// if a selector is specified, find it in the returned document
				var html = "",
					i = self.length;

				// refine by selector if supplied
				if (parts[1]) {
					$(response).filter(parts[1]).each(function () {
						html += this.innerHTML;
					});
				} else {
					html = response;
				}

				// set HTML to nodes in collection
				while (i--) {
					self[i].innerHTML = response;
				}

				// fire success callback on nodes
				if (success) {
					success(response, status, xhr);
				}
			}
		})
	}
	return self;
};
