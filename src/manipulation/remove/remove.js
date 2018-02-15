["remove", "detach"].forEach(func => {
	$.fn[func] = function (selector) {
		let i = this.length,
			nodes = [],
			obj = [];

		// detach selected nodes
		while (i--) {
			if (!selector || filterNodes(this[i], selector).length) {
				nodes.push(this[i].parentNode.removeChild(this[i]));
			}
		}

		// create a new dabby object to return
		return func === "detach" ? $(nodes) : this;
	};
});
