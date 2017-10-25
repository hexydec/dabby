$.ajax = function (url, settings) {

	// normalise args
	if (typeof url === "object") {
		settings = url;
	} else {
		settings = {url: url};
	}

	// settings is success function
	if (settings.constructor === Function) {
		settings = {success: settings};
	}

	// set default settings
	settings = $.extend({
		method: "GET",
		cache: true,
		data: null,
		async: true,
		headers: {
			"X-Requested-With": "XMLHttpRequest",
			"Content-Type": settings.contentType || "application/x-www-form-urlencoded; charset=UTF-8"
		},
		context: null,
		statusCode: {}
	}, settings);

	// add cache buster
	if (!settings.cache) {
		settings.url += (settings.url.indexOf("?") > -1 ? "&" : "?") + "_=" + (+new Date());
	}

	// fetch script
	if (settings.dataType === "script" || settings.url.lastIndexOf(".js") === settings.url.length - 3) {
		var script = document.createElement("script"),
			events = {
				load: "success",
				error: "error"
			};

		$.each(events, function (key, value) {
			script.addEventListener(key, function () {
				if (settings[value]) {
					settings[value].apply(settings.context, arguments);
				}
				if (settings.complete) {
					settings.complete.apply(settings.context, arguments);
				}
			});
		});

		script.src = settings.url;
		document.head.appendChild(script);

	// make xhr request
	} else {
		var xhr = new XMLHttpRequest();
		xhr.open(settings.method, settings.url, settings.async);

		// headers
		$.each(settings.headers, function (key, value) {
			xhr.setRequestHeader(key, value);
		});

		// callbacks
		xhr.onreadystatechange = function () {
			if (this.readyState === 4) {
				var response = JSON.parse(xhr.responseText) || xhr.responseText,
					callbacks = [],
					type = this.status === 200 ? "success" : "error";

				// statusCode
				if (settings.statusCode[xhr.status]) {
					callbacks.push(settings.statusCode[xhr.status]);
				}

				// sucess/error callback
				if (settings[type]) {
					callbacks.push(settings[type]);
				}

				// complete callback
				if (settings.complete) {
					callbacks.push(settings.complete);
				}

				// run callbacks
				callbacks.forEach(function (callback) {
					callback.call(settings.context, response, xhr.status, xhr);
				});
			}
		};
		xhr.send(settings.data instanceof Object ? JSON.stringify(settings.data) : settings.data);
		return xhr;
	}
};
