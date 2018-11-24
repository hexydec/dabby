import $ from "../../core/core.js";
import "../isplainobject/isplainobject.js";

$.extend = (...arrs) => {
	if (arrs[0] === true) {

		// merge function will recursively merge items
		function merge(target, ...sources) {
			if (sources.length) {

				// work on next source
				const source = sources.shift();
				if ($.isPlainObject(target) && $.isPlainObject(source)) {

					// loop through each property
					$.each(source, (i, val) => {

						// merge recursively if source is object, if target is not object, overwrite
						if ($.isPlainObject(val)) {
							target[i] = $.isPlainObject(target[i]) ? merge(target[i], val) : val;

						// when source property is value just overwrite
						} else {
							target[i] = val;
						}
					});
				}

				// merge next source
			    return merge(target, ...sources);
			}
			return target;
		}
		return merge.apply(null, arrs.slice(1));
	}
	return Object.assign.apply(null, arrs);
};
