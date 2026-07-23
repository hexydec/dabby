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

	describe("$.fn.odd", () => {
		it("returns correct number of odd-indexed elements", () => {
			test.innerHTML = '<div class="t1"></div><div class="t2"></div><div class="t3"></div><div class="t4"></div><div class="t5"></div><div class="t6"></div>';
			expect($(".test > div").odd().length).toBe(3);
		});

		it("selects elements at indices 1, 3, 5", () => {
			test.innerHTML = '<div class="t1"></div><div class="t2"></div><div class="t3"></div><div class="t4"></div><div class="t5"></div><div class="t6"></div>';
			const obj = $(".test > div");
			expect(obj.odd().get()).toEqual([$(".t2").get(0), $(".t4").get(0), $(".t6").get(0)]);
		});

		it("single element returns empty (index 0 is even)", () => {
			test.innerHTML = '<div class="t1"></div>';
			expect($(".t1").odd().length).toBe(0);
		});

		it("empty collection returns empty", () => {
			expect($(".nonexistent").odd().length).toBe(0);
		});
	});
});
