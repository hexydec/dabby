import $ from "../../core/dabby/dabby";
import "../ajax/ajax.js";

$.getScript = (url, success) => $.ajax({
	url: url,
	dataType: "script",
	success: success
});
