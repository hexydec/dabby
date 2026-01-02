import $, { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../modular.js";
import "../ajax/ajax.js";
import "../../traversal/filter/filter.js";
import "../../manipulation/insert/insert.js";

type PlainObject = { [key: string]: string | number | boolean | null | string[] | number[] };
type XhrResponse = string | ArrayBuffer | Blob | Document | object | null;
type XhrCallback = (this: Element, response: XhrResponse, status: string | number, xhr: XMLHttpRequest) => void;

// Overload signatures
function load(this: Dabby, url: string, data: string | PlainObject, success: XhrCallback): Dabby;
function load(this: Dabby, url: string, success: XhrCallback): Dabby;
function load(this: Dabby, url: string): Dabby;

// Implementation
function load(this: Dabby, url: string, data?: string | PlainObject | XhrCallback, success?: XhrCallback): Dabby {
	if (this[0]) {
		// get selector from URL
		const urlParts = url.split(" ", 2);
		const uri = urlParts[0];
		const selector = urlParts[1];

		// check for data
		if (typeof data === "function") {
			success = data as XhrCallback;
			data = undefined;
		}

		// make AJAX request
		$.ajax!(uri, {
			data: data,
			method: data instanceof Object ? "POST" : "GET",
			success: (response: XhrResponse, status: string | number, xhr: XMLHttpRequest) => {
				// if a selector is specified, find it in the returned document
				let html: string | Dabby = "";
				let i = this.length;

				// refine by selector if supplied
				if (selector && response && typeof response === "string") {
					html = $(response, (this[0] as Element).ownerDocument).filter!(selector);
				} else {
					html = (response as string) || "";
				}

				// set HTML to nodes in collection
				this.append!(html);

				// fire success callback on nodes
				if (success) {
					while (i--) {
						success.call(this[i] as Element, response, status, xhr);
					}
				}
			}
		});
	}
	return this;
}

Object.defineProperty(Dabby.prototype, "load", { value: load, configurable: true });
