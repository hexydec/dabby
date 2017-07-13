$.fn.attr = function (prop, value) {
	if (prop) {

		// set
		if (value || value === "") {
			var i = this.length;
			while (i--) {
				if (prop === "style") {
					this[i].style.cssText = value;
				} else if (prop === "class") {
					this[i].className = value;
				} else if (value === "") {
					this[i].removeAttribute(prop);
				} else {
					this[i].setAttribute(prop, value);
				}
			}
			return this;
		}

		// get
		if (this[0]) {
			if (prop === "style") {
				return this[0].style.cssText;
			}
			if (prop === "class") {
				return this[0].className;
			}
			return this[0].getAttribute(prop);
		}
	}
};