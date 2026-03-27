import { describe, it, expect, beforeAll, afterAll } from "vitest";
import $ from "../../build.js";

describe("Attributes", () => {
	let test: HTMLElement;

	beforeAll(() => {
		test = document.createElement("div");
		test.className = "test";
		document.body.appendChild(test);
		test.innerHTML = '<div class="testtemp testtemp2"></div>';
	});

	afterAll(() => {
		test.remove();
	});

	describe("$.fn.hasClass", () => {
		it("can detect class that exists", () => {
			expect($(".testtemp").hasClass("testtemp2")).toBe(true);
		});

		it("can detect class that does not exist", () => {
			expect($(".testtemp").hasClass("testtemp3")).toBe(false);
		});

		it("returns false for empty collection", () => {
			expect($(".nonexistent").hasClass("test")).toBe(false);
		});

		it("returns true if any element in collection has the class", () => {
			test.innerHTML = '<div class="a"></div><div class="b"></div>';
			expect($(".test div").hasClass("b")).toBe(true);
		});
	});
});
