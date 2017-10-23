["add", "remove", "toggle"].forEach(function (name) {
	$.fn[name + "Class"] = function (cls) {
		if (typeof cls === "string") {
			cls = cls.split(" ").reverse();
		}
		var i = this.length, n;
		while (i--) {
			n = cls.length;
			while (n--) {
				this[i].classList[name](getVal(cls[n], this[i], n));
			}
		}
		return this;
	};
});
