import $ from "../../core/dabby/dabby.js";
import "../../utils/extend/extend.js";
import "../param/param.js";
import "../../utils/each/each.js";
import isPlainObject from "../../internal/isplainobject/isplainobject.js";

/**
 * @callback xhrCallback
 * @param {string|ArrayBuffer|Blob|Document|object} response The response from the XHR request
 * @param {number} status The status code returned from the XHR request
 * @param {XMLHttpRequest} xhr The XHR object used to make the request
 */

/**
 * @callback completeCallback
 * @param {XMLHttpRequest} xhr The XHR object used to make the request
 * @param {number} status The status code returned from the XHR request
 */

/**
 * @typedef {{
 *		method: ('GET'|'POST'),
 *		cache: boolean|null,
 *		data: null,
 *		dataType: string|object|null,
 *		async: boolean,
 *		crossDomain: boolean,
 *		scriptAttrs: Object.<string, string>,
 *		jsonp: string,
 *		jsonpCallback: string,
 *		headers: Object.<string, string>,
 *		xhr: XMLHttpRequest,
 *		contentType: string|null,
 *		context: null|node|object,
 *		statusCode: Object.<string, xhrCallback>,
 *		username: string|null,
 *		password: string|null,
 *		xhrFields: Object.<string, string>,
 * 		success: xhrCallback,
 * 		error: xhrCallback,
 * 		complete: completeCallback
 * }} settingsObject
 */

/**
 * Make Asynchronous HTTP (AJAX) requests
 * 
 * @type {{
 * 	(url:string, settings:settingsObject) => xhr
* 	(settings:settingsObject) => xhr
 * }}
 * @param {string} url The URL to make a request to
 * @param {settingsObject} settings An object containing settings
 * @returns {xhr|undefined} The XHR object, or undefined if the script was included
 */
const ajax = (url, settings) => {

	// normalise args
	if (url !== null && typeof url === "object") {
		settings = url;
	} else {
		if (typeof settings !== "object") {
			settings = {};
		}
		settings.url = url;
	}

	// set default settings
	settings = Object.assign({ // spread not supported in some older versions of iOS
		method: "GET",
		cache: null, // start with null so we can see if explicitly set
		data: null,
		dataType: null, // only changes behavior with json, jsonp, script
		async: true,
		crossDomain: false,
		scriptAttrs: {},
		jsonp: "callback",
		jsonpCallback: "dabby" + Date.now(),
		headers: {
			"X-Requested-With": "XMLHttpRequest"
		},
		xhr: () => new XMLHttpRequest(),
		contentType: null,
		context: null,
		statusCode: {},
		username: null,
		password: null,
		xhrFields: {},
		success: null,
		error: null,
		complete: null
	}, settings);

	// set to itself
	if (settings.url == null) { // double equals as also captures undefined
		settings.url = location.href;
	}

	// determine datatype
	if (!settings.dataType && settings.url.split("?")[0].split(".").pop() === "js") {
		settings.dataType = "script";
	}

	let sync = ["script", "jsonp"].includes(settings.dataType),
		join = settings.url.includes("?") ? "&" : "?",
		script, data;

	// process data add data to query string for GET requests
	if (settings.data) {
		data = isPlainObject(settings.data) ? $.param(settings.data) : settings.data;

		if (settings.method === "GET") {
			settings.url += join + data;
			join = "&";
			data = null;
		}
	}

	// add cache buster
	if (settings.cache || (settings.cache === null && sync)) {
		settings.url += join + "_=" + (+new Date());
		join = "&";
	}

	// fetch script
	if (sync || settings.crossDomain) {
		script = document.createElement("script");
		$.each(settings.scriptAttrs, (key, item) => {
			script.setAttribute(key, item);
		});

		// add callback parameter
		if (settings.dataType === "jsonp") {
			settings.url += join + settings.jsonp + "=" + settings.jsonpCallback;
		}

		// setup event callbacks
		$.each({
			load: "success",
			error: "error"
		}, (key, value) => {
			script.addEventListener(key, () => {
				const response = settings.dataType === "jsonp" ? window[settings.jsonpCallback] || null : null;
				[settings[value], settings.complete].forEach(callback => {
					if (typeof callback === "function") {
						callback.apply(settings.context || settings, callback === settings.complete ? [null, value] : [response, value]);
					}
				});
			}, {once: true});
		});

		script.src = settings.url;
		script.async = settings.async;
		document.head.appendChild(script);

	// make xhr request
	} else {
		const xhr = settings.xhr(),
			callback = (xhr, type, status) => {
				let response;
				if (xhr.responseType === "blob") {
					response = xhr.response;
				} else {
					response = xhr.responseText;

					// parse JSON
					if (["json", null, undefined].includes(settings.dataType)) {
						try {
							response = JSON.parse(response);
						} catch (e) {
							// do nothing
						}
					}
				}

				// run callbacks
				[settings.statusCode[xhr.status], settings[type], settings.complete].forEach((callback, i) => {
					if (callback) {
						callback.apply(settings.context || settings, i < 2 ? [response, status, xhr] : [xhr, status]);
					}
				});
			};

		// XHR settings
		$.each(settings.xhrFields, (key, value) => xhr[key] = value);

		// callbacks
		xhr.onload = () => {
			const status = [200, 204, 304].includes(xhr.status) ? "success" : "error";
			callback(xhr, status, status);
		};
		xhr.ontimeout = () => {
			callback(xhr, "error", "timeout");
		};
		xhr.onabort = () => {
			callback(xhr, "error", "abort");
		};
		xhr.onerror = () => {
			callback(xhr, "error", "error");
		};

		xhr.open(settings.method, settings.url, settings.async, settings.username, settings.password);

		// add headers
		if (typeof data === "string" && !settings.contentType) {
			settings.contentType = "application/x-www-form-urlencoded; charset=UTF-8";
		}
		if (settings.contentType) {
			settings.headers["Content-Type"] = settings.contentType;
		}
		$.each(settings.headers, (key, value) => {
			xhr.setRequestHeader(key, value);
		});

		// send request
		xhr.send(data);
		return xhr;
	}
};
Object.defineProperty($, "ajax", {value: ajax});