["remove", "detach"].forEach(function (func) {
	$.fn[func] = function (selector) {
		var i = this.length,
			nodes = [],
			obj = [];

		// turn selector into dabby object
		if (selector) {
			selector = $(selector);
		}

		// detach selected nodes
		while (i--) {
			if (!selector || selector.is(this[i])) {
				nodes.push(this[i].parentNode.removeChild(this[i]));
			} else {
				obj.push(this[i]);
			}
		}

		// create a new dabby object to return
		return $(func === "detach" ? nodes : obj);
	};
});
