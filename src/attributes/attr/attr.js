import $ from "../../core/core.js";
import "../../utils/each/each.js";
import "../../events/on/on.js";
import events from "../../internal/getevents/getevents.js";

$.fn.attr = function (prop, value) {
	let isObj = typeof prop !== "string",
		i,
		obj = {};

	// set properties
	if (isObj || value || value === null) {
		i = this.length;

		// normalise to object
		if (!isObj) {
			obj[prop] = value;
			prop = obj;
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
