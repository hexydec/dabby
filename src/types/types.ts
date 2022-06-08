export interface Callable {
  <T>(this: T): T;
  call<T>(this: any, ...argArray: any[]): T;
}

export interface DabbyObject {
	[x: number]: any;
	fn?: (obj: any) => Dabby,
  length?: number
  attr?: any
}

export type Selector =
  | string
  | ArrayLike<Node>
  | Node
  | Document
  | Iterable<Node>
  | Callable;
export type Context = Selector & Object;
export type Dabby = (selector: Selector, context?: Context) => DabbyObject;


