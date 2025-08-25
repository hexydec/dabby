import $ from "../../../dist/dabby.js";

QUnit.module("Utils");

QUnit.test("$.parseHTML", function (assert) {

	// Simple HTML string
	let output = $.parseHTML("<p>hello</p>");
	assert.ok(output instanceof Array, "Returns an array");
	assert.equal(output.length, 1, "Returns a single element for a simple string");
	assert.equal(output[0].nodeName, "P", "The node is a paragraph element");
	assert.equal(output[0].textContent, "hello", "The node has the correct content");

	// Multiple top-level elements
	output = $.parseHTML("<div></div><span></span>");
	assert.equal(output.length, 2, "Returns multiple elements for a string with multiple top-level nodes");
	assert.equal(output[0].nodeName, "DIV", "The first node is a div");
	assert.equal(output[1].nodeName, "SPAN", "The second node is a span");

	// Self-closing tag
	output = $.parseHTML("<br>");
	assert.equal(output.length, 1, "Correctly parses a self-closing tag");
	assert.equal(output[0].nodeName, "BR", "The node is a br element");

	// HTML with nested elements
	const nestedHtml = "<ul><li>one</li><li>two</li></ul>";
	output = $.parseHTML(nestedHtml);
	assert.equal(output.length, 1, "Returns a single top-level element for nested HTML");
	assert.equal(output[0].nodeName, "UL", "The node is a ul element");
	assert.equal(output[0].children.length, 2, "The ul has two children");
	assert.equal(output[0].children[0].nodeName, "LI", "The first child is an li");
	assert.equal(output[0].children[0].textContent, "one", "The first child has correct content");

	// Fragment with whitespace and comments
	const fragment = "  <!-- comment -->\n<p>test</p>\n<span>foo</span>";
	output = $.parseHTML(fragment);
	assert.equal(output.length, 2, "Ignores whitespace and comments, returning only elements");
	assert.equal(output[0].nodeName, "P", "Correctly identifies the first element");
	assert.equal(output[1].nodeName, "SPAN", "Correctly identifies the second element");

	// Script tag handling with runscripts = false (default)
	const scriptHtml = "<div>Test</div><script>console.log('hi');</script>";
	output = $.parseHTML(scriptHtml);
	assert.equal(output.length, 2, "Returns the script tag as an element by default");
	assert.equal(output[1].nodeName, "SCRIPT", "The script tag is in the output array");
	
	// Test that scripts are not executed. 
	// This is a difficult test to write, but we can verify that no script tags are appended to the head or body
	// by checking the document head and body before and after parsing.
	let headCountBefore = document.head.children.length;
	let bodyCountBefore = document.body.children.length;
	$.parseHTML(scriptHtml);
	assert.equal(document.head.children.length, headCountBefore, "No new script tags were appended to the head");
	assert.equal(document.body.children.length, bodyCountBefore, "No new script tags were appended to the body");
	
	// Complex HTML
	const complexHtml = '<div><p>Hello</p><a href="#">world</a></div>';
	output = $.parseHTML(complexHtml);
	assert.equal(output.length, 1, "Parses complex HTML correctly");
	assert.equal(output[0].outerHTML, complexHtml, "The parsed element's outerHTML matches the input");

	// Empty string or null
	output = $.parseHTML("");
	assert.deepEqual(output, [], "Returns an empty array for an empty string");
	output = $.parseHTML(null);
	assert.deepEqual(output, [], "Returns an empty array for null input");
	output = $.parseHTML(undefined);
	assert.deepEqual(output, [], "Returns an empty array for undefined input");

	// test scripts
	window.loaded = 0;
	
	// A new test context is needed to properly test script execution
	const asynchtml = "<p>Test</p><script>window.loaded = 1;</script>";

	// Use `$.parseHTML` with the runscripts flag set to true
	output = $.parseHTML(asynchtml, document, true);
	
	// Give the script a moment to execute
	const done = assert.async();
	setTimeout(() => {

		// Check the output of the parseHtml function
		assert.equal(output.length, 2, "Returns only the non-script elements when runscripts is true");
		assert.equal(output[0].nodeName, "P", "The paragraph element is returned");
	
		// Check that the script was executed in the context
		const scriptElement = document.head.querySelector("script");
		assert.ok(scriptElement, "A script element was appended to the context's head");
		assert.equal(scriptElement.textContent, "window.loaded = 1;", "The script content is correct");
		
		// check the value in the script was updated
		assert.equal(window.loaded, 1, "Script executed corectly");
		done();
	}, 100);
});