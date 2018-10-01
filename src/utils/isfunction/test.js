import {$} from "../../../dist/dabby.js";

QUnit.module("Utils");

QUnit.test("$.isFunction", function (assert) {
	[function () {}, $.isFunction, window, document, document.getElementsByClassName("test")[0], "hi", 5, 3.14, {}].forEach(function (func, i) {
		assert.equal($.isFunction(func), i < 2, "Input is" + (i < 2 ? "" : " not") + " function");
	});
});
