	QUnit.module("Traversal");

QUnit.test("$.fn.filter/$.fn.not", function (assert) {
	var test = document.getElementsByClassName("test")[0],
		obj;
	test.innerHTML = '<div class="testtemp testtemp1">test</div><div class="testtemp testtemp2">test 2</div><div class="testtemp testtemp3">test 3</div>';
	obj = $(".testtemp");

	assert.deepEqual(obj.filter(".testtemp2").get(), $(".testtemp2").get(), "Can filter nodes by selector");
	assert.equal(obj.filter(function (i ,item) {return item.innerHTML == "test";}).get(0).innerHTML, "test", "Can filter nodes by callback");
	assert.equal(obj.filter(function (i, item) {return item.innerHTML != "test";}).get().length, 2, "Can filter nodes by callback");

	assert.deepEqual(obj.not(".testtemp2").get(), $(".testtemp1,.testtemp3").get(), "Can negatively filter nodes by selector");
	assert.equal(obj.not(function (i, item) {return item.innerHTML != "test";}).get(0).innerHTML, "test", "Can negatively filter nodes by callback");
	assert.equal(obj.not(function (i, item) {return item.innerHTML == "test";}).get().length, 2, "Can negatively filter nodes by callback");

	test.innerHTML = "";
});
