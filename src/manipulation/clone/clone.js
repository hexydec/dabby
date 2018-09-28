import $ from "../../core/core.js";

$.fn.clone = function () {
	let nodes = [],
		i = this.length;

	while (i--) {
		nodes[i] = this[i].cloneNode(true);
	}
	return $(nodes);
};
