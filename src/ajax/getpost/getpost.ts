import $ from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";
import "../ajax/ajax.js";
import type { AjaxSettings, XhrCallback } from "../ajax/ajax.js";

type PlainObject = { [key: string]: string | number | boolean | null | string[] | number[] };
type DataParam = string | PlainObject;

function factory(name: string, url: string | AjaxSettings, data?: DataParam | XhrCallback, success?: XhrCallback | string, type?: string): XMLHttpRequest | undefined {
	const isFunc = typeof data === "function";
	let settings: AjaxSettings = url !== null && typeof url === "object" ? url : {
		url: url as string,
		data: isFunc ? {} : data,
		success: isFunc ? data as XhrCallback : success as XhrCallback,
		dataType: isFunc ? success as string : type
	};
	settings.method = name.toUpperCase() as "GET" | "POST";
	return ($ as typeof $ & { ajax: (settings: AjaxSettings) => XMLHttpRequest | undefined }).ajax(settings);
}

// GET overloads
/**
 * Shorthand for an AJAX request using the GET method.
 *
 * Internally delegates to `$.ajax`. Supplying `data` as a plain object will serialise it onto the query string.
 *
 * @param url - URL to fetch
 * @param data - query parameters to append to the URL
 * @param success - callback invoked when the request succeeds
 * @param dataType - expected response type (e.g. `"json"`, `"script"`, `"jsonp"`)
 * @returns the underlying `XMLHttpRequest` for asynchronous requests, or `undefined` for script/jsonp loads
 *
 * @example
 * $.get("/api/products", { category: "books" }, (products) => {
 *   console.log(products);
 * }, "json");
 */
function get(url: string, data: DataParam, success: XhrCallback, dataType: string): XMLHttpRequest | undefined;
/**
 * Shorthand GET request with data and success callback.
 *
 * @param url - URL to fetch
 * @param data - query parameters to append to the URL
 * @param success - callback invoked when the request succeeds
 */
function get(url: string, data: DataParam, success: XhrCallback): XMLHttpRequest | undefined;
/**
 * Shorthand GET request with a success callback and explicit data type.
 *
 * @param url - URL to fetch
 * @param success - callback invoked when the request succeeds
 * @param dataType - expected response type (e.g. `"json"`)
 */
function get(url: string, success: XhrCallback, dataType: string): XMLHttpRequest | undefined;
/**
 * Shorthand GET request with a success callback.
 *
 * @param url - URL to fetch
 * @param success - callback invoked when the request succeeds
 */
function get(url: string, success: XhrCallback): XMLHttpRequest | undefined;
/**
 * Fire-and-forget GET request.
 *
 * @param url - URL to fetch
 */
function get(url: string): XMLHttpRequest | undefined;
/**
 * GET request with query parameters but no callback.
 *
 * @param url - URL to fetch
 * @param data - query parameters to append to the URL
 */
function get(url: string, data: DataParam): XMLHttpRequest | undefined;
/**
 * GET request configured by a full settings object.
 *
 * @param settings - request options (forwarded to `$.ajax`)
 */
function get(settings: AjaxSettings): XMLHttpRequest | undefined;

// GET implementation
function get(url: string | AjaxSettings, data?: DataParam | XhrCallback, success?: XhrCallback | string, type?: string): XMLHttpRequest | undefined {
	return factory("get", url, data, success, type);
}

Object.defineProperty($, "get", { value: get });

// POST overloads
/**
 * Shorthand for an AJAX request using the POST method.
 *
 * Internally delegates to `$.ajax`. Plain object data is URL-encoded and sent in the request body.
 *
 * @param url - URL to send the request to
 * @param data - body parameters
 * @param success - callback invoked when the request succeeds
 * @param dataType - expected response type (e.g. `"json"`)
 * @returns the underlying `XMLHttpRequest` for asynchronous requests, or `undefined` for script/jsonp loads
 *
 * @example
 * $.post("/api/users", { name: "Ada Lovelace" }, (user) => {
 *   console.log("Created", user);
 * }, "json");
 */
function post(url: string, data: DataParam, success: XhrCallback, dataType: string): XMLHttpRequest | undefined;
/**
 * Shorthand POST request with data and success callback.
 *
 * @param url - URL to send the request to
 * @param data - body parameters
 * @param success - callback invoked when the request succeeds
 */
function post(url: string, data: DataParam, success: XhrCallback): XMLHttpRequest | undefined;
/**
 * Shorthand POST request with a success callback and explicit data type.
 *
 * @param url - URL to send the request to
 * @param success - callback invoked when the request succeeds
 * @param dataType - expected response type
 */
function post(url: string, success: XhrCallback, dataType: string): XMLHttpRequest | undefined;
/**
 * Shorthand POST request with a success callback.
 *
 * @param url - URL to send the request to
 * @param success - callback invoked when the request succeeds
 */
function post(url: string, success: XhrCallback): XMLHttpRequest | undefined;
/**
 * Fire-and-forget POST request.
 *
 * @param url - URL to send the request to
 */
function post(url: string): XMLHttpRequest | undefined;
/**
 * POST request with body parameters but no callback.
 *
 * @param url - URL to send the request to
 * @param data - body parameters
 */
function post(url: string, data: DataParam): XMLHttpRequest | undefined;
/**
 * POST request configured by a full settings object.
 *
 * @param settings - request options (forwarded to `$.ajax`)
 */
function post(settings: AjaxSettings): XMLHttpRequest | undefined;

// POST implementation
function post(url: string | AjaxSettings, data?: DataParam | XhrCallback, success?: XhrCallback | string, type?: string): XMLHttpRequest | undefined {
	return factory("post", url, data, success, type);
}

Object.defineProperty($, "post", { value: post });

// Augment ModularDabbyStatics for modular builds
declare module '../../dabby.js' {
  interface ModularDabbyStatics {
    get(url: string, data: string | { [key: string]: string | number | boolean | null | string[] | number[] }, success: XhrCallback, dataType: string): XMLHttpRequest | undefined;
    get(url: string, data: string | { [key: string]: string | number | boolean | null | string[] | number[] }, success: XhrCallback): XMLHttpRequest | undefined;
    get(url: string, success: XhrCallback, dataType: string): XMLHttpRequest | undefined;
    get(url: string, success: XhrCallback): XMLHttpRequest | undefined;
    get(url: string): XMLHttpRequest | undefined;
    get(url: string, data: string | { [key: string]: string | number | boolean | null | string[] | number[] }): XMLHttpRequest | undefined;
    get(settings: AjaxSettings): XMLHttpRequest | undefined;
    post(url: string, data: string | { [key: string]: string | number | boolean | null | string[] | number[] }, success: XhrCallback, dataType: string): XMLHttpRequest | undefined;
    post(url: string, data: string | { [key: string]: string | number | boolean | null | string[] | number[] }, success: XhrCallback): XMLHttpRequest | undefined;
    post(url: string, success: XhrCallback, dataType: string): XMLHttpRequest | undefined;
    post(url: string, success: XhrCallback): XMLHttpRequest | undefined;
    post(url: string): XMLHttpRequest | undefined;
    post(url: string, data: string | { [key: string]: string | number | boolean | null | string[] | number[] }): XMLHttpRequest | undefined;
    post(settings: AjaxSettings): XMLHttpRequest | undefined;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __get = typeof get;
export type __post = typeof post;

