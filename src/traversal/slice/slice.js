import $, {Dabby} from "../../core/dabby/dabby.js";

Object.defineProperty(Dabby.prototype, "slice", {
	value: function (start, end) {
		return $(Array.from(this).slice(start, end));
	}
});
