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
		index = 0;
		while (elem = elem.previousSibling) {
			index++;
		}
	}
	return index;
};
