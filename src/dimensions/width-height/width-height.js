import $ from "../../core/core.js";
import getVal from "../../internal/getval/getval.js";
import "../../utils/iswindow/iswindow.js";

["width", "height", "innerWidth", "innerHeight", "outerWidth", "outerHeight"].forEach(dim => {

	const getAdditionalLength = (obj, wh, props) => {
		const style = getComputedStyle(obj);
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
			param;

		// set value
		if (val !== undefined && valtype !== "boolean") {
			while (i--) {

				// set base value
				value = getVal(val, this[i], i, this[i][dim]);
				if (!isNaN(val)) {
					value += "px";
				}
				this[i].style[wh] = value; // set here so we can convert to px

				// add additional lengths
				if (io) {
					value = parseFloat(getComputedStyle(this[i]).getPropertyValue(wh));
					props = ["padding"];
					if (io === "outer") {
						props.push("border");
					}
					value -= getAdditionalLength(this[i], wh, props);
					if (!isNaN(val)) {
						value += "px";
					}
					this[i].style[wh] = value;
				}
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
					value += getAdditionalLength(this[0], wh, [io ? "margin" : "padding"]) * (io ? 1 : -1); // add margin, minus padding
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
