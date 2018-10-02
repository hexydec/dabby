import $ from "../../core/core.js";
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
			let itemCoords = Object.create(getVal(coords, this[i], i, $(this[i]).offset())); // copy the object

			if (itemCoords.top !== undefined && itemCoords.left !== undefined) {
				let style = getComputedStyle(this[i]);
				pos = style.getPropertyValue("position");

				// set position relative if static
				if (pos === "static") {
					this[i].style.position = "relative";
				}

				// add current offset
				itemCoords.top += parseFloat(style.getPropertyValue("top")) || 0;
				itemCoords.left += parseFloat(style.getPropertyValue("left")) || 0;

				// remove parent offset and viewport scroll
				if (pos !== "fixed") {
					itemCoords.top -= doc.scrollTop + rect.top;
					itemCoords.left -= doc.scrollLeft + rect.left;
				}

				// set offset
				this[i].style.top = itemCoords.top + "px";
				this[i].style.left = itemCoords.left + "px";
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
