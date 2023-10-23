import $ from "../../../dist/dabby.js";

QUnit.module("Attributes", hooks => {
	var test = document.getElementsByClassName("test")[0];

	hooks.before(() => {
		test.innerHTML = '<div class="testtemp"></div>';
	});

	QUnit.test("$.fn.removeProp", function (assert) {
		var obj = $(".testtemp");

		obj.prop("custom", "value");
		assert.equal(obj.prop("custom"), "value", "Can set custom property");
		obj.removeProp("custom");
		assert.equal(obj.prop("custom"), undefined, "Can remove custom property");
	});

	hooks.after(() => {
		test.innerHTML = "";
	});
});