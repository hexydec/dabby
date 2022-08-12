export type Selector =
    | string
    | Document
    | Iterable<Node>
    | ArrayLike<Node>
    | NodeList
    | HTMLCollection
    | Node
    | Window
    | Function
    | DabbyObject;

type Dabby = (dabby: DabbyConstructor, selector: Selector, context?: Selector) => ArrayLike<DabbyObject>;

export type DabbyNode = Node | Document | Window;

export interface DabbyObject {
    new: Dabby;
    [index: number]: DabbyNode,
    fn?: (obj: any) => Dabby;
    length: number;
    attr?: any;
}

export type DabbyConstructor = {
    new(selector: Selector, context?: Selector): DabbyObject;
};
