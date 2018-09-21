$.fn.offset = function (coords) {
	const doc = document.documentElement;
	let rect,
		i = this.length,
		pos;

	// set
	if (coords) {
		while (i--) {

			// if coords is callback, generate value
			rect = this[i].getBoundingClientRect();
			coords = getVal(coords, this[i], i, $(this[i]).offset());

			if (coords.top !== undefined && coords.left !== undefined) {
				let style = getComputedStyle(this[i]);
				pos = style.getPropertyValue("position");

				// set position relative if static
				if (pos === "static") {
					this[i].style.position = "relative";
				}

				// add current offset
				coords.top += parseFloat(style.getPropertyValue("top")) || 0;
				coords.left += parseFloat(style.getPropertyValue("left")) || 0;

				// remove parent offset and viewport scroll
				if (pos !== "fixed") {
					coords.top -= doc.scrollTop + rect.top;
					coords.left -= doc.scrollLeft + rect.left;
				}

				// set offset
				this[i].style.top = coords.top + "px";
				this[i].style.left = coords.left + "px";
			}
		}
		return this;

	// get
	} else if (this[0]) {
		pos = this[0].style.position === "fixed";
		rect = this[0].getBoundingClientRect();
		return {
			top: rect.top + (pos ? 0 : doc.scrollTop),
			left: rect.left + (pos ? 0 : doc.scrollLeft)
		};
	}
};
