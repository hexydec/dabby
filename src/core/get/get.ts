import $ from "../../core/dabby/dabby";
import { DabbyNode } from "../dabby/types";

$.fn.get = function (i: number | undefined): DabbyNode|DabbyNode[] {
	return i === undefined ? Array.from(this) : this[i >= 0 ? i : i + this.length];
};
