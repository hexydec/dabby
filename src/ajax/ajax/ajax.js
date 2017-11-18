$.ajax = function (url, settings) {

	// normalise args
	if (typeof url === "object") {
		settings = url;
	} else {
		settings = {url: url};
	}

	// settings is success function
	if ($.isFunction(settings)) {
		settings = {success: settings};
	}

	// set default settings
	settings = $.extend({
		method: "GET",
		cache: null, // start will null so we can see if explicitly set
		data: null,
		dataType: null,
		processData: true,
		async: true,
		crossDomain: false,
		scriptCharset: null,
		jsonp: "callback",
		jsonpCallback: "dabby".time(),
		headers: {
			"X-Requested-With": "XMLHttpRequest",
			"Content-Type": settings.contentType || "application/x-www-form-urlencoded; charset=UTF-8"
		},
		context: null,
		statusCode: {},
		username: null,
		password: null
	}, settings);

	// determine datatype
	if (!settings.dataType) {
		if (settings.url.substr(-3) === ".js") {
			settings.dataType = "script";
		}
	}

	var sync = ["script", "jsonp"].indexOf(settings.dataType) > -1;

	// add cache buster
	if (settings.cache === true || (settings.cache === null && sync)) {
		settings.url += (settings.url.indexOf("?") > -1 ? "&" : "?") + "_=" + (+new Date());
	}

	// add data to query string
	if (settings.data && settings.processData) {
		settings.url += (settings.url.indexOf("?") > -1 ? "&" : "?") + $.param(settings.data);
	}

	// fetch script
	if (sync || settings.crossDomain) {
		var script = document.createElement("script"),
			events = {
				load: "success",
				error: "error"
			},
			callback;

		// add callback parameter
		if (settings.dataType === "jsonp") {
			settings.url += (settings.url.indexOf("?") > -1 ? "&" : "?") + settings.jsonp + "=" + jsonpCallback;
		}

		// setup event callbacks
		$.each(events, function (key, value) {
			script.addEventListener(key, function () {
				var response = callback ? callback() : "";
				[value, "complete"].forEach(function (name) {
					if (settings[name]) {
						var func = $.isArray(settings[name]) ? settings[name] : [settings[name]];
						func.call(settings.context, response, 200);
					}
				});
			});
		});

		script.src = settings.url;
		if (settings.scriptCharset) {
			script.charset = settings.charset;
		}
		document.head.appendChild(script);

	// make xhr request
	} else {

		// create XHR object
		var xhr = new XMLHttpRequest();
		xhr.open(settings.method, settings.url, settings.async);

		// add authoisation header
		if (settings.username) {
			settings.headers.authorization = btoa(settings.username + ":" + settings.password);
		}

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

				// success/error callback
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
		xhr.send(settings.processData ? undefined : settings.data);
		return xhr;
	}
};
