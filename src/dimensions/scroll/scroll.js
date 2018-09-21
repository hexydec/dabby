["scrollLeft", "scrollTop"].forEach(item => {
	$.fn[item] = function (pos) {

		// set
		if (pos !== undefined) {
			let i = this.length,
				tl = item.indexOf("Top") > -1 ? "top" : "left";
			while (i--) {
				let val = getVal(pos, this, i, this[i][item]);
				if ($.isWindow(this[i])) {
					let obj = {};
					obj[tl] = val;
					this[i].scroll(obj);
				} else {
					this[i][item] = val;
				}
			};
			return this;

		// get
		} else if (this[0]) {
			if ($.isWindow(this[0])) {
				item = item === "scrollTop" ? "pageYOffset" : "pageXOffset";
			}
			return this[0][item];
		}
	};
});
