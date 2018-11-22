import $ from "../../core/core.js";
import getVal from "../../internal/getval/getval.js";
import "../../utils/iswindow/iswindow.js";

["width", "height", "innerWidth", "innerHeight", "outerWidth", "outerHeight"].forEach(dim => {

	$.fn[dim] = function (val) {
		const valtype = typeof(val),
			wh = dim.toLowerCase().indexOf("width") > -1 ? "width" : "height", // width or height
			io = dim.indexOf("inner") > -1 ? "inner" : (dim.indexOf("outer") > -1 ? "outer" : ""), // inner outer or neither
			first = wh === "width" ? "Left" : "Top", // first dimension
			second = wh === "width" ? "Right" : "Bottom"; // second dimension
		let i = this.length,
			value,
			props,
			style;

		// set value
		if (val !== undefined && valtype !== "boolean") {
			const values = getVal(this, val, obj => obj[dim]);
			while (i--) {

				// add additional lengths
				if (io) {

					// fetch current style and build properties
					style = getComputedStyle(this[i]);
					props = [
						"padding" + first,
						"padding" + second
					];
					if (io === "outer") {
						props.push("border" + first + "Width");
						props.push("border" + second + "Width");
					}

					// set width to convert to a px value
					if (isNaN(values[i]) && values[i].indexOf("px") === -1) {
						this[i].style[wh] = values[i];
						props.push(wh);
						values[i] = 0; // reset to 0
					}

					// add values
					props.forEach(val => values[i] -= parseFloat(style[val]));
				}
				this[i].style[wh] = values[i] + (isNaN(values[i]) ? "" : "px");
			}
			return this;
		}

		// get value
		if (this[0]) {
			let whu = wh === "width" ? "Width" : "Height",
				param;

			// document
			if (this[0].nodeType === Node.DOCUMENT_NODE) {
				return this[0].documentElement["scroll" + whu];
			}

			// element
			if (!$.isWindow(this[0])) {
				value = this[0][(io === "outer" ? "offset" : "client") + whu];

				// add padding on, or if outer and margins requested, add margins on
				if (io === "" || (io === "outer" && val === true)) {
					style = getComputedStyle(this[0]);
					param = io ? "margin" : "padding";
					props = [param + first, param + second];
					props.forEach(val => value += parseFloat(style[val]) * (io ? 1 : -1));
				}
				return value;
			}

			// window
			if (io === "inner") {
				return this[0].document.documentElement["client" + whu];
			}

			return this[0]["inner" + whu];
		}
	};
});
