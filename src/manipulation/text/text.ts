import { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../modular.js";
import getVal from "../../internal/getval/getval.js";

type TextCallback = (this: Element, index: number, currentText: string) => string;

// Getter
function text(this: Dabby): string;
// Setter
function text(this: Dabby, content: string | TextCallback): Dabby;
// Implementation
function text(this: Dabby, content?: string | TextCallback): Dabby | string {
	let i = this.length;
	const output: string[] = [];

	// Set
	if (content !== undefined) {
		const dabbyCollection = this as unknown as { readonly length: number; readonly [n: number]: Element };
		const values = getVal(dabbyCollection, content, (obj: Element) => obj.textContent ?? "");

		i = this.length;
		while (i--) {
			(this[i] as Element).textContent = values[i] as string;
		}
		return this;
	}

	// Get
	i = this.length;
	while (i--) {
		output[i] = (this[i] as Element).textContent ?? "";
	}
	return output.join(" ");
}

Object.defineProperty(Dabby.prototype, "text", { value: text, configurable: true });

// Module augmentation for auto-inferred modular imports
declare module 'dabbyjs' {
  interface ModularDabbyMethods {
    text(): string;
    text(content: string | number | boolean | ((this: Element, index: number, currentText: string) => string | number | boolean)): this;
  }
}

export type __text = typeof text;
