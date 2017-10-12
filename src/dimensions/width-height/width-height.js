/**
 * @todo Currently unknown how units other than px are handled in for example padding which is subtracted from calculated dimension
 */

["width", "height", "innerWidth", "innerHeight", "outerWidth", "outerHeight"].forEach(function (dim) {

	function getAdditionalLength(obj, wh, io, margin) {
		var props = [],
			i,
			value = 0;
		if (io !== "") {
			props.push("padding");
			if (io === "outer") {
				props.push("border");
				if (margin) {
					props.push("margin");
				}
			}
		}
		i = props.length;
		while (i--) {
			value += parseFloat(obj.style[props[i] + (wh === "width" ? "Left" : "Top")]) || 0;
			value += parseFloat(obj.style[props[i] + (wh === "width" ? "Right" : "Bottom")]) || 0;
		}
		return value;
	}

	$.fn[dim] = function (val) {
		var valtype = typeof(val),
			style,
			wh = dim.toLowerCase().indexOf("width") > -1 ? "width" : "height",
			io = dim.indexOf("inner") > -1 ? "inner" : (dim.indexOf("outer") > -1 ? "outer" : ""),
			i,
			value,
			whu;

		// set value
		if (val !== undefined && valtype !== "boolean") {
			i = this.length;
			while (i--) {
				value = getVal(this[i], val, i);
				if (io) {
					value -= getAdditionalLength(this[i], wh, io);
				}
				this[i].style[wh] = getVal(this[i], value, i, true);
			}
			return this;

		// get value
		} else if (this[0]) {
			whu = wh === "width" ? "Width" : "Height";

			// window
			if (this[0] === window) {
				if (io === "inner") {
					return this[0].document.documentElement["client" + whu];
				} else {
					return this[0]["inner" + whu];
				}

			// document
			} else if (this[0].nodeType === 9) {
				return this[0].documentElement["scroll" + whu];

			// element
			} else {
				var param = io === "outer" ? "offset" : "client",
					value = this[0][param + whu],
					style,
					prop;

				// add padding on, or if outer and margins requested, add margins on
				if (io === "" || (io === "outer" && val === true)) {
					style = window.getComputedStyle(this[0]);
					prop = io === "" ? "padding" : "margin";
					value -= parseFloat(this[0].style[prop + (io === "width" ? "Left" : "Top")]) || 0;
					value -= parseFloat(this[0].style[prop + (io === "width" ? "Right" : "Bottom")]) || 0; // do these return PX?
				}
				return value;
			}
		}
	};
});
