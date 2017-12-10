["addClass", "removeClass", "toggleClass"].forEach(name => {
	$.fn[name] = function (cls) {

		// remove "Class" from name for classList method
		let func = name.substr(0, name.length - 5),
			i = this.length,
			n;

		// split class
		if (typeof cls === "string") {
			cls = cls.split(" ").reverse(); // reverse as we add them backwards
		}

		// manage classes on nodes
		while (i--) {
			n = cls.length;
			while (n--) {
				this[i].classList[func](getVal(cls[n], this[i], n));
			}
		}
		return this;
	};
});
