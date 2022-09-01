import $ from "../../core/dabby/dabby";

type MapObject = {
	[key: string]: any;
};

$.map = (obj: ArrayLike<MapObject>, callback: Function) => {
	let keys = Object.keys(obj).map(Number),
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
