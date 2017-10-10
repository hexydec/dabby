QUnit.module("Dimensions");

QUnit.test("$.fn.offset", function (assert) {
	var test = document.getElementsByClassName("test")[0],
		obj,
		coords = {top: 10, left: 10};
	test.innerHTML = '<div class="testtemp">test</div>';
	obj = $(".testtemp");

	assert.deepEqual(obj.offset(coords), obj, "Returns self on set");
	assert.deepEqual(obj.offset(), coords, "Can set and retrieve coordinates");
});
