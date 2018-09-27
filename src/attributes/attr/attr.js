import $ from "../../core/dabby/dabby.js";
import "../../utils/isarray/isarray.js";
import "../../utils/each/each.js";
import "../../events/on-off/on-off.js";
import events from "../../internal/getevents/getevents.js";

$.fn.attr = function (prop, value) {
	let isArr = $.isArray(prop),
		i,
		events,
		arr = {};

	// set properties
	if (isArr || value || value === null) {
		i = this.length;

		// normalise to array
		if (!isArr) {
			arr[prop] = value;
			prop = arr;
		}

		while (i--) {
			$.each(prop, (key, val) => {
				if (events.indexOf(key) > -1) {
					$(this[i]).on(key, val);
				} else if (key === "style") {
					this[i].style.cssText = val;
				} else if (key === "class") {
					this[i].className = val;
				} else if (key === "text") {
					this[i].textContent = val;
				} else if (value === null) {
					this[i].removeAttribute(key);
				} else {
					this[i].setAttribute(key, val);
				}
			});
		}
		return this;

	// retrieve properties
	} else if (this[0]) {
		if (prop === "style") {
			return this[0].style.cssText;
		}
		if (prop === "class") {
			return this[0].className;
		}
		return this[0].getAttribute(prop);
	}
};
