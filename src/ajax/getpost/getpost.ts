import $ from "../../core/dabby/dabby.js";
import type {} from "../../modular.js";
import "../ajax/ajax.js";
import type { AjaxSettings, XhrCallback } from "../ajax/ajax.js";
import type {} from "../../modular.js";

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
	return $.ajax!(settings);
}

// GET overloads
function get(url: string, data: DataParam, success: XhrCallback, dataType: string): XMLHttpRequest | undefined;
function get(url: string, data: DataParam, success: XhrCallback): XMLHttpRequest | undefined;
function get(url: string, success: XhrCallback, dataType: string): XMLHttpRequest | undefined;
function get(url: string, success: XhrCallback): XMLHttpRequest | undefined;
function get(url: string): XMLHttpRequest | undefined;
function get(settings: AjaxSettings): XMLHttpRequest | undefined;

// GET implementation
function get(url: string | AjaxSettings, data?: DataParam | XhrCallback, success?: XhrCallback | string, type?: string): XMLHttpRequest | undefined {
	return factory("get", url, data, success, type);
}

Object.defineProperty($, "get", { value: get });

// POST overloads
function post(url: string, data: DataParam, success: XhrCallback, dataType: string): XMLHttpRequest | undefined;
function post(url: string, data: DataParam, success: XhrCallback): XMLHttpRequest | undefined;
function post(url: string, success: XhrCallback, dataType: string): XMLHttpRequest | undefined;
function post(url: string, success: XhrCallback): XMLHttpRequest | undefined;
function post(url: string): XMLHttpRequest | undefined;
function post(settings: AjaxSettings): XMLHttpRequest | undefined;

// POST implementation
function post(url: string | AjaxSettings, data?: DataParam | XhrCallback, success?: XhrCallback | string, type?: string): XMLHttpRequest | undefined {
	return factory("post", url, data, success, type);
}

Object.defineProperty($, "post", { value: post });

// Augment ModularDabbyStatics for modular builds
declare module 'dabbyjs' {
  interface ModularDabbyStatics {
    get: typeof get;
    post: typeof post;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __get = typeof get;
export type __post = typeof post;

