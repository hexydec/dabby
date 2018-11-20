import $ from "../../core/core.js";
import getVal from "../../internal/getval/getval.js";
import "../../utils/iswindow/iswindow.js";

["width", "height", "innerWidth", "innerHeight", "outerWidth", "outerHeight"].forEach(dim => {

	const getAdditionalLength = (style, wh, props) => {
		let i = props.length,
			value = 0,
			suffix;

		while (i--) {
			suffix = props[i] === "border" ? "-width" : "";
			value += parseFloat(style.getPropertyValue(props[i] + (wh === "width" ? "-left" : "-top") + suffix)) || 0;
			value += parseFloat(style.getPropertyValue(props[i] + (wh === "width" ? "-right" : "-bottom") + suffix)) || 0;
		}
		return value;
	};

	$.fn[dim] = function (val) {
		const valtype = typeof(val),
			wh = dim.toLowerCase().indexOf("width") > -1 ? "width" : "height", // width or height
			io = dim.indexOf("inner") > -1 ? "inner" : (dim.indexOf("outer") > -1 ? "outer" : ""); // inner outer or neither
		let i = this.length,
			value,
			whu,
			props,
			param,
			style;

		// set value
		if (val !== undefined && valtype !== "boolean") {
			const values = getVal(this, val, obj => obj[dim]);
			while (i--) {

				// add additional lengths
				if (io) {
					style = getComputedStyle(this[i]);

					// convert to px if other unit
					if (isNaN(values[i]) && values[i].indexOf("px") === -1) {
						this[i].style[wh] = values[i];
						values[i] = style.getPropertyValue(wh);
					}

					// take off px
					values[i] = parseFloat(values[i]);

					// get additional length
					props = ["padding"];
					if (io === "outer") {
						props.push("border");
					}
					values[i] -= getAdditionalLength(style, wh, props);
				}
				this[i].style[wh] = values[i] + (isNaN(values[i]) ? "" : "px");
			}
			return this;

		// get value
		} else if (this[0]) {
			whu = wh === "width" ? "Width" : "Height";

			// document
			if (this[0].nodeType === Node.DOCUMENT_NODE) {
				return this[0].documentElement["scroll" + whu];

			// element
			} else if (!$.isWindow(this[0])) {
				param = io === "outer" ? "offset" : "client";
				value = this[0][param + whu];

				// add padding on, or if outer and margins requested, add margins on
				if (io === "" || (io === "outer" && val === true)) {
					style = getComputedStyle(this[0]);
					value += getAdditionalLength(style, wh, [io ? "margin" : "padding"]) * (io ? 1 : -1); // add margin, minus padding
				}
				return value;

			// window
			} else if (io === "inner") {
				return this[0].document.documentElement["client" + whu];
			} else {
				return this[0]["inner" + whu];
			}
		}
	};
});
