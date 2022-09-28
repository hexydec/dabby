import $ from "../../core/dabby/dabby";
import { DabbyNode, Dabby } from "../../core/dabby/types";
import getVal from "../../internal/getval/getval.js";
import isWindow from "../../internal/iswindow/iswindow.js";

["scrollLeft", "scrollTop"].forEach((func, f) => {
	$.fn[func] = function (pos: number) : Dabby | number {

		// set
		if (pos !== undefined) {
			let i = this.length,
				values = getVal(this, pos, (obj: DabbyNode & {[k:string]: number}) : number => obj[func]);

			while (i--) {
				this[i][func] = values[i];
			};
			return this;
		}

		// get
		if (this[0]) {
			return this[0][isWindow(this[0]) ? (f ? "pageYOffset" : "pageXOffset") : func];
		}
	};
});
