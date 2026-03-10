import $ from "../../core/dabby/dabby.js";
import type {} from "../../modular.js";
import "../ajax/ajax.js";

type XhrResponse = string | ArrayBuffer | Blob | Document | object | null;
type XhrCallback = (response: XhrResponse, status: string | number, xhr: XMLHttpRequest) => void;

function getScript(url: string, success?: XhrCallback): XMLHttpRequest | undefined {
	return ($ as typeof $ & { ajax: (settings: { url: string; dataType: string; success?: XhrCallback }) => XMLHttpRequest | undefined }).ajax({
		url: url,
		dataType: "script",
		success: success
	});

}

Object.defineProperty($, "getScript", { value: getScript });

// Augment ModularDabbyStatics for modular builds
declare module 'dabbyjs' {
  interface ModularDabbyStatics {
    getScript(url: string, success?: XhrCallback): XMLHttpRequest | undefined;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __getScript = typeof getScript;

