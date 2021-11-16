import $ from "../../core/core.js";
import "../../utils/each/each.js";
import "../../events/on/on.js";
import events from "../../internal/getevents/getevents.js";
import getVal from "../../internal/getval/getval.js";

$.fn.attr = function (prop, value) {
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
			if (events.includes(key)) {
				this.on(key, val);

			// process other values
			} else {
				let i = this.length,
					values = getVal(this, val, obj => $(obj).attr(key));
				while (i--) {
					switch (key) {
						case  "style":
							this[i].style.cssText = values[i];
							break;
						case "class":
							this[i].className = values[i];
							break;
						case "text":
							this[i].textContent = values[i];
							break;
						default:
							if (values[i] === null) {
								this[i].removeAttribute(key);
							} else {
								this[i].setAttribute(key, values[i]);
							}
					}
				}
			}
		});
		return this;
	}

	// read attr
	if (this[0]) {

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
