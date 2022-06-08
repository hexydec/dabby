import $ from "../../core/dabby/dabby";

import { Dabby, Callable } from "../../types/types";

export type DabbyObjectMap = Dabby & {
    map: (obj: any, callback: Callable) => any[]
} 

($ as DabbyObjectMap).map = (obj, callback) => {
	let keys = Object.keys(obj),
		len = keys.length,
		arr: any[] = [],
		i = 0;

	for (; i < len; i++) {
		const result = callback.call(window, obj[keys[i]], keys[i]);
		if (result != null) { // double equals to capture undefined also
			arr = arr.concat(Array.isArray(result) ? result : [result]);
		}
	}
	return arr;
};
