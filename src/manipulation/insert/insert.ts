import $, { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../modular.js";
import type { Selector } from "../../types.js";
import getVal from "../../internal/getval/getval.js";

type InsertCallback = (this: Element, index: number, html: string) => Selector;
type InsertPosition = "beforebegin" | "afterbegin" | "beforeend" | "afterend";

function factory(
	name: string,
	pos: InsertPosition,
	obj: Dabby,
	...content: Array<Selector | InsertCallback>
): Dabby {
	// Function tracking variables
	const pre = ["prepend", "after"].includes(name);
	let elems: Dabby;
	let i = obj.length;
	const len = i;
	const isFunc = typeof content[0] === "function";

	// Multiple arguments containing nodes
	if (!isFunc) {
		elems = content.reduce((dabby: Dabby, item) => {
			if (dabby.add) {
				return dabby.add(item as Selector);
			}
			return dabby;
		}, $());
	}

	// Insert objects onto each element in collection
	while (i--) {
		const element = obj[i] as Element;

		// Retrieve nodes from function
		if (isFunc) {
			const dabbyCollection = [element] as unknown as { readonly length: number; readonly [n: number]: Element };
			const values = getVal(dabbyCollection, content[0], (obj: Element) => obj.innerHTML);
			elems = values.reduce((dabby: Dabby, item) => {
				if (dabby.add) {
					return dabby.add(item as Selector);
				}
				return dabby;
			}, $());
		}

		// Insert nodes
		let backwards = elems!.length; // For counting down
		let forwards = -1; // For counting up

		while (pre ? backwards-- : ++forwards < backwards) {
			const index = pre ? backwards : forwards;
			const nodeToInsert = i === len - 1
				? elems![index] as Element
				: (elems!.eq?.(index).clone?.(true)[0] as Element) ?? (elems![index] as Element);

			element.insertAdjacentElement(pos, nodeToInsert);
		}
	}

	return obj;
}

function before(this: Dabby, ...content: Array<Selector | InsertCallback>): Dabby {
	return factory("before", "beforebegin", this, ...content);
}

Object.defineProperty(Dabby.prototype, "before", { value: before, configurable: true });

function prepend(this: Dabby, ...content: Array<Selector | InsertCallback>): Dabby {
	return factory("prepend", "afterbegin", this, ...content);
}

Object.defineProperty(Dabby.prototype, "prepend", { value: prepend, configurable: true });

function append(this: Dabby, ...content: Array<Selector | InsertCallback>): Dabby {
	return factory("append", "beforeend", this, ...content);
}

Object.defineProperty(Dabby.prototype, "append", { value: append, configurable: true });

function after(this: Dabby, ...content: Array<Selector | InsertCallback>): Dabby {
	return factory("after", "afterend", this, ...content);
}

Object.defineProperty(Dabby.prototype, "after", { value: after, configurable: true });

// Module augmentation for auto-inferred modular imports
declare module 'dabbyjs' {
  interface ModularDabbyMethods {
    append(content: string | Element | Element[] | Dabby | ((this: Element, index: number) => string | Element | Dabby)): this;
    prepend(content: string | Element | Element[] | Dabby | ((this: Element, index: number) => string | Element | Dabby)): this;
    after(content: string | Element | Element[] | Dabby | ((this: Element, index: number) => string | Element | Dabby)): this;
    before(content: string | Element | Element[] | Dabby | ((this: Element, index: number) => string | Element | Dabby)): this;
  }
}

export type __append = typeof append;
export type __prepend = typeof prepend;
