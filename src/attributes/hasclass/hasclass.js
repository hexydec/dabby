$.fn.hasClass = function (cls) {
	var i = this.length;
	while (i--) {
		if (this[i].classList.contains(cls)) {
			return true;
		}
	}
	return false;
}
