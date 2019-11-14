import $ from "../../core/core.js";
import "../../utils/each/each.js";
import "../../events/on/on.js";
import events from "../../internal/getevents/getevents.js";
import getVal from "../../internal/getval/getval.js";

$.fn.attr = function (prop, value) {
	if (this.length) {
		let isObj = typeof prop !== "string",
			obj = {};

		// set properties
		if (isObj || value !== undefined) {

			// normalise to object
			if (!isObj) {
				obj[prop] = value;
				prop = obj;
			}

			$.each(prop, (key, val) => {

				// if event, hand it off to $.fn.on()
				if (events.indexOf(key) > -1) {
					this.on(key, val);

				// process other values
				} else {
					let i = this.length,
						values = getVal(this, val, obj => $(obj).attr(key));
					while (i--) {
						if (key === "style") {
							this[i].style.cssText = values[i];
						} else if (key === "class") {
							this[i].className = values[i];
						} else if (key === "text") {
							this[i].textContent = values[i];
						} else if (values[i] === null) {
							this[i].removeAttribute(key);
						} else {
							this[i].setAttribute(key, values[i]);
						}
					}
				}
			});
			return this;
		}

		// retrieve properties
		if (prop === "style") {
			return this[0].style.cssText;
		}
		if (prop === "class") {
			return this[0].className;
		}
		return this[0].getAttribute(prop);
	}
};
