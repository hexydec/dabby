	import {$} from "../../../dist/dabby.js";

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

QUnit.test("$.fn.is", function (assert) {
	var test = document.getElementsByClassName("test")[0],
		obj;
	test.innerHTML = '<div class="testtemp">test</div><div class="testtemp2">test 2</div>';
	obj = $(".testtemp, .testtemp2");

	assert.ok(obj.is(".testtemp"), "Returns true when node matches selector");
	assert.ok(obj.is(document.getElementsByClassName("testtemp")[0]), "Returns true when node matches element");
	assert.ok(obj.is($(".testtemp")), "Returns true when node matches dabby collection");

	test.innerHTML = "";
});
