$.fn.index = function (selector) {
	let index = -1,
		i = this.length,
		elem = this[0],
		node;

	if (selector) {
		node = $(selector).get(0);
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
