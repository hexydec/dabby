QUnit.module("Dimensions");

QUnit.test("$.fn.offsetParent", function (assert) {
	var test = document.getElementsByClassName("test")[0],
		obj = $(".test");


	assert.deepEqual(obj.offsetParent().get(0), test.offsetParent, "Can get offset parent");
});
