QUnit.module("Attributes");

QUnit.test("$.fn.width/$.fn.height", function (assert) {
	var test = document.getElementsByClassName("test")[0],
		obj,
		width = 100;
	test.innerHTML = '<div class="testtemp" style="padding: 10px; border: 10px solid red; margin: 10px;">test</div>';
	obj = $(".testtemp");

	// width()
	assert.deepEqual(obj.width(width), obj, "Returns self on set width");
	assert.equal(obj.width(), width, "Can set and read width");

	// innerWidth()
	assert.deepEqual(obj.innerWidth(width), obj, "Returns self on set innerWidth");
	assert.equal(obj.innerWidth(), width, "Can set and read innerWidth");

	// outerWidth()
	assert.deepEqual(obj.outerWidth(width), obj, "Returns self on set outerWidth");
	assert.equal(obj.outerWidth(), width, "Can set and read outerWidth");

	// reset
	test.innerHTML = "";
});
