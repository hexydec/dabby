define(["core"], function ($) {
	$.ajax = function (url, settings) {
		var timestamp = "_=" + (+new Date());
		if (typeof url === "object") {
			settings = url;
		} else {
			settings = {url: url};
		}
		if (typeof settings === "function") {
			settings = {success: settings};
		}
		settings = $.extend({
			method: "GET",
			cache: true,
			success: function () {}
		}, settings);
		
		xhr = new XMLHttpRequest();
		if (xhr) {
			if (!settings.cache) {
				settings.url += (settings.url.indexOf("?") > -1 ? "&" : "?") + timestamp;
			}
			xhr.open(settings.method, settings.url, true);
			xhr.onreadystatechange = function () {
				if (this.readyState === 4 && this.status === 200) {
					settings.success(xhr.responseText, xhr.status, xhr);
				}
			};
			xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			if ($.inArray(settings.method, ["POST", "PUT"])) {
				xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			}
			xhr.send();
		}
		return xhr;
	};
});