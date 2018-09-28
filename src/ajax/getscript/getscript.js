import $ from "../../core/core.js";
import "../ajax/ajax.js";

$.getScript = (url, success) => $.ajax({
	url: url,
	dataType: "script",
	success: success
});
