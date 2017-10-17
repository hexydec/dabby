["add", "remove", "toggle"].forEach(function (name) {
	$.fn[name + "Class"] = function (cls) {
		if (typeof cls === "string") {
			cls = cls.split(" ").reverse();
		}
		var i = this.length, n = cls.length;
		while (i--) {
			while (n--) {
				this[i].classList[name](getVal(this[i], cls[n], n));
			}
		}
		return this;
	};
});
