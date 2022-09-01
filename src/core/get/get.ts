import $ from "../../core/dabby/dabby";

$.fn.get = function (i: number | undefined): Node|Node[] {
	return i === undefined ? Array.from(this) : this[i >= 0 ? i : i + this.length];
};
