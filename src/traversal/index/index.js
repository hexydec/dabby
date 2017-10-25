$.fn.index = function (selector) {
	var index = -1,
		elem = this[0],
		node,
		i;
	if (selector) {
		node = $(selector).get(0);
		i = this.length;
		while (i--) {
			if (this[i].isSameNode(node)) {
				return i;
			}
		}
	} else if (elem && elem.parentNode) {
		while (elem = elem.nextSibling) {
			index++;
		}
	}
	return index;
};
