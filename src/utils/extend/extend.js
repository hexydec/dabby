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
					const keys = Object.keys(source),
						len = keys.length;
					for (let i = 0; i < len; i++) {

						// merge recursively if source is object, if target is not object, overwrite
						if ($.isPlainObject(source[keys[i]])) {
							target[keys[i]] = $.isPlainObject(target[keys[i]]) ? merge(target[keys[i]], source[keys[i]]) : source[keys[i]];

						// when source property is value just overwrite
						} else {
							target[keys[i]] = source[keys[i]];
						}
					}
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
