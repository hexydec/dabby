export type DOMNode = Element | Document | DocumentFragment | Window;

// Import Dabby class to use as type
import type { Dabby } from "./core/dabby/dabby.js";
export type { Dabby };

export type Selector = string | DOMNode | DOMNode[] | NodeList | HTMLCollection | Dabby;

export type ReadyCallback = (this: Document, $: DabbyFactory) => void;

export interface DabbyConstructor {
	new (selector?: Selector | ReadyCallback, context?: Selector | Record<string, unknown>): Dabby;
	readonly prototype: Dabby;
}

export interface DabbyFactory {
	(selector?: Selector | ReadyCallback, context?: Selector | Record<string, unknown>): Dabby;
	readonly prototype: Dabby;
	readonly fn: Dabby;

	// Static utility methods
	map?: <T, R>(
		obj: Record<string, T> | T[],
		callback: (this: Window, value: T, key: string) => R | R[] | null | undefined
	) => R[];
	extend?: {
		(deep: true, target: Record<string, unknown>, ...sources: Record<string, unknown>[]): Record<string, unknown>;
		(target: Record<string, unknown>, ...sources: Record<string, unknown>[]): Record<string, unknown>;
	};
	isPlainObject?: (obj: unknown) => boolean;
	parseHTML?: (html: string) => Element[];

	// Ajax methods
	ajax?: {
		(url: string, settings?: {
			url?: string;
			method?: "GET" | "POST";
			cache?: boolean | null;
			data?: string | FormData | URLSearchParams | Record<string, unknown>;
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
			statusCode?: Record<number, (response: string | ArrayBuffer | Blob | Document | object | null, status: string | number, xhr: XMLHttpRequest) => void>;
			username?: string | null;
			password?: string | null;
			xhrFields?: Partial<XMLHttpRequest>;
			success?: ((response: string | ArrayBuffer | Blob | Document | object | null, status: string | number, xhr: XMLHttpRequest) => void) | null;
			error?: ((response: string | ArrayBuffer | Blob | Document | object | null, status: string | number, xhr: XMLHttpRequest) => void) | null;
			complete?: ((xhr: XMLHttpRequest | null, status: string | number) => void) | null;
		}): XMLHttpRequest | undefined;
		(settings: {
			url?: string;
			method?: "GET" | "POST";
			cache?: boolean | null;
			data?: string | FormData | URLSearchParams | Record<string, unknown>;
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
			statusCode?: Record<number, (response: string | ArrayBuffer | Blob | Document | object | null, status: string | number, xhr: XMLHttpRequest) => void>;
			username?: string | null;
			password?: string | null;
			xhrFields?: Partial<XMLHttpRequest>;
			success?: ((response: string | ArrayBuffer | Blob | Document | object | null, status: string | number, xhr: XMLHttpRequest) => void) | null;
			error?: ((response: string | ArrayBuffer | Blob | Document | object | null, status: string | number, xhr: XMLHttpRequest) => void) | null;
			complete?: ((xhr: XMLHttpRequest | null, status: string | number) => void) | null;
		}): XMLHttpRequest | undefined;
	};
	get?: (url: string | { url?: string; method?: "GET" | "POST"; cache?: boolean | null; data?: string | FormData | URLSearchParams | Record<string, unknown>; dataType?: string | null; async?: boolean; crossDomain?: boolean; scriptAttrs?: Record<string, string>; jsonp?: string; jsonpCallback?: string; headers?: Record<string, string>; xhr?: () => XMLHttpRequest; contentType?: string | null; context?: Element | Window | Document | undefined; statusCode?: Record<number, (response: string | ArrayBuffer | Blob | Document | object | null, status: string | number, xhr: XMLHttpRequest) => void>; username?: string | null; password?: string | null; xhrFields?: Partial<XMLHttpRequest>; success?: ((response: string | ArrayBuffer | Blob | Document | object | null, status: string | number, xhr: XMLHttpRequest) => void) | null; error?: ((response: string | ArrayBuffer | Blob | Document | object | null, status: string | number, xhr: XMLHttpRequest) => void) | null; complete?: ((xhr: XMLHttpRequest | null, status: string | number) => void) | null }, data?: string | Record<string, string | number | boolean | null | string[] | number[]> | ((response: string | ArrayBuffer | Blob | Document | object | null, status: string | number, xhr: XMLHttpRequest) => void), success?: ((response: string | ArrayBuffer | Blob | Document | object | null, status: string | number, xhr: XMLHttpRequest) => void) | string, type?: string) => XMLHttpRequest | undefined;
	post?: (url: string | { url?: string; method?: "GET" | "POST"; cache?: boolean | null; data?: string | FormData | URLSearchParams | Record<string, unknown>; dataType?: string | null; async?: boolean; crossDomain?: boolean; scriptAttrs?: Record<string, string>; jsonp?: string; jsonpCallback?: string; headers?: Record<string, string>; xhr?: () => XMLHttpRequest; contentType?: string | null; context?: Element | Window | Document | undefined; statusCode?: Record<number, (response: string | ArrayBuffer | Blob | Document | object | null, status: string | number, xhr: XMLHttpRequest) => void>; username?: string | null; password?: string | null; xhrFields?: Partial<XMLHttpRequest>; success?: ((response: string | ArrayBuffer | Blob | Document | object | null, status: string | number, xhr: XMLHttpRequest) => void) | null; error?: ((response: string | ArrayBuffer | Blob | Document | object | null, status: string | number, xhr: XMLHttpRequest) => void) | null; complete?: ((xhr: XMLHttpRequest | null, status: string | number) => void) | null }, data?: string | Record<string, string | number | boolean | null | string[] | number[]> | ((response: string | ArrayBuffer | Blob | Document | object | null, status: string | number, xhr: XMLHttpRequest) => void), success?: ((response: string | ArrayBuffer | Blob | Document | object | null, status: string | number, xhr: XMLHttpRequest) => void) | string, type?: string) => XMLHttpRequest | undefined;
	getScript?: (url: string, success?: (response: string | ArrayBuffer | Blob | Document | object | null, status: string | number, xhr: XMLHttpRequest) => void) => XMLHttpRequest | undefined;
	param?: (obj: Record<string, string | number | boolean | null | (string | number | boolean | null)[] | Record<string, unknown> | (() => string | number | boolean | null | (string | number | boolean | null)[] | Record<string, unknown>)>) => string;
}

export type DabbyStatic = DabbyFactory & {
	[key: string]: unknown;
};
