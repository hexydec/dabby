import $ from "../../../dist/dabby.js";

QUnit.module("Traversal", hooks => {
	var test = document.getElementsByClassName("test")[0];

	hooks.before(() => {
		test.innerHTML = '<div class="testtemp"><div class="testtemp2"><div class="testtemp3">test</div></div></div>';
	});

	QUnit.test("$.fn.closest", function (assert) {
		const obj = $(".testtemp3, .testtemp2, .testtemp");
		assert.deepEqual(obj.closest(".test").get(), [test], "Can select parents until a particular node"); // returns only unique nodes
	});

	hooks.after(() => {
		test.innerHTML = "";
	});
});
