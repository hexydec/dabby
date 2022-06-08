export interface Callable {
    <T>(this: T): T;
    call<T>(this: any, ...argArray: any[]): T;
}
export interface DabbyObject {
    [x: number]: any;
    fn?: (obj: any) => Dabby;
    length?: number;
    attr?: any;
}
export declare type Selector = string | ArrayLike<Node> | Node | Document | Iterable<Node> | Callable;
export declare type Context = Selector & Object;
export declare type Dabby = (selector: Selector, context?: Context) => DabbyObject;
