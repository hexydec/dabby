import $ from "../../core/dabby/dabby";

$.fn.map = function (callback: Function) : any[] {
	let len = this.length,
		values = [],
		i = 0;

	for (; i < len; i++) {
		values.push(callback.call(this[i], i, this[i]));
	}
	return values;
};
