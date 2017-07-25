QUnit.module("Attributes");

QUnit.test("$.fn.addClass", function (assert) {
	var main = $(".main"), rmain = document.getElementsByClassName("main")[0];
	
	// set and get class
	assert.deepEqual(main.addClass("test"), main, "Returns itself when setting class");
	assert.equal(rmain.className, "main test", "Can set class");
	main.addClass("test2 test3");
	assert.equal(rmain.className, "main test test2 test3", "Can set multiple classes");
});

QUnit.test("$.removeClass", function (assert) {
	var main = $(".main"), rmain = document.getElementsByClassName("main")[0];
	
	// set and get class
	rmain.className = "main test test2 test3";
	assert.deepEqual(main.removeClass("test"), main, "Returns itself when setting class");
	assert.equal(rmain.className, "main test2 test3", "Can remove class");
	main.removeClass("test2 test3");
	assert.equal(rmain.className, "main", "Can remove multiple classes");
});

QUnit.test("$.toggleClass", function (assert) {
	var main = $(".main"), rmain = document.getElementsByClassName("main")[0];
	
	// set and get class
	rmain.className = "main";
	assert.deepEqual(main.toggleClass("test"), main, "Returns itself when setting class");
	assert.equal(rmain.className, "main test", "Can toggle class on");
	main.toggleClass("test");
	assert.equal(rmain.className, "main", "Can toggle class off");
	main.toggleClass("test2 test3");
	assert.equal(rmain.className, "main test2 test3", "Can toggle multiple classes on");
});