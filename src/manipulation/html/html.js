import {Dabby} from "../../core/dabby/dabby.js";
import getVal from "../../internal/getval/getval.js";

Object.defineProperty(Dabby.prototype, "html", {
	value: function (html) {

		// set
		if (html !== undefined) {
			let i = this.length,
				values = getVal(this, html, obj => obj.innerHTML);
			while (i--) {
				this[i].innerHTML = values[i];
			}
			return this;
		}

		// get
		if (this[0]) {
			return this[0].innerHTML;
		}
	}
});