$.fn.offset = function (coords) {
	var rect,
		doc = document.documentElement,
		i = this.length,
		pos;

	// set
	if (coords) {
		while (i--) {
			pos = getComputedStyle(this[i], "").position;

			// if coords is callback, generate value
			if (coords.constructor === Function) {
				coords = coords(i, pos);
			}

			if (coords.top && coords.left) {

				// set position relative if static
				if (pos === "static") {
					this[i].style.setProperty("position", "relative");
				}

				// set offset
				this[i].style.setProperty("top", parseint(coords.top) + (pos === "fixed" ? 0 : doc.scrollTop));
				this[i].style.setProperty("left", parseint(coords.left) + (pos === "fixed" ? 0 : doc.scrollLeft));
			}
		}
		return this;

	// get
	} else if (this[0]) {
		rect = this[0].getBoundingClientRect();
		return {
			top: rect.top + doc.scrollTop,
			left: rect.left + doc.scrollLeft
		};
	}
};