import { describe, it, expect, beforeAll, afterAll } from "vitest";
import $ from "../../build.js";

describe("Traversal", () => {
	let test: HTMLElement;

	beforeAll(() => {
		test = document.createElement("div");
		test.className = "test";
		document.body.appendChild(test);
	});

	afterAll(() => {
		test.remove();
	});

	describe("$.fn.closest", () => {
		it("returns unique parent nodes", () => {
			test.innerHTML = '<div class="testtemp"><div class="testtemp2"><div class="testtemp3">test</div></div></div>';
			const obj = $(".testtemp3, .testtemp2, .testtemp");
			expect(obj.closest(".test").get()).toEqual([test]);
		});

		it("can match self", () => {
			test.innerHTML = '<div class="testtemp"></div>';
			const obj = $(".testtemp");
			expect(obj.closest(".testtemp").get()).toEqual(obj.get());
		});

		it("returns empty for no match", () => {
			test.innerHTML = '<div class="testtemp"></div>';
			expect($(".testtemp").closest(".nonexistent").length).toBe(0);
		});

		it("returns empty for empty collection", () => {
			expect($(".nonexistent").closest(".test").length).toBe(0);
		});
	});
});
