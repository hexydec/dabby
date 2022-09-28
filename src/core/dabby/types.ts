export type Content = string | Node | NodeList | ArrayLike<Node> | Iterable<Node> | HTMLCollection | Dabby;

export type Selector = Content | Window;

export type DabbyNode = Element | Document | DocumentFragment | Window;

export interface Dabby extends Object {
	new: (dabby: DabbyConstructor, selector: Selector, context?: Selector) => ArrayLike<Dabby>;
	[index: number]: DabbyNode;
	fn?: Object;
	length: number;
	attr?: any;
	nodeType?: number;
};
interface DabbyStatic {
  readonly fn: Dabby
}

export type DabbyConstructor = {
	new(selector: Selector, context?: Selector): Dabby;
};

export type PlainObject = {
	[index: string]: any;
};

export interface DabbyEvent extends CustomEvent {
	event: string;
	selector: any;
	data?: any[];
	_data?: any[];
	detail: any[];
	callback: {
		call: (node: DabbyNode, evt: string, ...args: any) => boolean;
	},
	func: (evt: string) => void;
	once: boolean;
};

export type Int = number & { __int__: void };

export type Position = {top: number, left: number};
