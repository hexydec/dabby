import isPlainObject, { type PlainObject } from "../../internal/isplainobject/isplainobject.js";
import parseHTML from "../../internal/parsehtml/parsehtml.js";
import type { DOMNode, Selector, ReadyCallback, DabbyFactory } from "../../types.js";

/**
 * An iterable, array-like collection of DOM nodes that exposes the chainable Dabby API.
 *
 * Instances are created by the `$` factory and behave like a frozen array: nodes are
 * available via numeric indexes, the size is exposed through `length`, and the
 * collection can be iterated with `for...of`.
 */
export class Dabby implements Iterable<DOMNode> {
	/** The number of nodes in the collection. */
	readonly length: number;
	/** Indexed access to each node in the collection. */
	readonly [index: number]: DOMNode;

	/**
	 * Build a Dabby collection from a selector.
	 *
	 * Strings starting with `<` are parsed as HTML, other strings are treated as CSS
	 * selectors. Nodes, NodeLists, arrays, other Dabby collections, `window`, and
	 * `TrustedHTML` are all accepted. When `selector` is a function it is registered
	 * as a DOMContentLoaded callback (or fired immediately if the document is ready).
	 *
	 * @param selector - A CSS selector, HTML string, node, iterable of nodes, ready callback, or another Dabby collection.
	 * @param context - The element to scope a CSS selector to, the owner document for HTML, or an attribute map for single-tag creation.
	 */
	constructor(selector?: Selector | TrustedHTML | ReadyCallback, context?: Selector | Record<string, unknown>) {
		let nodes: DOMNode[] = [];

		if (selector) {
			// TrustedHTML: must start with < and end with > (same constraint as jQuery 4)
			const isTrustedHTML = typeof TrustedHTML !== "undefined" && selector instanceof TrustedHTML;

			if (typeof selector === "string" || isTrustedHTML) {
				const str = selector as string;
				if (!isTrustedHTML && str[0] !== "<") {
					// CSS selector
					const obj = context ? $(context as Selector) : [document];
					let i = obj.length;
					while (i--) {
						nodes = [...(obj[i] as Element | Document).querySelectorAll(str), ...nodes];
					}
				} else if (!isTrustedHTML && str.match(/^<([a-z0-9]+)(( ?\/)?|><\/\1)>$/i)) {
					// Simple element creation: $("<div>"), $("<br/>")
					const match = str.match(/^<([a-z0-9]+)(( ?\/)?|><\/\1)>$/i)!;
					nodes = [document.createElement(match[1])];

					// Context is CSS attributes
					if (context && isPlainObject(context) && Dabby.prototype.hasOwnProperty("attr")) {
						($(nodes) as Dabby & { attr: (attrs: PlainObject) => Dabby }).attr(context as PlainObject);
					}
				} else {
					// Parse HTML (handles both string and TrustedHTML)
					nodes = parseHTML(selector as string | TrustedHTML, (context as Node | Document | boolean) || document, true);
				}
			} else if (selector instanceof Dabby) {
				// Copy Dabby collection
				nodes = Array.from(selector);
			} else if (selector instanceof Node || selector === window) {
				// Single node or Window
				nodes = [selector as DOMNode];
			} else if (typeof selector === "function") {
				// Ready function
				const fn = selector as ReadyCallback;
				if (document.readyState !== "loading") {
					fn.call(document, $ as DabbyFactory);
				} else {
					document.addEventListener(
						"DOMContentLoaded",
						() => fn.call(document, $ as DabbyFactory),
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

	/**
	 * Yield each node in the collection so it can be used with `for...of` and spread syntax.
	 */
	*[Symbol.iterator](): Iterator<DOMNode> {
		for (let i = 0; i < this.length; i++) {
			yield this[i];
		}
	}

	/**
	 * Run a callback once for every node in the collection.
	 *
	 * `this` inside the callback is the current node. Returning `false` halts the loop.
	 *
	 * @param callback - Function invoked with the index and node.
	 * @returns The original Dabby collection for chaining.
	 */
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

	/**
	 * Retrieve the underlying nodes from the collection as a plain array.
	 *
	 * @returns A new array containing every node in the collection.
	 */
	get(): DOMNode[];
	/**
	 * Retrieve a single node from the collection.
	 *
	 * Negative indexes count from the end of the collection.
	 *
	 * @param index - Zero-based index of the node to return.
	 * @returns The node at the requested index, or `undefined` if out of range.
	 */
	get(index: number): DOMNode | undefined;
	get(index?: number): DOMNode | DOMNode[] | undefined {
		if (index === undefined) {
			return Array.from(this);
		}
		return this[index >= 0 ? index : index + this.length];
	}

	/**
	 * Map every node in the collection through a callback and gather the results.
	 *
	 * The callback may return a node, an array of nodes, or another Dabby collection;
	 * the returned values are merged into a single new Dabby collection.
	 *
	 * @param callback - Function invoked with the index and node, returning the value(s) to gather.
	 * @returns A new Dabby collection containing the mapped nodes.
	 */
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
