define(["core"], function ($) {
	["Width", "Height"].forEach(function (dim) { // inner / outer ??
		var diml = dim.toLowerCase();
		$.fn[diml] = function (val) {
			if (this.length) {
				var obj = this[0];

				// set value
				if (val !== undefined) {
					return obj.style[diml] = val;

				// window
				} else if ($.isWindow(obj)) {
					return obj["inner" + dim];

				// document
				} else if (obj.nodeType === 9) {
					return obj.documentElement["scroll" + dim];

				// element
				} else {
					return obj["offset" + dim];
				}
			}
		};
	});
	
	$.fn.offset = function (coords) {
		var rect = el.getBoundingClientRect(),
			doc = document.documentElement;
	    return {
	    	top: rect.top + doc.scrollTop,
	    	left: rect.left + doc.scrollLeft
	    };
	};
	
	$.fn.offsetParent = function (coords) {
		return $(this[0] ? this[0].offsetParent : null);
	};
	
	$.fn.position = function () {
		var node = this[0];
		return node ? {top: node.offsetTop, left: node.offsetLeft} : null;
	};
	
	["Left", "Top"].forEach(function (item) {
		item = "scroll" + item;
		$.fn[item] = function (pos) {
			if (pos) {
				return this.each(function (node) {
					node[item] = pos;
				});
			} else if (this[0]) {
				return this[0][item];
			}
			return 0;
		};
	});
});