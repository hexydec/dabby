import { describe, it, expect, beforeAll, afterAll } from "vitest";
import $ from "../../build.js";

describe("Manipulation", () => {
	let test: HTMLElement;

	beforeAll(() => {
		test = document.createElement("div");
		test.className = "test";
		document.body.appendChild(test);
	});

	afterAll(() => {
		test.remove();
	});

	describe("$.fn.wrap", () => {
		it("returns self on wrap", () => {
			test.innerHTML = '<div class="testtemp"><p>Line 1</p><p>Line 2</p><p>Line 3</p></div>';
			const obj = $(".testtemp p");
			expect(obj.wrap("<div>")).toBe(obj);
		});

		it("can wrap elements with html", () => {
			test.innerHTML = '<div class="testtemp"><p>Line 1</p><p>Line 2</p><p>Line 3</p></div>';
			$(".testtemp p").wrap("<div>");
			expect($(".testtemp > div > p").length).toBe(3);
		});

		it("can wrap elements with deep html", () => {
			test.innerHTML = '<div class="testtemp"><p>Line 1</p><p>Line 2</p><p>Line 3</p></div>';
			$(".testtemp p").wrap("<div><span></span></div>");
			expect($(".testtemp > div > span > p").length).toBe(3);
		});

		it("can wrap elements with existing element", () => {
			test.innerHTML = '<div class="testtemp"><p>Line 1</p><p>Line 2</p><p>Line 3</p></div><div class="testtemp2"></div>';
			$(".testtemp p").wrap(".testtemp2");
			expect($(".testtemp > .testtemp2 > p").length).toBe(3);
		});
	});
});
