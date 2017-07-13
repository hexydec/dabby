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