import { Dabby } from "../../core/dabby/dabby.js";
import getVal from "../../internal/getval/getval.js";
import toTrustedHTML from "../../internal/trustedhtml/trustedhtml.js";
import type {} from "../../dabby.js";

type HTMLCallback = (this: Element, index: number, currentHTML: string) => string;

/**
 * Retrieve the `innerHTML` of the first item in the collection.
 *
 * Returns `undefined` when the collection is empty.
 *
 * @returns the HTML markup of the first element, or `undefined`
 *
 * @example
 * const markup = $(".article").html();
 */
// Getter
function html(this: Dabby): string | undefined;
/**
 * Set the `innerHTML` of every item in the collection.
 *
 * Accepts a string, a `TrustedHTML` object, or a callback invoked for each
 * element with the element's index and current HTML; the callback's return
 * value becomes the new HTML. String values are routed through the configured
 * Trusted Types policy when one is available, so this method is safe to use
 * under `Content-Security-Policy: require-trusted-types-for 'script'`.
 *
 * @param content - HTML string, TrustedHTML, or a callback returning new HTML
 * @returns the original Dabby collection
 *
 * @example
 * $(".container").html("<p>Updated</p>");
 */
// Setter
function html(this: Dabby, content: string | TrustedHTML | HTMLCallback): Dabby;
// Implementation
function html(this: Dabby, content?: string | TrustedHTML | HTMLCallback): Dabby | string | undefined {
	// Set
	if (content !== undefined) {
		let i = this.length;
		const dabbyCollection = this as unknown as { readonly length: number; readonly [n: number]: Element };
		const values = getVal(dabbyCollection, content, (obj: Element) => obj.innerHTML);

		while (i--) {
			(this[i] as Element).innerHTML = toTrustedHTML(values[i] as string) as string;
		}
		return this;
	}

	// Get
	if (this[0]) {
		return (this[0] as Element).innerHTML;
	}

	return undefined;
}

Object.defineProperty(Dabby.prototype, "html", { value: html, configurable: true });

// Augment ModularDabbyMethods for modular builds
// Using package name so it works across package boundaries
declare module '../../dabby.js' {
  interface ModularDabbyMethods {
    html(): string | undefined;
    html(content: string | TrustedHTML | ((this: Element, index: number, currentHTML: string) => string)): this;
  }
}

// Export a type witness to force TypeScript to include this file's augmentation
export type __html = typeof html;
