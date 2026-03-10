export type DOMNode = Element | Document | DocumentFragment | Window;

// Import Dabby class to use as type
import type { Dabby } from "./core/dabby/dabby.js";
export type { Dabby };

export type Selector = string | DOMNode | DOMNode[] | NodeList | HTMLCollection | Dabby;

export type ReadyCallback = (this: Document, $: DabbyFactory) => void;

export interface DabbyConstructor {
	new (selector?: Selector | ReadyCallback, context?: Selector | Record<string, unknown>): Dabby;
	readonly prototype: Dabby;
}

export interface DabbyFactory {
	(selector?: Selector | ReadyCallback, context?: Selector | Record<string, unknown>): Dabby;
	readonly prototype: Dabby;
	readonly fn: Dabby;
	// Static methods are added dynamically by module files and typed via ModularDabbyStatics
	[key: string]: unknown;
}

export type DabbyStatic = DabbyFactory & {
	[key: string]: unknown;
};
