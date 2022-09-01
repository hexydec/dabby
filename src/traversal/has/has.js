import $ from "../../core/dabby/dabby.js";

$.fn.has = function (selector) {
	const compare = $(selector).get();
	return $(Array.from(this).filter(node => compare.some(item => node.contains(item))));
};
