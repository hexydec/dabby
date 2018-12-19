import $ from "../../../dist/dabby.js";

QUnit.module("Traversal", hooks => {
	var test = document.getElementsByClassName("test")[0];

	hooks.before(() => {
		test.innerHTML = '<div class="testtemp"><div class="testtemp2"><div class="testtemp3">test</div></div></div>';
	});

	QUnit.test("$.fn.parent", function (assert) {
		const obj = $(".testtemp3");

		assert.deepEqual(obj.parent().get(), $(".testtemp2").get(), "Can select parent");
		assert.deepEqual(obj.parent(".testtemp2").get(), $(".testtemp2").get(), "Can select parent with selector");
		assert.deepEqual(obj.parent(".testtemp").get(), [], "Doesn't select parent when selector doesn't match");
	});

	QUnit.test("$.fn.parents", function (assert) {
		const obj = $(".testtemp3");
		let parents = [],
			parent = obj.get(0);

		while (parent.parentNode && parent.parentNode.nodeType === Node.ELEMENT_NODE) {
			parents.push(parent.parentNode);
			parent = parent.parentNode;
		}
		assert.deepEqual(obj.parents().get(), parents, "Can select parents");
	});

	QUnit.test("$.fn.parentsUntil", function (assert) {
		const obj = $(".testtemp3");
		let parents = [],
			parent = obj.get(0);

		while (parent.parentNode && parent.parentNode.nodeType === Node.ELEMENT_NODE && parent.parentNode.className !== "test") {
			parents.push(parent.parentNode);
			parent = parent.parentNode;
		}
		assert.deepEqual(obj.parentsUntil(".test").get(), parents, "Can select parents until a particular node");
	});

	hooks.after(() => {
		test.innerHTML = "";
	});
});
