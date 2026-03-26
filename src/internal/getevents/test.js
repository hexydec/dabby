import events from "./getevents.js";

QUnit.module("Internal");

QUnit.test("getevents", function (assert) {
	assert.ok(Array.isArray(events), "Events is an array");
	assert.equal(events.length, 24, "Contains 24 event names");
	assert.ok(events.includes("click"), "Contains click");
	assert.ok(events.includes("focus"), "Contains focus");
	assert.ok(events.includes("blur"), "Contains blur");
	assert.ok(events.includes("submit"), "Contains submit");
	assert.ok(events.includes("keydown"), "Contains keydown");
	assert.ok(events.includes("mouseenter"), "Contains mouseenter");
	assert.ok(events.includes("contextmenu"), "Contains contextmenu");
	assert.ok(events.includes("scroll"), "Contains scroll");
	assert.ok(events.includes("resize"), "Contains resize");
});
