// needs more understanding of how this is supposed to work!!!

["replaceWith", "replaceAll"].forEach(name => {
	$.fn[name] = function (html) {
		const all = name === "replaceAll",
			source = all ? $(html) : this;
		let target = all ? this : html,
			isFunc = $.isFunction(target);

		if (!isFunc) {
			target = $(target);
		}

		let i = source.length;

		while (i--) {
			let n = target.length,
				parent = source[i].parentNode;
			while (n--) {
				const replace = isFunc ? getVal(target[n], n, target[n]) : target[n];
				if (n) {
					source[i].insertAdjacentElement("beforebegin", replace.cloneNode(true));
				} else {
					source[i] = parent.replaceChild(i ? replace.cloneNode(true) : replace, source[i]);
				}
			}
		}
		return this;
	};
});