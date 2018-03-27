["addClass", "removeClass", "toggleClass"].forEach(name => {
	$.fn[name] = function (cls) {

		// remove "Class" from name for classList method
		let func = name.substr(0, name.length - 5),
			i = this.length;

		// manage classes on nodes
		while (i--) {
			let arr = getVal(cls, this[i], i, this[i].className);
			if (typeof arr === "string") {
				arr = arr.split(" ").reverse(); // reverse as we add them backwards
			} else {
				arr = arr.reverse();
			}
			let n = arr.length;
			while (n--) {
				this[i].classList[func](arr[n]);
			}
		}
		return this;
	};
});
