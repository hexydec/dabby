import $ from "../../core/dabby/dabby.js";
import "../ajax/ajax.js";

$.getScript = (url, success) => $.ajax({
	url: url,
	dataType: "script",
	success: success
});
