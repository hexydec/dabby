import $ from "../../core/dabby/dabby.js";
import isFunction from "../../internal/isfunction/isfunction.js";
import "../ajax/ajax.js";

function factory(name, url, data, success, type) {
	const isFunc = isFunction(data);
	let settings = url !== null && typeof url === "object" ? url : {
		url: url,
		data: isFunc ? {} : data,
		success: isFunc ? data : success,
		dataType: isFunc ? success : type
	};
	settings.method = name.toUpperCase();
	return $.ajax(settings);
}

/**
 * @type {{
 * 	(url:string, data:string|PlainObject, success:xhrCallback, dataType:string) => xhr
* 	(url:string, data:string|PlainObject, success:xhrCallback) => xhr
* 	(url:string, success:xhrCallback, dataType:[string]) => xhr
* 	(url:string, success:xhrCallback) => xhr
* 	(url:string) => xhr
 * }}
 * @param {string|xhrCallback} url A string containing the URL to get data from
 * @param {string|PlainObject} data A plain object or string that is sent to the server with the request as GET parameters
 * @param {xhrCallback} success A callback to be called when the request succeeds
 * @param {string} type The data type of the request body
 * @returns {xhr|undefined} The XHR object, or undefined if the script was included
 */
const get = (url, data, success, type) => {
	return factory("get", url, data, success, type);
}
Object.defineProperty($, "get", {value: get});

/**
 * @type {{
* 	(url:string, data:string|PlainObject, success:xhrCallback, dataType:string) => xhr
* 	(url:string, data:string|PlainObject, success:xhrCallback) => xhr
* 	(url:string, success:xhrCallback, dataType:[string]) => xhr
* 	(url:string, success:xhrCallback) => xhr
* 	(url:string) => xhr
 * }}
 * @param {string|xhrCallback} url A string containing the URL to get data from
 * @param {string|PlainObject} data A plain object or string that is sent to the server with the request as GET parameters
 * @param {xhrCallback} success A callback to be called when the request succeeds
 * @param {string} type The data type of the request body
 * @returns {xhr|undefined} The XHR object, or undefined if the script was included
 */
const post = (url, data, success, type) => {
	return factory("post", url, data, success, type);
}
Object.defineProperty($, "post", {value: post});
