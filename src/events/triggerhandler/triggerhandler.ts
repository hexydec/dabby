import $ from "../../core/dabby/dabby";
import { DabbyEvent, Dabby } from "../../core/dabby/types";

$.fn.triggerHandler = function (name: string, data: any[]) : Dabby {
	let ret;
	(this[0].events || []).forEach((evt: DabbyEvent) => {
		ret = evt.func.call(this[0], {
			detail: data,
			target: this[0],
			currentTarget: this[0]
		});
	});
	return ret;
};
