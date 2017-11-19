$.fn.offset = function (coords) {
	var rect,
		doc = document.documentElement,
		i = this.length,
		pos,
		parent;

	// set
	if (coords) {
		while (i--) {

			// if coords is callback, generate value
			rect = this[i].getBoundingClientRect();
			coords = getVal(coords, i, rect);

			if (coords.top !== undefined && coords.left !== undefined) {

				// set position relative if static
				pos = this[i].style.position || "static";
				if (pos === "static") {
					this[i].style.position = "relative";
				}

				// set offset
				this[i].style.top = (parseFloat(coords.top) - (pos === "fixed" ? 0 : doc.scrollTop + rect.top)) + "px";
				this[i].style.left = (parseFloat(coords.left) - (pos === "fixed" ? 0 : doc.scrollLeft + rect.left)) + "px";
			}
		}
		return this;

	// get
	} else if (this[0]) {
		pos = this[0].style.position;
		rect = this[0].getBoundingClientRect();
		return {
			top: rect.top - (pos === "fixed" ? 0 : doc.scrollTop),
			left: rect.left - (pos === "fixed" ? 0 : doc.scrollLeft)
		};
	}
};
