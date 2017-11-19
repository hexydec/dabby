["width", "height", "innerWidth", "innerHeight", "outerWidth", "outerHeight"].forEach(function (dim) {

	function getAdditionalLength(obj, wh, props) {
		var i = props.length,
			value = 0,
			style = getComputedStyle(obj),
			suffix;

		while (i--) {
			suffix = props[i] === "border" ? "-width" : "";
			value += parseFloat(style.getPropertyValue(props[i] + (wh === "width" ? "-left" : "-top") + suffix)) || 0;
			value += parseFloat(style.getPropertyValue(props[i] + (wh === "width" ? "-right" : "-bottom") + suffix)) || 0;
		}
		return value;
	}

	$.fn[dim] = function (val) {
		var valtype = typeof(val),
			wh = dim.toLowerCase().indexOf("width") > -1 ? "width" : "height", // width or height
			io = dim.indexOf("inner") > -1 ? "inner" : (dim.indexOf("outer") > -1 ? "outer" : ""), // inner outer or neither
			i,
			value,
			whu,
			props,
			param;

		// set value
		if (val !== undefined && valtype !== "boolean") {
			i = this.length;
			while (i--) {
				value = getVal(val, this[i], i);
				if (io) {
					props = ["padding"];
					if (io === "outer") {
						props.push("border");
					}
					value -= getAdditionalLength(this[i], wh, props);
				}
				if (!isNaN(val)) {
					value += "px";
				}
				this[i].style[wh] = value;
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
					value -= getAdditionalLength(this[0], wh, [io === "" ? "padding" : "margin"]);
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
