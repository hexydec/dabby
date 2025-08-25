import $ from "../../../dist/dabby.js";

QUnit.module("Dimensions");

QUnit.test("$.fn.width/$.fn.height", function (assert) {
	var test = document.getElementsByClassName("test")[0],
		obj;
	test.innerHTML = '<div class="testtemp" style="width: 100px; padding: 10px; border: 10px solid red; margin: 10px;">test</div>';
	obj = $(".testtemp");

	const check = (result, expected, label) => assert.ok(Math.abs(expected - result) <= 1, label);

	// read width
	check(obj.width(), 100, "Can set and read width");
	check(obj.innerWidth(), 120, "Can set and read innerWidth");
	check(obj.outerWidth(), 140, "Can set and read outerWidth");
	check(obj.outerWidth(true), 160, "Can set and read outerWidth with margin");

	// set width
	assert.deepEqual(obj.width(120), obj, "Returns self on set width");
	check(obj.width(), 120, "Can set and read width");
	check(obj.innerWidth(), 140, "Can set and read innerWidth");
	check(obj.outerWidth(), 160, "Can set and read outerWidth");
	check(obj.outerWidth(true), 180, "Can set and read outerWidth with margin");

	// set innerWidth
	assert.deepEqual(obj.innerWidth(120), obj, "Returns self on set innerWidth");
	check(obj.width(), 100, "Can set and read width");
	check(obj.innerWidth(), 120, "Can set and read innerWidth");
	check(obj.outerWidth(), 140, "Can set and read outerWidth");
	check(obj.outerWidth(true), 160, "Can set and read outerWidth with margin");

	// set outerWidth
	assert.deepEqual(obj.outerWidth(120), obj, "Returns self on set outerWidth");
	check(obj.width(), 80, "Can set and read width");
	check(obj.innerWidth(), 100, "Can set and read innerWidth");
	check(obj.outerWidth(), 120, "Can set and read outerWidth");
	check(obj.outerWidth(true), 140, "Can set and read outerWidth with margin");

	// box-sizing
	test.innerHTML = '<div class="testtemp" style="box-sizing: content-box; width: 100px; padding: 10px; border: 10px solid red; margin: 10px;">test</div>';
	obj = $(".testtemp");

	// read width
	check(obj.width(), 100, "Can set and read width");
	check(obj.innerWidth(), 120, "Can set and read innerWidth");
	check(obj.outerWidth(), 140, "Can set and read outerWidth");
	check(obj.outerWidth(true), 160, "Can set and read outerWidth with margin");

	// set width
	assert.deepEqual(obj.width(120), obj, "Returns self on set width");
	check(obj.width(), 120, "Can set and read width");
	check(obj.innerWidth(), 140, "Can set and read innerWidth");
	check(obj.outerWidth(), 160, "Can set and read outerWidth");
	check(obj.outerWidth(true), 180, "Can set and read outerWidth with margin");

	// set innerWidth
	assert.deepEqual(obj.innerWidth(120), obj, "Returns self on set innerWidth");
	check(obj.width(), 100, "Can set and read width");
	check(obj.innerWidth(), 120, "Can set and read innerWidth");
	check(obj.outerWidth(), 140, "Can set and read outerWidth");
	check(obj.outerWidth(true), 160, "Can set and read outerWidth with margin");

	// set outerWidth
	assert.deepEqual(obj.outerWidth(120), obj, "Returns self on set outerWidth");
	check(obj.width(), 80, "Can set and read width");
	check(obj.innerWidth(), 100, "Can set and read innerWidth");
	check(obj.outerWidth(), 120, "Can set and read outerWidth");
	check(obj.outerWidth(true), 140, "Can set and read outerWidth with margin");

	// reset
	test.innerHTML = "";
});
