import { Dabby, Callable } from '../../types/types';
interface EachObject {
    [key: number | string]: any;
    length?: number;
}
export declare type DabbyObjectEach = Dabby & {
    each: (obj: EachObject, callback: Callable) => EachObject | Array<any> | Object;
};
export {};
