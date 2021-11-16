import $ from "../../../dist/dabby.js";

QUnit.module("Utils");

QUnit.test("$.isFunction", function (assert) {
	[function () {}, $.isFunction, item => item + 42, window, document, document.getElementsByClassName("test")[0], "hi", 5, 3.14, {}].forEach(function (func, i) {
		assert.equal($.isFunction(func), i < 3, "Input is" + (i < 3 ? "" : " not") + " function");
	});
});
