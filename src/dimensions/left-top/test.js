QUnit.module("Dimensions");

QUnit.test("$.fn.scrollLeft/$.fn.scrollTop", function (assert) {
	var obj = $(document);

	assert.deepEqual(obj, obj.scrollLeft(10), "Returns self on set");
	assert.equal(obj.get(0).scrollLeft, 10, "Can set scroll value");
	assert.equal(obj.scrollLeft(), 10, "Can get scroll value");
});
