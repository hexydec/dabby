import $ from "../../../dist/dabby.js";

QUnit.module("Dimensions");

QUnit.test("$.fn.position", function (assert) {
	var test = document.getElementsByClassName("test")[0];
	test.innerHTML = '<div class="testtemp" style="position: relative; padding: 20px;"><div class="testinner" style="position: absolute; top: 10px; left: 15px;">test</div></div>';

	var pos = $(".testinner").position();
	assert.ok(pos, "Returns a position object");
	assert.equal(typeof pos.top, "number", "Has numeric top property");
	assert.equal(typeof pos.left, "number", "Has numeric left property");
	assert.equal(pos.top, 10, "Returns correct top offset");
	assert.equal(pos.left, 15, "Returns correct left offset");

	// Empty collection
	assert.equal($(".nonexistent").position(), undefined, "Returns undefined for empty collection");

	test.innerHTML = "";
});
