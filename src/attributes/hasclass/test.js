import $ from "../../../dist/dabby.js";

QUnit.module("Attributes", hooks => {
	var test = document.getElementsByClassName("test")[0];

	hooks.before(() => {
		test.innerHTML = '<div class="testtemp testtemp2"></div>';
	});

	QUnit.test("$.fn.hasClass", function (assert) {
		var obj = $(".testtemp");

		assert.ok(obj.hasClass("testtemp2"), "Can detect class");
		assert.ok(!obj.hasClass("testtemp3"), "Can detect class is not on object");
	});

	hooks.after(() => {
		test.innerHTML = "";
	});
});