QUnit.module("Core");

QUnit.test("$.fn.map", function (assert) {
	var test = document.getElementsByClassName("test")[0];
	test.innerHTML = '<div class="testtemp">first</div><div class="testtemp">second</div>';
	var output = $(".testtemp").map(function () {
		console.log(this);
		return this.innerText;
	});
	assert.deepEqual(output, ["first", "second"]);
});
