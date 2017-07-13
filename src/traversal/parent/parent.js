$.fn.parent = function (selector) {
	var nodes = [],
		i = this.length;

	while (i--) {
		if (!selector || this[i].parentNode.matches(selector)) {
			nodes.push(this[i].parentNode);
		}
	}
	return $(nodes);
};