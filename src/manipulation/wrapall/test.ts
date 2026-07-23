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

	describe("$.fn.wrapAll", () => {
		it("returns self on wrapAll", () => {
			test.innerHTML = '<div class="testtemp"><p>Line 1</p><p>Line 2</p><p>Line 3</p></div>';
			const obj = $(".testtemp p");
			expect(obj.wrapAll("<div>")).toBe(obj);
		});

		it("can wrap all elements with html", () => {
			test.innerHTML = '<div class="testtemp"><p>Line 1</p><p>Line 2</p><p>Line 3</p></div>';
			$(".testtemp p").wrapAll("<div class='wrapper'>");
			expect($(".testtemp > .wrapper").length).toBe(1);
			expect($(".testtemp > .wrapper > p").length).toBe(3);
		});

		it("can wrap all elements with deep html", () => {
			test.innerHTML = '<div class="testtemp"><p>Line 1</p><p>Line 2</p><p>Line 3</p></div>';
			$(".testtemp p").wrapAll("<div><span></span></div>");
			expect($(".testtemp > div > span > p").length).toBe(3);
		});
	});
});
