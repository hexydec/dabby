import type { Dabby, Selector } from "./types.js";

/**
 * DabbyFull interface - represents the full build of Dabby with all methods guaranteed to be present.
 * This is the type that should be used when importing the full build (import $ from 'dabbyjs').
 */
export interface DabbyFull extends Omit<Dabby, keyof DabbyFullMethods> {
	// All methods from the full build are required (not optional)

	// Attributes
	attr(prop: string): string | number | null | undefined;
	attr(prop: string, value: string | number | null | ((this: Element, index: number, currentValue: string | null) => string | number | null)): this;
	attr(props: Record<string, unknown>): this;

	css(prop: string): string;
	css(props: string[]): Record<string, string>;
	css(prop: string, value: string | number | ((this: Element, index: number, currentValue: string) => string | number)): this;
	css(props: Record<string, string | number>): this;

	addClass(cls: string | string[] | ((this: Element, index: number, currentClass: string) => string | string[])): this;
	removeClass(cls: string | string[] | ((this: Element, index: number, currentClass: string) => string | string[])): this;
	toggleClass(cls: string | string[] | ((this: Element, index: number, currentClass: string) => string | string[]), state?: boolean): this;
	hasClass(cls: string): boolean;

	prop(prop: string): unknown;
	prop(prop: string, value: unknown | ((this: Element, index: number, currentValue: unknown) => unknown)): this;
	prop(props: Record<string, unknown>): this;
	removeProp(prop: string): this;

	data(): Record<string, unknown>;
	data(name: string): unknown;
	data(name: string, value: string | number | boolean | object | null): this;
	data(props: Record<string, string | number | boolean | object | null>): this;

	hide(): this;
	show(): this;
	toggle(show?: boolean): this;

	// Events
	on(events: string | Record<string, (this: Element, event: Event, ...args: unknown[]) => void | false>, selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;
	one(events: string | Record<string, (this: Element, event: Event, ...args: unknown[]) => void | false>, selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;
	off(events?: string | Record<string, (this: Element, event: Event, ...args: unknown[]) => void | false>, selector?: string | ((this: Element, event: Event, ...args: unknown[]) => void | false), callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;
	trigger(name: string, data?: unknown): this;
	triggerHandler(name: string, data?: unknown): unknown;

	// Named events
	focusin(selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;
	focusout(selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;
	focus(selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;
	blur(selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;
	resize(selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;
	scroll(selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;
	unload(selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;
	click(selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;
	dblclick(selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;
	mousedown(selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;
	mouseup(selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;
	mousemove(selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;
	mouseover(selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;
	mouseout(selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;
	mouseenter(selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;
	mouseleave(selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;
	contextmenu(selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;
	change(selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;
	select(selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;
	keydown(selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;
	keypress(selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;
	keyup(selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;
	error(selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;
	submit(selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;

	// Manipulation
	html(): string | undefined;
	html(content: string | ((this: Element, index: number, currentHTML: string) => string)): this;
	text(): string;
	text(content: string | ((this: Element, index: number, currentText: string) => string)): this;

	// Traversal
	find(selector: Selector): DabbyFull;
	filter(selector: Selector | ((this: Element, index: number) => boolean)): DabbyFull;
	is(selector: Selector | ((this: Element, index: number) => boolean)): boolean;
	add(selector: Selector): DabbyFull;
	eq(index: number): DabbyFull;
	first(): DabbyFull;
	last(): DabbyFull;
	slice(start: number, end?: number): DabbyFull;
	parent(selector?: Selector): DabbyFull;
	parents(selector?: Selector): DabbyFull;
	parentsUntil(selector: Selector, filter?: Selector): DabbyFull;
	children(selector?: Selector): DabbyFull;
	siblings(selector?: Selector): DabbyFull;
	closest(selector: Selector, context?: Selector): DabbyFull;
	has(selector: Selector): DabbyFull;
	index(selector?: Selector): number;
	not(selector: Selector): DabbyFull;
	next(selector?: Selector): DabbyFull;
	nextAll(selector?: Selector): DabbyFull;
	nextUntil(selector: Selector, filter?: Selector): DabbyFull;
	prev(selector?: Selector): DabbyFull;
	prevAll(selector?: Selector): DabbyFull;
	prevUntil(selector: Selector, filter?: Selector): DabbyFull;

	// Manipulation
	clone(withDataAndEvents?: boolean, deepWithDataAndEvents?: boolean | null): DabbyFull;
	empty(): this;
	remove(selector?: Selector): this;
	detach(selector?: Selector): DabbyFull;
	append(...content: unknown[]): this;
	prepend(...content: unknown[]): this;
	before(...content: unknown[]): this;
	after(...content: unknown[]): this;
	replaceWith(content: unknown): DabbyFull;
	replaceAll(content: unknown): DabbyFull;
	wrap(html: unknown): this;
	wrapAll(html: unknown): this;
	unwrap(selector?: Selector): this;

	// Dimensions
	offset(): { top: number; left: number } | undefined;
	offset(coords: { top: number; left: number } | ((this: Element, index: number, currentValue: { top: number; left: number }) => { top: number; left: number })): this;
	offsetParent(): DabbyFull;
	position(): { top: number; left: number } | undefined;
	scrollLeft(): number | undefined;
	scrollLeft(pos: number | ((this: Element | Window, index: number, currentValue: number) => number)): this;
	scrollTop(): number | undefined;
	scrollTop(pos: number | ((this: Element | Window, index: number, currentValue: number) => number)): this;
	width(): number | undefined;
	width(val: number | string | ((this: Element | Window | Document, index: number, currentValue: number) => number | string)): this;
	height(): number | undefined;
	height(val: number | string | ((this: Element | Window | Document, index: number, currentValue: number) => number | string)): this;
	innerWidth(): number | undefined;
	innerWidth(val: number | string | ((this: Element | Window | Document, index: number, currentValue: number) => number | string)): this;
	innerHeight(): number | undefined;
	innerHeight(val: number | string | ((this: Element | Window | Document, index: number, currentValue: number) => number | string)): this;
	outerWidth(): number | undefined;
	outerWidth(val: number | string | boolean | ((this: Element | Window | Document, index: number, currentValue: number) => number | string)): this;
	outerHeight(): number | undefined;
	outerHeight(val: number | string | boolean | ((this: Element | Window | Document, index: number, currentValue: number) => number | string)): this;

	// Ajax
	load(url: string, data: string | { [key: string]: any }, success: (this: Element, response: any, status: string | number, xhr: XMLHttpRequest) => void): this;
	load(url: string, success: (this: Element, response: any, status: string | number, xhr: XMLHttpRequest) => void): this;
	load(url: string): this;
	serialize(): string;
	val(): string | number | string[] | undefined;
	val(value: string | number | string[] | ((this: Element, index: number, currentValue: string | number | string[] | undefined) => string | number | string[] | undefined)): this;
}

// Helper type to extract method names
interface DabbyFullMethods {
	attr: any;
	css: any;
	addClass: any;
	removeClass: any;
	toggleClass: any;
	hasClass: any;
	prop: any;
	removeProp: any;
	data: any;
	hide: any;
	show: any;
	toggle: any;
	on: any;
	one: any;
	off: any;
	trigger: any;
	triggerHandler: any;
	focusin: any;
	focusout: any;
	focus: any;
	blur: any;
	resize: any;
	scroll: any;
	unload: any;
	click: any;
	dblclick: any;
	mousedown: any;
	mouseup: any;
	mousemove: any;
	mouseover: any;
	mouseout: any;
	mouseenter: any;
	mouseleave: any;
	contextmenu: any;
	change: any;
	select: any;
	keydown: any;
	keypress: any;
	keyup: any;
	error: any;
	submit: any;
	html: any;
	text: any;
	find: any;
	filter: any;
	is: any;
	add: any;
	eq: any;
	first: any;
	last: any;
	slice: any;
	parent: any;
	parents: any;
	parentsUntil: any;
	children: any;
	siblings: any;
	closest: any;
	has: any;
	index: any;
	not: any;
	next: any;
	nextAll: any;
	nextUntil: any;
	prev: any;
	prevAll: any;
	prevUntil: any;
	clone: any;
	empty: any;
	remove: any;
	detach: any;
	append: any;
	prepend: any;
	before: any;
	after: any;
	replaceWith: any;
	replaceAll: any;
	wrap: any;
	wrapAll: any;
	unwrap: any;
	offset: any;
	offsetParent: any;
	position: any;
	scrollLeft: any;
	scrollTop: any;
	width: any;
	height: any;
	innerWidth: any;
	innerHeight: any;
	outerWidth: any;
	outerHeight: any;
	load: any;
	serialize: any;
	val: any;
}
