$.fn.attr = function (prop, value) {

	// set array of style properties
	if (prop === "style" && value instanceof Object) {
		setCss(this, value);

	// set other properties
	} else if (value || value === "") {
		var i = this.length,
			events = $.isFunction(getEvents) ? getEvents() : [];

		while (i--) {
			if (events.indexOf(prop) > -1) {
				$(this[i]).on(prop, value);
			} else if (prop === "style") {
				this[i].style.cssText = value;
			} else if (prop === "class") {
				this[i].className = value;
			} else if (prop === "text") {
				this[i].textContent = value;
			} else if (value === "") {
				this[i].removeAttribute(prop);
			} else {
				this[i].setAttribute(prop, value);
			}
		}
		return this;
	}

	// retrieve properties
	if (this[0]) {
		if (prop === "style") {
			return this[0].style.cssText;
		}
		if (prop === "class") {
			return this[0].className;
		}
		return this[0].getAttribute(prop);
	}
};
