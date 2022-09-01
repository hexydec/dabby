import $ from "../../core/dabby/dabby";

$.fn.triggerHandler = function (name: any, data: any[]) {
	let ret;
	(this[0].events || []).forEach((evt: any) => {
		ret = evt.func.call(this[0], {
			detail: data,
			target: this[0],
			currentTarget: this[0]
		});
	});
	return ret;
};
