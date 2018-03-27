QUnit.module("Attributes");

QUnit.test("$.fn.addClass", function (assert) {
	var test = document.getElementsByClassName("test")[0];
	test.innerHTML = '<div class="testtemp"></div>';
	var main = $(".testtemp"),
		rmain = document.getElementsByClassName("testtemp")[0];

	// set and get class
	assert.deepEqual(main.addClass("test1"), main, "Returns itself when setting class");
	assert.equal(rmain.className, "testtemp test1", "Can set class");
	main.addClass("test2 test3");
	assert.equal(rmain.className, "testtemp test1 test2 test3", "Can set multiple classes");
	rmain.className = "testtemp";
	main.addClass(["new1", "new2"]);
	assert.equal(rmain.className, "testtemp new1 new2", "Can set multiple classes as an array");

	// reset
	test.innerHTML = "";
});

QUnit.test("$.removeClass", function (assert) {
	var test = document.getElementsByClassName("test")[0];
	test.innerHTML = '<div class="testtemp"></div>';
	var main = $(".testtemp"),
		rmain = document.getElementsByClassName("testtemp")[0];

	// set and get class
	rmain.className = "testtemp test1 test2 test3";
	assert.deepEqual(main.removeClass("test1"), main, "Returns itself when setting class");
	assert.equal(rmain.className, "testtemp test2 test3", "Can remove class");
	main.removeClass("test2 test3");
	assert.equal(rmain.className, "testtemp", "Can remove multiple classes");

	// reset
	test.innerHTML = "";
});

QUnit.test("$.toggleClass", function (assert) {
	var test = document.getElementsByClassName("test")[0];
	test.innerHTML = '<div class="testtemp"></div>';
	var main = $(".testtemp"),
		rmain = document.getElementsByClassName("testtemp")[0];

	// set and get class
	rmain.className = "testtemp";
	assert.deepEqual(main.toggleClass("test1"), main, "Returns itself when setting class");
	assert.equal(rmain.className, "testtemp test1", "Can toggle class on");
	main.toggleClass("test1");
	assert.equal(rmain.className, "testtemp", "Can toggle class off");
	main.toggleClass("test2 test3");
	assert.equal(rmain.className, "testtemp test2 test3", "Can toggle multiple classes on");

	// reset
	test.innerHTML = "";
});
