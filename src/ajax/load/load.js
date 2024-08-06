import $, {Dabby} from "../../core/dabby/dabby.js";
import "../ajax/ajax.js";
import "../../traversal/filter/filter.js";
import "../../manipulation/insert/insert.js";

/**
 * Append the result of an XHR request into each item in a Dabby collection
 * 
 * @type {{
* 	(url:string, data:string|PlainObject, success:xhrCallback) => xhr
* 	(url:string, success:xhrCallback) => xhr
* 	(url:string) => xhr
 * }}
 * @param {string|xhrCallback} url A string containing the URL to get data from
 * @param {string|PlainObject} [data] A plain object or string that is sent to the server with the request as GET parameters
 * @param {xhrCallback} [success] A callback to be called when the request succeeds
 * @returns {Dabby} The original Dabby collection
 */

const load = function (url, data, success) {
	if (this[0]) {

		// get selector from URL
		url = url.split(" ", 2);
		const uri = url[0],
			selector = url[1];

		// check for data
		if (typeof data === "function") {
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

Object.defineProperty(Dabby.prototype, "load", {value: load});