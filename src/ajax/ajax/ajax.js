$.ajax = function (url, settings) {

	// normalise args
	if (typeof url === "object") {
		settings = url;
	} else {
		if (typeof settings !== "object") {
			settings = {};
		}
		settings.url = url;
	}

	// set default settings
	settings = $.extend({
		method: "GET",
		cache: null, // start will null so we can see if explicitly set
		data: null,
		dataType: null, // only changes behavior with json, jsonp, script
		processData: true,
		async: true,
		crossDomain: false,
		scriptCharset: null,
		jsonp: "callback",
		jsonpCallback: "dabby" + Date.now(),
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
	if (!settings.dataType && settings.url.substr(-3) === ".js") {
		settings.dataType = "script";
	}

	let sync = ["script", "jsonp"].includes(settings.dataType),
		script, xhr;

	// add cache buster
	if (settings.cache || (settings.cache === null && sync)) {
		settings.url += (settings.url.includes("?") ? "&" : "?") + "_=" + (+new Date());
	}

	// add data to query string
	if (settings.data && settings.processData) {
		settings.url += (settings.url.includes("?") ? "&" : "?") + $.param(settings.data);
	}

	// fetch script
	if (sync || settings.crossDomain) {
		script = document.createElement("script");
		if (settings.scriptCharset) {
			script.charset = settings.scriptCharset;
		}

		// add callback parameter
		if (settings.dataType === "jsonp") {
			settings.url += (settings.url.includes("?") ? "&" : "?") + settings.jsonp + "=" + settings.jsonpCallback;
		}

		// setup event callbacks
		$.each({
			load: "success",
			error: "error"
		}, function (key, value) {
			script.addEventListener(key, function () {
				var response = settings.dataType === "jsonp" ? window[settings.jsonpCallback] || null : null;
				[value, "complete"].forEach(function (name) {
					if (settings[name]) {
						settings[name].call(settings.context, response, value === "success" ? 200 : 400);
					}
				});
			});
		});

		script.src = settings.url;
		document.head.appendChild(script);

	// make xhr request
	} else {

		// create XHR object
		xhr = new XMLHttpRequest();
		xhr.open(settings.method, settings.url, settings.async);

		// add authoisation header
		if (settings.username) {
			settings.headers.Authorization = btoa(settings.username + ":" + settings.password);
		}

		// headers
		$.each(settings.headers, function (key, value) {
			xhr.setRequestHeader(key, value);
		});

		// callbacks
		xhr.onreadystatechange = function () {
			if (this.readyState === 4) {
				const type = this.status === 200 ? "success" : "error";
				let response = xhr.responseText,
					callbacks = [];

				// parse JSON
				if (["json", null].includes(settings.dataType)) {
					try {
						response = JSON.parse(response);
					} catch (e) {
						// do nothing
					}
				}

				// run callbacks
				[settings.statusCode[xhr.status], settings[type], settings.complete].forEach(function (callback) {
					if (callback) {
						callback.call(settings.context, response, xhr.status, xhr);
					}
				});
			}
		};
		xhr.send(settings.processData ? undefined : settings.data);
		return xhr;
	}
};
