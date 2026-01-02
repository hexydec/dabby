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

	// Method signatures for dynamically added methods
	// These will be implemented in separate module files

	// Attributes
	attr?(prop: string): string | number | null | undefined;
	attr?(prop: string, value: string | number | null | ((this: Element, index: number, currentValue: string | null) => string | number | null)): this;
	attr?(props: Record<string, unknown>): this;

	css?(prop: string): string;
	css?(props: string[]): Record<string, string>;
	css?(prop: string, value: string | number | ((this: Element, index: number, currentValue: string) => string | number)): this;
	css?(props: Record<string, string | number>): this;

	addClass?(cls: string | string[] | ((this: Element, index: number, currentClass: string) => string | string[])): this;
	removeClass?(cls: string | string[] | ((this: Element, index: number, currentClass: string) => string | string[])): this;
	toggleClass?(cls: string | string[] | ((this: Element, index: number, currentClass: string) => string | string[]), state?: boolean): this;
	hasClass?(cls: string): boolean;

	prop?(prop: string): unknown;
	prop?(prop: string, value: unknown | ((this: Element, index: number, currentValue: unknown) => unknown)): this;
	prop?(props: Record<string, unknown>): this;
	removeProp?(prop: string): this;

	data?(): Record<string, unknown>;
	data?(name: string): unknown;
	data?(name: string, value: string | number | boolean | object | null): this;
	data?(props: Record<string, string | number | boolean | object | null>): this;

	hide?(): this;
	show?(): this;
	toggle?(show?: boolean): this;

	// Events
	on?(events: string | Record<string, (this: Element, event: Event, ...args: unknown[]) => void | false>, selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;
	one?(events: string | Record<string, (this: Element, event: Event, ...args: unknown[]) => void | false>, selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;
	off?(events?: string | Record<string, (this: Element, event: Event, ...args: unknown[]) => void | false>, selector?: string | ((this: Element, event: Event, ...args: unknown[]) => void | false), callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;
	trigger?(name: string, data?: unknown): this;
	triggerHandler?(name: string, data?: unknown): unknown;
	// Named events
	focusin?(selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;
	focusout?(selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;
	focus?(selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;
	blur?(selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;
	resize?(selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;
	scroll?(selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;
	unload?(selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;
	click?(selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;
	dblclick?(selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;
	mousedown?(selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;
	mouseup?(selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;
	mousemove?(selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;
	mouseover?(selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;
	mouseout?(selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;
	mouseenter?(selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;
	mouseleave?(selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;
	contextmenu?(selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;
	change?(selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;
	select?(selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;
	keydown?(selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;
	keypress?(selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;
	keyup?(selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;
	error?(selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;
	submit?(selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;

	// Manipulation
	html?(): string | undefined;
	html?(content: string | ((this: Element, index: number, currentHTML: string) => string)): this;
	text?(): string;
	text?(content: string | ((this: Element, index: number, currentText: string) => string)): this;

	// Traversal
	find?(selector: Selector): Dabby;
	filter?(selector: Selector | ((this: Element, index: number) => boolean)): Dabby;
	is?(selector: Selector | ((this: Element, index: number) => boolean)): boolean;
	add?(selector: Selector): Dabby;
	eq?(index: number): Dabby;
	first?(): Dabby;
	last?(): Dabby;
	slice?(start: number, end?: number): Dabby;
	parent?(selector?: Selector): Dabby;
	parents?(selector?: Selector): Dabby;
	parentsUntil?(selector: Selector, filter?: Selector): Dabby;
	children?(selector?: Selector): Dabby;
	siblings?(selector?: Selector): Dabby;
	closest?(selector: Selector, context?: Selector): Dabby;
	has?(selector: Selector): Dabby;
	index?(selector?: Selector): number;
	not?(selector: Selector): Dabby;
	next?(selector?: Selector): Dabby;
	nextAll?(selector?: Selector): Dabby;
	nextUntil?(selector: Selector, filter?: Selector): Dabby;
	prev?(selector?: Selector): Dabby;
	prevAll?(selector?: Selector): Dabby;
	prevUntil?(selector: Selector, filter?: Selector): Dabby;

	// Manipulation
	clone?(withDataAndEvents?: boolean, deepWithDataAndEvents?: boolean | null): Dabby;
	empty?(): this;
	remove?(selector?: Selector): this;
	detach?(selector?: Selector): Dabby;
	append?(...content: unknown[]): this;
	prepend?(...content: unknown[]): this;
	before?(...content: unknown[]): this;
	after?(...content: unknown[]): this;
	replaceWith?(content: unknown): Dabby;
	replaceAll?(content: unknown): Dabby;
	wrap?(html: unknown): this;
	wrapAll?(html: unknown): this;
	unwrap?(selector?: Selector): this;

	// Dimensions
	offset?(): { top: number; left: number } | undefined;
	offset?(coords: { top: number; left: number } | ((this: Element, index: number, currentValue: { top: number; left: number }) => { top: number; left: number })): this;
	offsetParent?(): Dabby;
	position?(): { top: number; left: number } | undefined;
	scrollLeft?(): number | undefined;
	scrollLeft?(pos: number | ((this: Element | Window, index: number, currentValue: number) => number)): this;
	scrollTop?(): number | undefined;
	scrollTop?(pos: number | ((this: Element | Window, index: number, currentValue: number) => number)): this;
	width?(): number | undefined;
	width?(val: number | string | ((this: Element | Window | Document, index: number, currentValue: number) => number | string)): this;
	height?(): number | undefined;
	height?(val: number | string | ((this: Element | Window | Document, index: number, currentValue: number) => number | string)): this;
	innerWidth?(): number | undefined;
	innerWidth?(val: number | string | ((this: Element | Window | Document, index: number, currentValue: number) => number | string)): this;
	innerHeight?(): number | undefined;
	innerHeight?(val: number | string | ((this: Element | Window | Document, index: number, currentValue: number) => number | string)): this;
	outerWidth?(): number | undefined;
	outerWidth?(val: number | string | boolean | ((this: Element | Window | Document, index: number, currentValue: number) => number | string)): this;
	outerHeight?(): number | undefined;
	outerHeight?(val: number | string | boolean | ((this: Element | Window | Document, index: number, currentValue: number) => number | string)): this;

	// Ajax
	load?(url: string, data: string | { [key: string]: any }, success: (this: Element, response: any, status: string | number, xhr: XMLHttpRequest) => void): this;
	load?(url: string, success: (this: Element, response: any, status: string | number, xhr: XMLHttpRequest) => void): this;
	load?(url: string): this;
	serialize?(): string;
	val?(): string | number | string[] | undefined;
	val?(value: string | number | string[] | ((this: Element, index: number, currentValue: string | number | string[] | undefined) => string | number | string[] | undefined)): this;
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
