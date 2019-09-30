import $ from "../../core/core.js";
import getVal from "../../internal/getval/getval.js";
import "../../utils/iswindow/iswindow.js";

["width", "height", "innerWidth", "innerHeight", "outerWidth", "outerHeight"].forEach(dim => {

	$.fn[dim] = function (val) {
		const width = dim.indexOf("d") > -1,
			wh = width ? "width" : "height", // width or height
			whu = width ? "Width" : "Height", // with uppercase letter
			io = dim.indexOf("inner") > -1 ? "inner" : (dim.indexOf("outer") > -1 ? "outer" : ""), // inner outer or neither
			pos = [
				width ? "Left" : "Top", // first dimension
				width ? "Right" : "Bottom" // second dimension
			];

		// set value
		if (val !== undefined && typeof val !== "boolean") {
			let values = getVal(this, val, obj => obj[dim]),
				i = this.length,
				props = [],
				style;
			while (i--) {

				// add additional lengths
				if (io) {

					// fetch current style and build properties
					pos.forEach(item => {
						props.push("padding" + item);
						if (io === "outer") {
							props.push("border" + item + "Width");
						}
					});

					// set width to convert to a px value
					if (isNaN(values[i]) && values[i].indexOf("px") === -1) {
						this[i].style[wh] = values[i];
						props.push(wh);
						values[i] = 0; // reset to 0
					}

					// add values
					style = getComputedStyle(this[i]);
					props.forEach(val => values[i] -= parseFloat(style[val]));
				}
				this[i].style[wh] = values[i] + (isNaN(values[i]) ? "" : "px");
			}
			return this;
		}

		// get value
		if (this[0]) {

			// document
			if (this[0].nodeType === Node.DOCUMENT_NODE) {
				return this[0].documentElement["scroll" + whu];
			}

			// element
			if (!$.isWindow(this[0])) {
				let value = this[0][(io === "outer" ? "offset" : "client") + whu];

				// add padding on, or if outer and margins requested, add margins on
				if (io === "" || (io === "outer" && val === true)) {
					const style = getComputedStyle(this[0]);
					pos.forEach(item => value += parseFloat(style[(io ? "margin" : "padding") + item]) * (io ? 1 : -1));
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
