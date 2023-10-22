import $ from "../../core/dabby/dabby.js";
import getVal from "../../internal/getval/getval.js";
import isWindow from "../../internal/iswindow/iswindow.js";

["width", "innerWidth", "outerWidth", "height", "innerHeight", "outerHeight"].forEach((dim, i) => {
	Object.defineProperty($.fn, dim, {
		value: function (val) {
			const width = i < 3,
				wh = width ? "width" : "height", // width or height
				whu = width ? "Width" : "Height", // with uppercase letter
				inner = i % 3 === 1,
				outer = i % 3 === 2,
				io = inner || outer,
				pos = width ? ["Left", "Right"] : ["Top", "Bottom"];

			// set value
			if (val !== undefined && typeof val !== "boolean") {
				let values = getVal(this, val, obj => $(obj)[dim]()),
					i = this.length,
					props = [],
					style;
				while (i--) {

					// add additional lengths
					if (io) {

						// fetch current style and build properties
						pos.forEach(item => {
							props.push("padding" + item);
							if (outer) {
								props.push("border" + item + "Width");
							}
						});

						// set width to convert to a px value
						if (isNaN(values[i]) && !values[i].includes("px")) {
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
				if (this[0].nodeType === 9) { // Node.DOCUMENT_NODE (document)
					return this[0].documentElement["scroll" + whu];
				}

				// element
				if (!isWindow(this[0])) {
					let value = this[0][(outer ? "offset" : "client") + whu];

					// add padding on, or if outer and margins requested, add margins on
					if (!io || (outer && val === true)) {
						const style = getComputedStyle(this[0]);
						pos.forEach(item => value += parseFloat(style[(io ? "margin" : "padding") + item]) * (io ? 1 : -1));
					}
					return value;
				}

				// window
				if (inner) {
					return this[0].document.documentElement["client" + whu];
				}

				return this[0]["inner" + whu];
			}
		}
	});
});
