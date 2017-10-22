QUnit.module("Traversal");

QUnit.test("$.fn.filter/$.fn.not", function (assert) {
	var test = document.getElementsByClassName("test")[0],
		obj;
	test.innerHTML = '<div class="testtemp">test</div><div class="testtemp">test 2</div><div class="testtemp">test 3</div>';
	obj = $(".testtemp");

	assert.equal(obj.filter(function (item) {return item.innerHTML == "test";}).get(0).innerHTML, "test", "Can filter nodes");
	assert.equal(obj.filter(function (item) {return item.innerHTML != "test";}).get().length, 2, "Can filter nodes");

	assert.equal(obj.not(function (item) {return item.innerHTML != "test";}).get(0).innerHTML, "test", "Can negatively filter nodes");
	assert.equal(obj.not(function (item) {return item.innerHTML == "test";}).get().length, 2, "Can negatively filter nodes");

	test.innerHTML = "";
});
