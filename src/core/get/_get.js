import $ from "../../core/dabby/dabby";

$.fn.get = function (i) {
	return i === undefined ? Array.from(this) : this[i >= 0 ? i : i + this.length];
};
