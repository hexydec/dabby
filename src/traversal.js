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
		} else if (typeof filter === "function") {
			func = filter;
		
		// nodes
		} else {
			if (!$.isArray(filter)) {
				filter = [filter];
			}
			len = filter.length;
			func = function (node) {
				for (var i = 0; i < len; i += 1) {
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
		return $(this.shift());
	};
	
	$.fn.last = function () {
		return $(this.pop());
	};
	
	$.fn.children = function (selector) {
		var i = n = 0,
			nodes = [],
			children;
		
		for (; i < this.length; i += 1) {
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
		var i = 0,
			nodes = [];
		
		for (; i < this.length; i += 1) {
			if (!selector || this[i].parentNode.matches(selector)) {
				nodes.push(this[i].parentNode);
			}
		}
		return $(nodes);
	};
	
	$.fn.parents = function (selector) {
		
	};
	
	$.fn.prev = function (selector) {
		var node = this[0];
		return $(node ? node.previousElementSibling() : null);
	};
	
	$.fn.next = function (selector) {
		var node = this[0];
		return $(node ? node.nextElementSibling() : null);
	};
	
	$.fn.has = function (selector) {
		return $([].filter.call(this, function (node) {
			return node.querySelectorAll(selector).length > 0;
		}));
	};
});