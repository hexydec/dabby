import isPlainObject, { type PlainObject } from "../../internal/isplainobject/isplainobject.js";
import parseHTML from "../../internal/parsehtml/parsehtml.js";
import type { DOMNode, Selector, ReadyCallback, DabbyFactory } from "../../types.js";

export class Dabby implements Iterable<DOMNode> {
	readonly length: number;
	readonly [index: number]: DOMNode;

	constructor(selector?: Selector | ReadyCallback, context?: Selector | Record<string, unknown>) {
		let nodes: DOMNode[] = [];

		if (selector) {
			if (typeof selector === "string") {
				if (selector[0] !== "<") {
					// CSS selector
					const obj = context ? $(context as Selector) : [document];
					let i = obj.length;
					while (i--) {
						nodes = [...(obj[i] as Element | Document).querySelectorAll(selector), ...nodes];
					}
				} else {
					// Create element from HTML
					const match = selector.match(/^<([a-z0-9]+)(( ?\/)?|><\/\1)>$/i);
					if (match !== null) {
						nodes = [document.createElement(match[1])];

						// Context is CSS attributes
						if (context && isPlainObject(context) && Dabby.prototype.hasOwnProperty("attr")) {
							($(nodes) as Dabby & { attr: (attrs: PlainObject) => Dabby }).attr(context as PlainObject);
						}
					} else {
						// Parse HTML
						nodes = parseHTML(selector, (context as Node | Document | boolean) || document, true);
					}
				}
			} else if (selector instanceof Dabby) {
				// Copy Dabby collection
				nodes = Array.from(selector);
			} else if (selector instanceof Node || selector === window) {
				// Single node or Window
				nodes = [selector as DOMNode];
			} else if (typeof selector === "function") {
				// Ready function
				if (document.readyState !== "loading") {
					selector.call(document, $ as DabbyFactory);
				} else {
					document.addEventListener(
						"DOMContentLoaded",
						() => selector.call(document, $ as DabbyFactory),
						{ once: true }
					);
				}
			} else {
				// Array, NodeList, HTMLCollection
				nodes = Array.from(selector as ArrayLike<Node>).filter(
					(node, i, self) =>
						self.indexOf(node) === i &&
						([1, 9, 11].includes(node.nodeType) || (node as unknown) === window)
				) as DOMNode[];
			}
		}

		this.length = nodes.length;

		// Assign nodes as indexed properties
		for (let i = 0; i < nodes.length; i++) {
			Object.defineProperty(this, i, {
				value: nodes[i],
				enumerable: true
			});
		}
	}

	*[Symbol.iterator](): Iterator<DOMNode> {
		for (let i = 0; i < this.length; i++) {
			yield this[i];
		}
	}

	each<T extends DOMNode = DOMNode>(
		callback: (this: T, index: number, element: T) => void | false
	): this {
		for (let i = 0; i < this.length; i++) {
			if (callback.call(this[i] as T, i, this[i] as T) === false) {
				break;
			}
		}
		return this;
	}

	get(): DOMNode[];
	get(index: number): DOMNode | undefined;
	get(index?: number): DOMNode | DOMNode[] | undefined {
		if (index === undefined) {
			return Array.from(this);
		}
		return this[index >= 0 ? index : index + this.length];
	}

	map<T extends DOMNode = DOMNode>(
		callback: (this: T, index: number, element: T) => Selector
	): Dabby {
		let result: Dabby = $() as Dabby;

		for (let i = 0; i < this.length; i++) {
			const returned = callback.call(this[i] as T, i, this[i] as T);
			// Add will be defined in traversal/add - temporarily use array concat
			const newCollection = $(returned as Selector);
			const combined = [...Array.from(result), ...Array.from(newCollection)];
			result = $(combined) as Dabby;
		}

		return result;
	}

}

const $ = ((selector?: Selector | ReadyCallback, context?: Selector | Record<string, unknown>) => {
	return new Dabby(selector, context);
}) as unknown as DabbyFactory;

Object.defineProperty($, "prototype", {
	value: Dabby.prototype
});

Object.defineProperty($, "fn", {
	value: Dabby.prototype
});

// Static utility methods
type EachCallback<T> = (this: T, key: number | string, value: T) => void | false;

const eachFunction = function <T>(
	obj: ArrayLike<T> | Record<string, T> | Dabby,
	callback: EachCallback<T>
): typeof obj {
	const isArr = Array.isArray(obj) || (obj as ArrayLike<T>).length !== undefined;
	const keys = isArr ? null : Object.keys(obj as Record<string, T>);
	const len = isArr ? (obj as ArrayLike<T>).length : (keys as string[]).length;

	for (let i = 0; i < len; i++) {
		const key = isArr ? i : (keys as string[])[i];
		const value = isArr ? (obj as ArrayLike<T>)[i] : (obj as Record<string, T>)[key];

		if (callback.call(value, key, value) === false) {
			break;
		}
	}
	return obj;
};

// Add to factory using type assertion to extend the interface
($ as typeof $ & { each: typeof eachFunction }).each = eachFunction;

export default $;
