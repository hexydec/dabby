import $ from "../../../dist/dabby.js";

QUnit.module("Dimensions", function (hooks) {
	var test = document.getElementsByClassName("test")[0];

	hooks.before(() => {
		test.innerHTML = '<div class="testtemp">test</div>';
	});

	QUnit.test("$.fn.offset", function (assert) {
		var obj,
			coords = {top: 100, left: 100};
		obj = $(".testtemp");

		assert.deepEqual(obj.offset(coords), obj, "Returns self on set unpositioned element");
		var offset = obj.offset();
		offset.top = parseFloat(offset.top.toFixed(1)); // IE has rounding errors
		offset.left = parseFloat(offset.left.toFixed(1));
		assert.deepEqual(offset, coords, "Can set and retrieve coordinates on unpositioned element");

		// test position relative
		test.innerHTML = '<div class="testtemp" style="padding: 20px; position: relative;"><div class="testrelative">test</div></div>';
		obj = $(".testrelative");

		assert.deepEqual(obj.offset(coords), obj, "Returns self on set element with a relatively positioned parent");
		var offset = obj.offset();
		offset.top = parseFloat(offset.top.toFixed(1)); // IE has rounding errors
		offset.left = parseFloat(offset.left.toFixed(1));
		assert.deepEqual(offset, coords, "Can set and retrieve coordinates on element with a relatively positioned parent");

		// test position relative
		test.innerHTML = '<div class="testtemp" style="padding: 20px; position: relative; background: red;"><div class="testabsolute" style="position:absolute; top: 20px; left: 20px; background: green;">test</div></div>';
		obj = $(".testabsolute");

		assert.deepEqual(obj.offset(coords), obj, "Returns self on set absolutely positioned element");
		var offset = obj.offset();
		offset.top = parseFloat(offset.top.toFixed(1)); // IE has rounding errors
		offset.left = parseFloat(offset.left.toFixed(1));
		assert.deepEqual(offset, coords, "Can set and retrieve coordinates");

		// set coords through a callback
		obj.offset((i, current) => {
			return {
				top: current.top + 100,
				left: current.left + 100
			};
		});
		assert.deepEqual({top: 200, left: 200}, obj.offset(), "Can set and retrieve coordinates through a callback");
	});

	hooks.after(() => {
		test.innerHTML = "";
	});
});