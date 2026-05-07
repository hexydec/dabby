import $ from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";
import "../ajax/ajax.js";

type XhrResponse = string | ArrayBuffer | Blob | Document | object | null;
type XhrCallback = (response: XhrResponse, status: string | number, xhr: XMLHttpRequest) => void;

/**
 * Load an external script and execute its contents.
 *
 * Shorthand for `$.ajax` with `dataType` set to `"script"`. The script is appended to `<head>` and runs in the global scope.
 *
 * @param url - URL of the script to load
 * @param success - callback invoked once the script has loaded and executed
 * @returns `undefined` (script loads are fire-and-forget; no `XMLHttpRequest` is created)
 *
 * @example
 * $.getScript("/scripts/analytics.js", () => {
 *   initialiseAnalytics();
 * });
 */
function getScript(url: string, success?: XhrCallback): XMLHttpRequest | undefined {
	return ($ as typeof $ & { ajax: (settings: { url: string; dataType: string; success?: XhrCallback }) => XMLHttpRequest | undefined }).ajax({
		url: url,
		dataType: "script",
		success: success
	});

}

Object.defineProperty($, "getScript", { value: getScript });

// Augment ModularDabbyStatics for modular builds
declare module '../../dabby.js' {
  interface ModularDabbyStatics {
    getScript(url: string, success?: XhrCallback): XMLHttpRequest | undefined;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __getScript = typeof getScript;

