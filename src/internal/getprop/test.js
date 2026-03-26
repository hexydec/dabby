import getProp from "./getprop.js";

QUnit.module("Internal");

QUnit.test("getProp", function (assert) {
	// Special cases
	assert.equal(getProp("class"), "className", "Maps 'class' to 'className'");
	assert.equal(getProp("for"), "htmlFor", "Maps 'for' to 'htmlFor'");

	// Case-insensitive mixed-case properties
	assert.equal(getProp("tabindex"), "tabIndex", "Maps 'tabindex' to 'tabIndex'");
	assert.equal(getProp("accesskey"), "accessKey", "Maps 'accesskey' to 'accessKey'");
	assert.equal(getProp("contenteditable"), "contentEditable", "Maps 'contenteditable' to 'contentEditable'");
	assert.equal(getProp("readonly"), "readOnly", "Maps 'readonly' to 'readOnly'");
	assert.equal(getProp("rowspan"), "rowSpan", "Maps 'rowspan' to 'rowSpan'");
	assert.equal(getProp("colspan"), "colSpan", "Maps 'colspan' to 'colSpan'");
	assert.equal(getProp("outerhtml"), "outerHTML", "Maps 'outerhtml' to 'outerHTML'");
	assert.equal(getProp("cellspacing"), "cellSpacing", "Maps 'cellspacing' to 'cellSpacing'");
	assert.equal(getProp("frameborder"), "frameBorder", "Maps 'frameborder' to 'frameBorder'");

	// Unmapped properties pass through as lowercase
	assert.equal(getProp("id"), "id", "Unmapped properties return lowercase");
	assert.equal(getProp("title"), "title", "Standard properties pass through");
});
