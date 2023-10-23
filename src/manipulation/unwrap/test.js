import $ from "../../../dist/dabby.js";

QUnit.module("Manipulation", hooks => {
	var test = document.getElementsByClassName("test")[0];

	hooks.before(() => {
		test.innerHTML = '<div class="testtemp"><div class="testtemp2">test 2</div><div class="testtemp3">test 3</div></div>';
	});

	QUnit.test("$.fn.unwrap", function (assert) {
		var obj = $(".testtemp2");

		assert.deepEqual(obj.unwrap().get(), obj.get(), "Returns self on unwrap");
		assert.deepEqual($(".test > div").get(), $(".testtemp2, .testtemp3").get(), "Can unwrap node");
	});

	hooks.after(() => {
		test.innerHTML = "";
	});
});