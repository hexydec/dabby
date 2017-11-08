QUnit.module("Dimensions");

QUnit.test("$.fn.offset", function (assert) {
	var test = document.getElementsByClassName("test")[0],
		obj,
		coords = {top: 10, left: 10};
	test.innerHTML = '<div class="testtemp">test</div>';
	obj = $(".testtemp");

	assert.deepEqual(obj.offset(coords), obj, "Returns self on set");
	var offset = obj.offset();
	offset.top = parseFloat(offset.top.toFixed(1)); // IE has rounding errors
	offset.left = parseFloat(offset.left.toFixed(1));
	assert.deepEqual(offset, coords, "Can set and retrieve coordinates");

	// reset
	test.innerHTML = "";
});
