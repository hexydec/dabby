import $ from "../../../dist/dabby.js";

QUnit.module("Manipulation");

QUnit.test("$.fn.wrap", function (assert) {
	var test = document.getElementsByClassName("test")[0],
		html = '<div class="testtemp"><p>Line 1</p><p>Line 2</p><p>Line 3</p></div>';

	test.innerHTML = html;
	var obj = $(".testtemp p");

	assert.deepEqual(obj.wrap("<div>"), obj, "Returns self on wrap with html");
	assert.equal($(".testtemp > div > p").length, 3, "Can wrap elements with html");

	test.innerHTML = html;
	obj = $(".testtemp p");
	assert.deepEqual(obj.wrap("<div><span></span</div>"), obj, "Returns self on wrap with deep html");
	assert.equal($(".testtemp > div > span > p").length, 3, "Can wrap elements with deep html");

	test.innerHTML = html + '<div class="testtemp2"></div>';
	obj = $(".testtemp p");
	assert.deepEqual(obj.wrap(".testtemp2"), obj, "Returns self on wrap with existing element");
	assert.equal($(".testtemp > .testtemp2 > p").length, 3, "Can wrap elements with existing element");

	// reset
	test.innerHTML = "";
});
