import $ from "../../core/dabby/dabby";

import { Dabby, Callable} from '../../types/types';

interface EachObject {
    [key: number | string]: any;
    length?: number;
}

export type DabbyObjectEach = Dabby & {
    each: (obj: EachObject , callback: Callable) => EachObject | Array<any> | Object;
} 

($ as DabbyObjectEach).each = (obj, callback) => {
	const isArr = Array.isArray(obj) || obj.hasOwnProperty('length'),
		keys = isArr ? [...(obj as Array<number>).keys()] : [...Object.keys(obj)], // only get keys if object
		len = keys.length

	for (let i = 0; i < len; i++) {
		let key: string | number = keys[i]; // get index or key
		if (callback.call(obj[key], key, obj[key]) === false) {
			break; // stop if callback returns false
		}
	}
	return obj;
};
