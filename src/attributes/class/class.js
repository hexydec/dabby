["addClass", "removeClass", "toggleClass"].forEach(function (name) {
	$.fn[name] = function (cls) {

		// remove "Class" from name for classList method
		var func = name.substr(0, name.length - 5);

		// split class
		if (typeof cls === "string") {
			cls = cls.split(" ").reverse(); // reverse as we add them backwards
		}

		// manage classes on nodes
		var i = this.length,
			n;

		while (i--) {
			n = cls.length;
			while (n--) {
				this[i].classList[func](getVal(cls[n], this[i], n));
			}
		}
		return this;
	};
});
