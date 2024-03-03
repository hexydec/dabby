import {Dabby} from "../../core/dabby/dabby.js";

Object.defineProperty(Dabby.prototype, "empty", {
	value: function () {
		let i = this.length;
		while (i--) {
			while (this[i].firstChild) {
				this[i].removeChild(this[i].firstChild);
			}
		}
		return this;
	}
});
