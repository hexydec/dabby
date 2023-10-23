import $ from "../../../dist/dabby.js";

QUnit.module("Manipulation", function (hooks) {
	var test = document.getElementsByClassName("test")[0];

	hooks.beforeEach(() => {
		test.innerHTML = '<div class="testtemp"><div class="first">First</div></div>';
	});

	QUnit.test("$.fn.prepend", function (assert) {
		var main = $(".testtemp");

		assert.deepEqual(main.prepend("<div>Prepend</div>"), main, "Returns itself on prepend");
		assert.equal(main.html(), '<div>Prepend</div><div class="first">First</div>', "Can prepend html");

		var list = $('<div class="second"></div><div class="third"></div><div class="forth"></div>');
		main.prepend(list);
		assert.equal(main.html(), '<div class="second"></div><div class="third"></div><div class="forth"></div><div>Prepend</div><div class="first">First</div>', "Can prepend multiple nodes in the right order");

		var copy = $(".testtemp .forth");
		$(".testtemp .second, .testtemp .third").prepend(copy);
		assert.equal(main.html(), '<div class="second"><div class="forth"></div></div><div class="third"><div class="forth"></div></div><div>Prepend</div><div class="first">First</div>', "Objects are cloned and moved correctly on prepend");

		var same = [];
		$(".testtemp .forth").each(function (i) {
			same.push(this.isSameNode(copy[0]));
		});
		assert.deepEqual(same, [false, true], "The correct nodes were cloned or moved");
	});

	QUnit.test("$.fn.append", function (assert) {
		var main = $(".testtemp");

		assert.deepEqual(main.append("<div>Append</div>"), main, "Returns itself on append");
		assert.equal(main.html(), '<div class="first">First</div><div>Append</div>', "Can append html");

		var list = $('<div class="second"></div><div class="third"></div><div class="forth"></div>');
		main.append(list);
		assert.equal(main.html(), '<div class="first">First</div><div>Append</div><div class="second"></div><div class="third"></div><div class="forth"></div>', "Can prepend multiple nodes in the right order");

		var copy = $(".testtemp .forth");
		$(".testtemp .first, .testtemp .second").append(copy);
		assert.equal(main.html(), '<div class="first">First<div class="forth"></div></div><div>Append</div><div class="second"><div class="forth"></div></div><div class="third"></div>', "Objects are cloned and moved correctly on prepend");

		var same = [];
		$(".testtemp .forth").each(function (i) {
			same.push(this.isSameNode(copy[0]));
		});
		assert.deepEqual(same, [false, true], "The correct nodes were cloned or moved");
	});

	QUnit.test("$.fn.before", function (assert) {
		var main = $(".testtemp"),
			inner = $(".testtemp .first");

		assert.deepEqual(inner.before('<div class="before">Before</div>'), inner, "Returns itself on before");
		assert.equal(main.html(), '<div class="before">Before</div><div class="first">First</div>', "Can insert html before");

		$(".testtemp .before").before(inner);
		assert.equal(main.html(), '<div class="first">First</div><div class="before">Before</div>', "Can move html with before");

		inner.before('<div class="copy">Copy/Clone</div>');
		assert.equal(main.html(), '<div class="copy">Copy/Clone</div><div class="first">First</div><div class="before">Before</div>', "Can insert html before");

		$(".testtemp div").before('<div class="another">Another</div>', '<div class="another2">Another</div>');
		assert.equal(main.html(), '<div class="another">Another</div><div class="another2">Another</div><div class="copy">Copy/Clone</div><div class="another">Another</div><div class="another2">Another</div><div class="first">First</div><div class="another">Another</div><div class="another2">Another</div><div class="before">Before</div>', "Can insert multiple nodes before");

		var copy = $(".testtemp .copy");
		$(".testtemp .another").before(copy);
		assert.equal(main.html(), '<div class="copy">Copy/Clone</div><div class="another">Another</div><div class="another2">Another</div><div class="copy">Copy/Clone</div><div class="another">Another</div><div class="another2">Another</div><div class="first">First</div><div class="copy">Copy/Clone</div><div class="another">Another</div><div class="another2">Another</div><div class="before">Before</div>', "Objects are cloned and moved correctly on before");

		var same = [];
		$(".testtemp .copy").each(function (i) {
			same.push(this.isSameNode(copy[0]));
		});
		assert.deepEqual(same, [false, false, true], "The correct nodes were cloned or moved");
	});

	QUnit.test("$.fn.after", function (assert) {
		var main = $(".testtemp"),
			inner = $(".testtemp .first");

		assert.deepEqual(inner.after('<div class="after">After</div>'), inner, "Returns itself on after");
		assert.equal(main.html(), '<div class="first">First</div><div class="after">After</div>', "Can insert html after");

		$(".testtemp .after").after(inner);
		assert.equal(main.html(), '<div class="after">After</div><div class="first">First</div>', "Can move html with after");

		inner.after('<div class="copy">Copy/Clone</div>');
		assert.equal(main.html(), '<div class="after">After</div><div class="first">First</div><div class="copy">Copy/Clone</div>', "Can insert html after");

		$(".testtemp div").after('<div class="another">Another</div>', '<div class="another2">Another</div>');
		assert.equal(main.html(), '<div class="after">After</div><div class="another">Another</div><div class="another2">Another</div><div class="first">First</div><div class="another">Another</div><div class="another2">Another</div><div class="copy">Copy/Clone</div><div class="another">Another</div><div class="another2">Another</div>', "Can insert html after");

		var copy = $(".testtemp .copy");
		$(".testtemp .another").after(copy);
		assert.equal(main.html(), '<div class="after">After</div><div class="another">Another</div><div class="copy">Copy/Clone</div><div class="another2">Another</div><div class="first">First</div><div class="another">Another</div><div class="copy">Copy/Clone</div><div class="another2">Another</div><div class="another">Another</div><div class="copy">Copy/Clone</div><div class="another2">Another</div>', "Objects are cloned and moved correctly on after");

		var same = [];
		$(".testtemp .copy").each(function (i) {
			same.push(this.isSameNode(copy[0]));
		});
		assert.deepEqual(same, [false, false, true], "The correct nodes were cloned or moved");

		// test inserting with function on multiple elements
		test.innerHTML = '<div class="testtemp"><div class="first">First</div><div class="second">Second</div></div>';
		$(".test div").after(function () {
			return $("<span>", {"class": "after"});
		});
		assert.equal(test.innerHTML, '<div class="testtemp"><div class="first">First</div><span class="after"></span><div class="second">Second</div><span class="after"></span></div><span class="after"></span>', "Can insert multiple nodes using a callback");
	});

	hooks.after(() => {
		test.innerHTML = "";
	});
});
