import $ from "../../core/core.js";
import "../../utils/isfunction/isfunction.js";
import "../ajax/ajax.js";
import "../../traversal/filter/filter.js";
import "../../utils/parsehtml/parsehtml.js";

$.fn.load = function (url, data, success) {
	if (this[0]) {

		// get selector from URL
		url = url.split(" ", 2);
		const uri = url[0],
			selector = url[1];

		// check for data
		if ($.isFunction(data)) {
			success = data;
			data = undefined;
		}

		// make AJAX request
		$.ajax(uri, {
			data: data,
			type: data instanceof Object ? "POST" : "GET",
			success: (response, status, xhr) => {

				// if a selector is specified, find it in the returned document
				let html = "",
					i = this.length;

				// refine by selector if supplied
				if (selector) {
					html = $(response, this[0].ownerDocument).filter(selector);
				} else {
					html = response;
				}

				// set HTML to nodes in collection
				this.append(html);

					// fire success callback on nodes
				if (success) {
					while (i--) {
						success.call(this[i], response, status, xhr);
					}
				}
			}
		})
	}
	return this;
};
