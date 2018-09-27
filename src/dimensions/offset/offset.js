import $ from "../../core/dabby/dabby.js";
import getVal from "../../internal/getval/getval.js";

$.fn.offset = function (coords) {
	const doc = document.documentElement;
	let rect,
		i = this.length,
		pos;

	// set
	if (coords) {
		while (i--) {

			// if coords is callback, generate value
			rect = this[i].getBoundingClientRect();
			coords = getVal(coords, this[i], i, $(this[i]).offset());

			if (coords.top !== undefined && coords.left !== undefined) {

				// set position relative if static
				let style = getComputedStyle(this[i]);
				pos = style.getPropertyValue("position");
				if (pos === "static") {
					this[i].style.position = "relative";
				}

				// set offset
				this[i].style.top = (parseFloat(coords.top) - (pos === "fixed" ? 0 : doc.scrollTop + rect.top - parseFloat(style.getPropertyValue("top")))) + "px";
				this[i].style.left = (parseFloat(coords.left) - (pos === "fixed" ? 0 : doc.scrollLeft + rect.left - parseFloat(style.getPropertyValue("left")))) + "px";
			}
		}
		return this;

	// get
	} else if (this[0]) {
		pos = this[0].style.position === "fixed";
		rect = this[0].getBoundingClientRect();
		return {
			top: rect.top + (pos ? 0 : doc.scrollTop),
			left: rect.left + (pos ? 0 : doc.scrollLeft)
		};
	}
};
