["add", "remove", "toggle"].forEach(function (name) {
	$.fn[name + "Class"] = function (cls) {
		var i = this.length;
		while (i--) {
			this[i].classList[name](cls);
		}
		return this;
	};
});