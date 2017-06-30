define(["core"], function ($) {
	["Width", "Height"].forEach(function (dim) {
		var diml = dim.toLowerCase();
		$.fn[diml] = function (val) {
			if (this.length) {
				var obj = this[0];

				// set value
				if (val !== undefined) {
					return this.css(diml, val);

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
});