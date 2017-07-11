define(["core", "utils"], function ($, utils) {
	["Width", "Height"].forEach(function (dim) { // inner / outer ??
		var diml = dim.toLowerCase();
		$.fn[diml] = function (val) {
			if (this.length) {
				var obj = this[0];

				// set value
				if (val !== undefined) {
					return obj.style[diml] = val;

				// window
				} else if (obj === window) {
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
		var rect,
			doc = document.documentElement,
			i = 0,
			pos;
		
		// set
		if (coords) {
			for (; i < this.length; i += 1) {
				pos = getComputedStyle(this[i], "").position;
				
				// if coords is callback, generate value
				if (typeof coords === "function") {
					coords = coords(i, pos);
				}
				
				if (coords.top && coords.left) {
				
					// set position relative if static
					if (pos === "static") {
						this[i].style.setProperty("position", "relative");
					}
					
					// set offset
					this[i].style.setProperty("top", parseint(coords.top) + (pos === "fixed" ? 0 : doc.scrollTop));
					this[i].style.setProperty("left", parseint(coords.left) + (pos === "fixed" ? 0 : doc.scrollLeft));
				}
			}
			return this;
		
		// get
		} else if (this[0]) {
			rect = this[0].getBoundingClientRect();
		    return {
		    	top: rect.top + doc.scrollTop,
		    	left: rect.left + doc.scrollLeft
			};
		}
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