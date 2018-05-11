$.ajax = (url, settings) => {

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
	if (!settings.dataType && /\.js($|\?)/.test(settings.url)) {
		settings.dataType = "script";
	}

	let sync = ["script", "jsonp"].indexOf(settings.dataType) > -1,
		script, xhr, data;

	// add data to query string
	if (settings.data) {
		data = typeof settings.data === "string" ? settings.data : $.param(settings.data);
	}
	if (data && settings.method === "GET") {
		settings.url += (settings.url.indexOf("?") > -1 ? "&" : "?") + data;
	}

	// add cache buster
	if (settings.cache || (settings.cache === null && sync)) {
		settings.url += (settings.url.indexOf("?") > -1 ? "&" : "?") + "_=" + (+new Date());
	}

	// fetch script
	if (sync || settings.crossDomain) {
		script = document.createElement("script");
		if (settings.scriptCharset) {
			script.charset = settings.scriptCharset;
		}

		// add callback parameter
		if (settings.dataType === "jsonp") {
			settings.url += (settings.url.indexOf("?") > -1 ? "&" : "?") + settings.jsonp + "=" + settings.jsonpCallback;
		}

		// setup event callbacks
		$.each({
			load: "success",
			error: "error"
		}, (key, value) => {
			script.addEventListener(key, () => {
				let response = settings.dataType === "jsonp" ? window[settings.jsonpCallback] || null : null;
				[settings[value], settings.complete].forEach(callback => {
					if (callback) {
						callback.apply(settings.context, callback === settings.complete ? [null, value] : [response, value]);
					}
				});
			}, {once: true});
		});

		script.src = settings.url;
		script.async = settings.async;
		document.head.appendChild(script);

	// make xhr request
	} else {
		const callback = (xhr, status) => {
			let response = xhr.responseText,
				callbacks = [];

			// parse JSON
			if (["json", null].indexOf(settings.dataType) > -1) {
				try {
					response = JSON.parse(response);
				} catch (e) {
					// do nothing
				}
			}

			// run callbacks
			[settings.statusCode[xhr.status], settings[status], settings.complete].forEach(callback => {
				if (callback) {
					callback.apply(settings.context, callback === settings.complete ? [xhr, status] : [response, status, xhr]);
				}
			});
		};

		// create XHR object
		xhr = new XMLHttpRequest();
		xhr.open(settings.method, settings.url, settings.async);

		// add authoisation header
		if (settings.username) {
			settings.headers.Authorization = btoa(settings.username + ":" + settings.password);
		}

		// headers
		$.each(settings.headers, (key, value) => {
			xhr.setRequestHeader(key, value);
		});

		// callbacks
		xhr.onload = () => {
			const types = {
				200: "success",
				204: "nocontent",
				304: "notmodified"
			};
			callback(xhr, types[xhr.status] || "error");
		};
		xhr.ontimeout = () => {
			callback(xhr, "timeout");
		};
		xhr.onabort = () => {
			callback(xhr, "abort");
		};
		xhr.send(settings.method === "GET" ? null : data);
		return xhr;
	}
};
