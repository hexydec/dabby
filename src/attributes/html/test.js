QUnit.module("Attributes");

QUnit.test("$.fn.html", function (assert) {
	var main = $(".main"), rmain = document.getElementsByClassName("main")[0];
	rmain.insertAdjacentHTML("beforeEnd", "<span class=\"html\"><div>Test</div></span>");
	var obj = $(".html");

	assert.equal(obj.html(), "<div>Test</div>", "Can read html");
	var html = obj.html("<div>Test</div>");
	assert.equal(obj.get(0).innerHTML, "<div>Test</div>", "Can set html");

});
