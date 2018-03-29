$.fn.position = function () {
	if (this[0]) {
		return {left: this[0].offsetLeft, top: this[0].offsetTop};
	}
};
