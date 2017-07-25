QUnit.module("Attributes");

QUnit.test("$.fn.data", function (assert) {
	var main = $(".main"),
		rmain = document.getElementsByClassName("main")[0],
		json = {foo: "bar", foo2: "bar2"};
	
	// set data
	assert.deepEqual(main.data("var", "value"), main, "Returns itself when setting data");
	assert.equal(rmain.dataset.var, "value", "Can set data");
	main.data("json", json);
	assert.deepEqual(JSON.parse(rmain.dataset.json), json, "Can set data as an plain object");
	
	//get data
	assert.equal(main.data("var"), "value", "Can get data");
	assert.deepEqual(main.data("json"), json, "Can get data as an object");
});