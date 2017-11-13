["add", "remove", "toggle"].forEach(function (name) {
	$.fn[name + "Class"] = function (cls) {

		// split class
		if (typeof cls === "string") {
			cls = cls.split(" ").reverse();
		}

		// manage classes on nodes
		var i = this.length,
			n;
		while (i--) {
			n = cls.length;
			while (n--) {
				this[i].classList[name](getVal(cls[n], this[i], n));
			}
		}
		return this;
	};
});
