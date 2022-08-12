import $ from "../../core/core.js";

$.fn.get = function (i: number | undefined) {
	return i === undefined ? Array.from(this) : this[i >= 0 ? i : i + this.length];
};
