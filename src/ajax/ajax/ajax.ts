import $ from "../../core/dabby/dabby.js";
import type {} from "../../modular.js";
import "../../utils/extend/extend.js";
import "../param/param.js";
import "../../utils/each/each.js";
import isPlainObject from "../../internal/isplainobject/isplainobject.js";
import type {} from "../../modular.js";

type XhrResponse = string | ArrayBuffer | Blob | Document | object | null;

type XhrCallback = (this: Element | Window | Document | undefined, response: XhrResponse, status: string | number, xhr: XMLHttpRequest) => void;

type CompleteCallback = (this: Element | Window | Document | undefined, xhr: XMLHttpRequest | null, status: string | number) => void;

type AjaxData = string | FormData | URLSearchParams | Record<string, unknown>;

interface AjaxSettings {
	url?: string;
	method?: "GET" | "POST";
	cache?: boolean | null;
	data?: AjaxData | Record<string, unknown>;
	dataType?: string | null;
	async?: boolean;
	crossDomain?: boolean;
	scriptAttrs?: Record<string, string>;
	jsonp?: string;
	jsonpCallback?: string;
	headers?: Record<string, string>;
	xhr?: () => XMLHttpRequest;
	contentType?: string | null;
	context?: Element | Window | Document | undefined;
	statusCode?: Record<number, XhrCallback>;
	username?: string | null;
	password?: string | null;
	xhrFields?: Partial<XMLHttpRequest>;
	success?: XhrCallback | null;
	error?: XhrCallback | null;
	complete?: CompleteCallback | null;
}

// Required settings after defaults are applied
interface RequiredAjaxSettings {
	url: string;
	method: "GET" | "POST";
	cache: boolean | null;
	data: AjaxData | Record<string, unknown> | null;
	dataType: string | null;
	async: boolean;
	crossDomain: boolean;
	scriptAttrs: Record<string, string>;
	jsonp: string;
	jsonpCallback: string;
	headers: Record<string, string>;
	xhr: () => XMLHttpRequest;
	contentType: string | null;
	context: Element | Window | Document | undefined;
	statusCode: Record<number, XhrCallback>;
	username: string | null;
	password: string | null;
	xhrFields: Partial<XMLHttpRequest>;
	success: XhrCallback | null;
	error: XhrCallback | null;
	complete: CompleteCallback | null;
}

// Overload signatures
function ajax(url: string, settings?: AjaxSettings): XMLHttpRequest | undefined;
function ajax(settings: AjaxSettings): XMLHttpRequest | undefined;

// Implementation
function ajax(url: string | AjaxSettings, settings?: AjaxSettings): XMLHttpRequest | undefined | void {
	// normalise args
	if (url !== null && typeof url === "object") {
		settings = url;
	} else {
		if (typeof settings !== "object") {
			settings = {};
		}
		settings.url = url as string;
	}

	// set default settings
	const s: RequiredAjaxSettings = Object.assign({ // spread not supported in some older versions of iOS
		method: "GET" as "GET" | "POST",
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
		context: undefined,
		statusCode: {},
		username: null,
		password: null,
		xhrFields: {},
		success: null,
		error: null,
		complete: null
	}, settings) as RequiredAjaxSettings;

	// set to itself
	if (s.url == null) { // double equals as also captures undefined
		s.url = location.href;
	}

	// determine datatype
	if (!s.dataType && s.url.split("?")[0].split(".").pop() === "js") {
		s.dataType = "script";
	}

	const sync = ["script", "jsonp"].includes(s.dataType!);
	let join = s.url.includes("?") ? "&" : "?";
	let script: HTMLScriptElement | undefined;
	let data: string | null = null;

	// process data add data to query string for GET requests
	if (s.data) {
		data = isPlainObject(s.data) ? $.param!(s.data as Record<string, string | number | boolean | null | Record<string, unknown> | (string | number | boolean | null)[] | (() => string | number | boolean | null | Record<string, unknown> | (string | number | boolean | null)[])>) : s.data as string;

		if (s.method === "GET") {
			s.url += join + data;
			join = "&";
			data = null;
		}
	}

	// add cache buster
	if (s.cache || (s.cache === null && sync)) {
		s.url += join + "_=" + (+new Date());
		join = "&";
	}

	// fetch script
	if (sync || s.crossDomain) {
		script = document.createElement("script");

		// Use type assertion for the each callback
		const scriptAttrs = s.scriptAttrs;
		const scriptElement = script;
		Object.keys(scriptAttrs).forEach((key) => {
			scriptElement.setAttribute(key, scriptAttrs[key]);
		});

		// add callback parameter
		if (s.dataType === "jsonp") {
			s.url += join + s.jsonp + "=" + s.jsonpCallback;
		}

		// setup event callbacks
		const eventMap: Record<string, "success" | "error"> = {
			load: "success",
			error: "error"
		};

		Object.keys(eventMap).forEach((key) => {
			const value = eventMap[key];
			script!.addEventListener(key, () => {
				const response = s.dataType === "jsonp" ? (window as unknown as Record<string, unknown>)[s.jsonpCallback] || null : null;
				const callbacks: Array<XhrCallback | CompleteCallback | null | undefined> = [
					s[value],
					s.complete
				];

				callbacks.forEach((cb) => {
					if (typeof cb === "function") {
						if (cb === s.complete) {
							(cb as CompleteCallback).apply(s.context, [null, value]);
						} else {
							(cb as XhrCallback).apply(s.context, [response as XhrResponse, value, null as unknown as XMLHttpRequest]);
						}
					}
				});
			}, { once: true });
		});

		script.src = s.url;
		script.async = s.async;
		document.head.appendChild(script);

	// make xhr request
	} else {
		const xhr = s.xhr();
		const callback = (xhr: XMLHttpRequest, type: string, status: string) => {
			let response: XhrResponse;
			if (xhr.responseType === "blob") {
				response = xhr.response;
			} else {
				response = xhr.responseText;

				// parse JSON
				const jsonTypes: Array<string | null | undefined> = ["json", null, undefined];
				if (jsonTypes.includes(s.dataType)) {
					try {
						response = JSON.parse(response);
					} catch (e) {
						// do nothing
					}
				}
			}

			// run callbacks
			const callbacks: Array<XhrCallback | CompleteCallback | null | undefined> = [
				s.statusCode[xhr.status],
				s[type as "success" | "error"],
				s.complete || undefined
			];

			callbacks.forEach((cb, i) => {
				if (cb) {
					if (i < 2) {
						(cb as XhrCallback).apply(s.context, [response, status, xhr]);
					} else {
						(cb as CompleteCallback).apply(s.context, [xhr, status]);
					}
				}
			});
		};

		// XHR settings
		const xhrFields = s.xhrFields;
		Object.keys(xhrFields).forEach((key) => {
			(xhr as unknown as Record<string, unknown>)[key] = (xhrFields as unknown as Record<string, unknown>)[key];
		});

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

		xhr.open(s.method, s.url, s.async, s.username, s.password);

		// add headers
		if (typeof data === "string" && !s.contentType) {
			s.contentType = "application/x-www-form-urlencoded; charset=UTF-8";
		}
		if (s.contentType) {
			s.headers["Content-Type"] = s.contentType;
		}

		const headers = s.headers;
		Object.keys(headers).forEach((key) => {
			xhr.setRequestHeader(key, headers[key]);
		});

		// send request
		xhr.send(data);
		return xhr;
	}
}

Object.defineProperty($, "ajax", { value: ajax });

// Augment ModularDabbyStatics for modular builds
declare module 'dabbyjs' {
  interface ModularDabbyStatics {
    ajax: typeof ajax;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __ajax = typeof ajax;


export type { AjaxSettings, XhrCallback, CompleteCallback, XhrResponse };
