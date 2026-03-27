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

	describe("$.fn.even", () => {
		it("returns correct number of even-indexed elements", () => {
			test.innerHTML = '<div class="t1"></div><div class="t2"></div><div class="t3"></div><div class="t4"></div><div class="t5"></div><div class="t6"></div>';
			expect($(".test > div").even().length).toBe(3);
		});

		it("selects elements at indices 0, 2, 4", () => {
			test.innerHTML = '<div class="t1"></div><div class="t2"></div><div class="t3"></div><div class="t4"></div><div class="t5"></div><div class="t6"></div>';
			const obj = $(".test > div");
			expect(obj.even().get()).toEqual([$(".t1").get(0), $(".t3").get(0), $(".t5").get(0)]);
		});

		it("single element returns itself (index 0 is even)", () => {
			test.innerHTML = '<div class="t1"></div>';
			expect($(".t1").even().length).toBe(1);
		});

		it("empty collection returns empty", () => {
			expect($(".nonexistent").even().length).toBe(0);
		});
	});
});
