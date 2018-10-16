import $ from "../../../dist/dabby.js";

QUnit.module("Utils");

QUnit.test("$.isWindow", function (assert) {
	var items = [window, document, document.getElementsByClassName("test")[0]];
	items.forEach(function (key, value) {
		assert.equal($.isWindow(value), value === window, "Can detect" + (value === window ? "" : " not") + " window");
	});
});
