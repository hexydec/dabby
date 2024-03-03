import $, {Dabby} from "../../core/dabby/dabby.js";

Object.defineProperty(Dabby.prototype, "eq", {
	value: function (i) {
		return $(this[i < 0 ? i + this.length : i]);
	}
});
