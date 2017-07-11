define(["core"], function ($) {
	
	function filterNodes(filter, not) {
		var i = 0,
			nodes,
			func,
			len;
		
		// selector
		if (typeof filter === "string") {
			func = function (node) {
				return node.matches(filter);
			};
		
		// function
		} else if (filter.constructor === Function) {
			func = filter;
		
		// nodes
		} else {
			if (![].isArray(filter)) {
				filter = [filter];
			}
			len = filter.length;
			func = function (node) {
				var i = len;
				while (i--) {
					if (this.isSameNode(filter[i])) {
						return true;
					}
				}
				return false;
			};
		}
		return $([].filter.call(this, not ? function (item) {return !func(item);} : func));
	}
	
	["filter", "not"].forEach(function (name) {
		$.fn[name] = function (selector) {
			return filterNodes.call(this, selector, name === "not");
		};
	});
	
	$.fn.is = function (selector) {
		return filterNodes.call(this, selector).length !== 0;
	};
	
	$.fn.eq = function (i) {
		return $(this[i >= 0 ? i : i + this.length]);
	};
	
	$.fn.find = function (selector) {
		return $(selector, this);
	};
	
	$.fn.first = function () {
		return this.eq(0);
	};
	
	$.fn.last = function () {
		return this.eq(-1);
	};
	
	$.fn.children = function (selector) {
		var i = this.length,
			nodes = [],
			children;
		
		while (i--) {
			children = this[i].children;
			if (selector) {
				children = [].filter.call(children, function (node) {
					return node.matches(selector);
				});
			}
			$.extend(nodes, children);
		}
		return $(nodes);
	};
	
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
	
	$.fn.parents = function (selector) {
		var nodes = [],
			i = this.length,
			node;
		
		while (i--) {
			node = this[i];
			while (node.parentNode) {
				if (!selector || node.parentNode.matches(selector)) {
					nodes.push(node.parentNode);
				}
				node = node.parentNode;
			}
		}
		return $(nodes);
	};
	
	$.each({
		next: "nextElementSibling",
		prev: "previousElementSibling"
	}, function (name, func) {
		$.fn[name] = function (selector) {
			var sibling = null;
			if (this[0]) {
				sibling = node[func]();
				if (selector && !sibling.matches(selector)) {
					sibling = null;
				}
			}
			return $(sibling);
		};
	});
	
	$.fn.has = function (selector) {
		return $([].filter.call(this, function (node) {
			return node.querySelectorAll(selector).length > 0;
		}));
	};
	
	$.fn.add = function (nodes) {
		nodes = $(nodes);
		var len = this.length,
			i = nodes.length;
		
		while (i--) {
			this[i + len] = nodes[i];
		}
		return this;
	};
	
	$.fn.clone = function () {
		var nodes = [],
			i = this.length;
		
		while (i--) {
			nodes[i] = this[i].cloneNode(true);
		}
		return $(nodes);
	};
});