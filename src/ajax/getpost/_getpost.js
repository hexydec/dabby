import $ from "../../core/core.js";
import isFunction from "../../internal/isfunction/isfunction.js";
import "../ajax/ajax.js";

["get", "post"].forEach(name => {
	$[name] = (url, data, success, type) => {
		const isFunc = isFunction(data);
		let settings = url !== null && typeof url === "object" ? url : {
			url: url,
			data: isFunc ? {} : data,
			success: isFunc ? data : success,
			dataType: isFunc ? success : type
		};
		settings.method = name.toUpperCase();
		return $.ajax(settings);
	};
});
