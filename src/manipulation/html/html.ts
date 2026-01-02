import { Dabby } from "../../core/dabby/dabby.js";
import getVal from "../../internal/getval/getval.js";
import type {} from "../../modular.js";

type HTMLCallback = (this: Element, index: number, currentHTML: string) => string;

// Getter
function html(this: Dabby): string | undefined;
// Setter
function html(this: Dabby, content: string | HTMLCallback): Dabby;
// Implementation
function html(this: Dabby, content?: string | HTMLCallback): Dabby | string | undefined {
	// Set
	if (content !== undefined) {
		let i = this.length;
		const dabbyCollection = this as unknown as { readonly length: number; readonly [n: number]: Element };
		const values = getVal(dabbyCollection, content, (obj: Element) => obj.innerHTML);

		while (i--) {
			(this[i] as Element).innerHTML = values[i] as string;
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
declare module 'dabbyjs' {
  interface ModularDabbyMethods {
    html(): string | undefined;
    html(content: string | ((this: Element, index: number, currentHTML: string) => string)): this;
  }
}

// Export a type witness to force TypeScript to include this file's augmentation
export type __html = typeof html;
