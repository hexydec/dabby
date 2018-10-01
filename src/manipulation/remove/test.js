import {$} from "../../../dist/dabby.js";

QUnit.module("Manipulation");

QUnit.test("$.fn.remove", function (assert) {
	var test = document.getElementsByClassName("test")[0];
	test.innerHTML = '<div class="testtemp"><div></div></div><div class="testtemp2"></div>';
	var obj = $(".testtemp, .testtemp2"),
		robj = Array.from(document.querySelectorAll(".testtemp, .testtemp2"));

	assert.deepEqual(obj.remove(".testtemp2").get(), robj, "Returns reduced set when removed");
	assert.ok(document.getElementsByClassName("testtemp2").length === 0, "Removed item from DOM");
});

QUnit.test("$.fn.detach", function (assert) {
	var test = document.getElementsByClassName("test")[0];
	test.innerHTML = '<div class="testtemp"><div class="testtemp2"></div></div>';
	var obj = $(".testtemp");

	assert.deepEqual(obj.detach().get(0), obj.get(0), "Returns node when it is detached");
	assert.deepEqual($(".testtemp").get(), [], "Node has been removed from DOM");
});
