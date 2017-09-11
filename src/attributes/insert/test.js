QUnit.module("Attributes");

QUnit.test("$.fn.insert", function (assert) {
	var main = $(".main"), rmain = document.getElementsByClassName("main")[0];
	rmain.insertAdjacentHTML("beforeEnd", "<span class=\"html\"></span>");
	var obj = $(".html");

	assert.deepEqual(obj.prepend("<div>Test</div>"), obj, "Returns itself when insert");
	assert.equal(obj.html(), "<div>Test</div>", "Can insert html");
});
