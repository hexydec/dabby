["Left", "Top"].forEach(function (item) {
	item = "scroll" + item;
	$.fn[item] = function (pos) {
		if (pos) {
			var i = this.length;
			while (i--) {
				this[i][item] = pos;
			};
		} else if (this[0]) {
			return this[0][item];
		}
		return 0;
	};
});