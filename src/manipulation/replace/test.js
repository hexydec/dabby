import $ from "../../../dist/dabby.js";

QUnit.module("Manipulation", function (hooks) {
	var test = document.getElementsByClassName("test")[0];

	hooks.before(function () {
		test.innerHTML = `<div class="testtemp">
			<div></div>
			<div></div>
			<div></div>
		</div>`;
	});

	QUnit.test("$.fn.replaceWith", function (assert) {
		$(".testtemp div").replaceWith("<h2>");
		assert.equal($(".testtemp h2").length, 3, "Can replace nodes");
		const div = $("<div>");
		$(".testtemp h2").replaceWith(div);
		assert.equal($(".testtemp div").length, 3, "Can replace nodes with dabby object");
	});

	QUnit.test("$.fn.replaceAll", function (assert) {
		$("<div>").replaceAll(".testtemp h2");
		assert.equal($(".testtemp div").length, 3, "Can replace nodes");
	});

	hooks.after(function () {
		test.innerHTML = "";
	});
});
