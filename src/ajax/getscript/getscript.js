import $ from "../../core/dabby/dabby.js";
import "../ajax/ajax.js";

Object.defineProperty($, "getScript", {
	value: (url, success) => $.ajax({
		url: url,
		dataType: "script",
		success: success
	})
});
