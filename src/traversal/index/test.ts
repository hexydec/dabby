import { describe, it, expect, beforeAll, afterAll } from "vitest";
import $ from "../../build.js";

describe("Traversal", () => {
	let test: HTMLElement;

	beforeAll(() => {
		test = document.createElement("div");
		test.className = "test";
		document.body.appendChild(test);
		test.innerHTML = '<div class="testtemp"></div><div class="testtemp2"></div><div class="testtemp3"></div>';
	});

	afterAll(() => {
		test.remove();
	});

	describe("$.fn.index", () => {
		it("finds element index amongst siblings", () => {
			expect($(".testtemp2, .testtemp3").index()).toBe(1);
			expect($(".testtemp3").index()).toBe(2);
		});

		it("finds element index from string selector", () => {
			expect($(".testtemp").index(".test div")).toBe(0);
			expect($(".testtemp2").index(".test div")).toBe(1);
			expect($(".testtemp3").index(".test div")).toBe(2);
		});

		it("finds element index from element", () => {
			const obj = $(".test div");
			expect(obj.index($(".testtemp").get(0))).toBe(0);
			expect(obj.index($(".testtemp2").get(0))).toBe(1);
			expect(obj.index($(".testtemp3").get(0))).toBe(2);
		});

		it("finds element index from Dabby collection", () => {
			const obj = $(".test div");
			expect(obj.index($(".testtemp"))).toBe(0);
			expect(obj.index($(".testtemp2"))).toBe(1);
			expect(obj.index($(".testtemp3"))).toBe(2);
		});
	});
});
