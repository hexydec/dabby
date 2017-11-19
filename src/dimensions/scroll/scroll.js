["scrollLeft", "scrollTop"].forEach(function (item) {
	$.fn[item] = function (pos) {

		// set
		if (pos !== undefined) {
			var i = this.length;
			while (i--) {
				this[i][item] = pos;
			};
			return this;

		// get
		} else if (this[0]) {
			return this[0][item];
		}
	};
});
