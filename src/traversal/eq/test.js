import $ from "../../../dist/dabby.js";

QUnit.module("Traversal");

QUnit.test("$.fn.eq", function (assert) {
	var test = document.getElementsByClassName("test")[0],
		obj;
	test.innerHTML = '<div class="testtemp">test</div><div class="testtemp">test 2</div><div class="testtemp">test 3</div>';
	obj = $(".testtemp");

	assert.equal(obj.eq(0).get().length, 1, "Returns only a single node");
	assert.equal(obj.eq(0).get(0).innerHTML, "test", "Can select index");
	assert.equal(obj.eq(1).get(0).innerHTML, "test 2", "Can select index");
	assert.equal(obj.eq(2).get(0).innerHTML, "test 3", "Can select index");
	assert.equal(obj.eq(-1).get(0).innerHTML, "test 3", "Can select negative index");
	assert.equal(obj.eq(-2).get(0).innerHTML, "test 2", "Can select negative index");
	assert.equal(obj.eq(-3).get(0).innerHTML, "test", "Can select negative index");
	assert.deepEqual(obj.eq(4).get(), $().get(), "Returns empty object when selected out of range");
	assert.deepEqual(obj.eq(-4).get(), $().get(), "Returns empty object when selected out of range");

	test.innerHTML = "";
});
