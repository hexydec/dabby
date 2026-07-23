import { describe, it, expect } from "vitest";
import $ from "../../build.js";

describe("Utils", () => {
	describe("$.parseHTML", () => {
		it("returns an array", () => {
			const output = $.parseHTML("<p>hello</p>");
			expect(output).toBeInstanceOf(Array);
		});

		it("parses simple HTML string", () => {
			const output = $.parseHTML("<p>hello</p>");
			expect(output.length).toBe(1);
			expect(output[0].nodeName).toBe("P");
			expect(output[0].textContent).toBe("hello");
		});

		it("parses multiple top-level elements", () => {
			const output = $.parseHTML("<div></div><span></span>");
			expect(output.length).toBe(2);
			expect(output[0].nodeName).toBe("DIV");
			expect(output[1].nodeName).toBe("SPAN");
		});

		it("parses self-closing tags", () => {
			const output = $.parseHTML("<br>");
			expect(output.length).toBe(1);
			expect(output[0].nodeName).toBe("BR");
		});

		it("parses nested HTML", () => {
			const output = $.parseHTML("<ul><li>one</li><li>two</li></ul>");
			expect(output.length).toBe(1);
			expect(output[0].nodeName).toBe("UL");
			expect((output[0] as Element).children.length).toBe(2);
		});

		it("ignores whitespace and comments", () => {
			const output = $.parseHTML("  <!-- comment -->\n<p>test</p>\n<span>foo</span>");
			expect(output.length).toBe(2);
			expect(output[0].nodeName).toBe("P");
			expect(output[1].nodeName).toBe("SPAN");
		});

		it("includes script tags as elements by default", () => {
			const output = $.parseHTML("<div>Test</div><script>console.log('hi');</script>");
			expect(output.length).toBe(2);
			expect(output[1].nodeName).toBe("SCRIPT");
		});

		it("parses complex HTML correctly", () => {
			const complexHtml = '<div><p>Hello</p><a href="#">world</a></div>';
			const output = $.parseHTML(complexHtml);
			expect(output.length).toBe(1);
			expect((output[0] as Element).outerHTML).toBe(complexHtml);
		});

		it("returns empty array for empty/null/undefined input", () => {
			expect($.parseHTML("")).toEqual([]);
			expect($.parseHTML(null)).toEqual([]);
			expect($.parseHTML(undefined)).toEqual([]);
		});
	});
});
