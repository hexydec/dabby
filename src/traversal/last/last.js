import {Dabby} from "../../core/dabby/dabby.js";
import "../eq/eq.js";

Object.defineProperty(Dabby.prototype, "last", {
	value: function () {
		return this.eq(-1);
	}
});