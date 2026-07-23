import { describe, it, expect, beforeAll, afterAll } from "vitest";
import $ from "../../build.js";

describe("Core", () => {
	let test;

	beforeAll(() => {
		test = document.createElement("div");
		test.className = "test";
		document.body.appendChild(test);
		test.innerHTML = '<span class="item1">one</span><span class="item2">two</span>';
	});

	afterAll(() => {
		test.remove();
	});

	describe("$.fn.get", () => {
		it("returns all elements as an array when no index given", () => {
			const spans = test.querySelectorAll("span");
			expect($(".test span").get()).toEqual([spans[0], spans[1]]);
		});

		it("returns a single element by index", () => {
			const span = test.querySelector(".item1");
			expect($(".test span").get(0)).toBe(span);
		});

		it("returns undefined for out-of-range index", () => {
			expect($(".test span").get(5)).toBeUndefined();
		});

		it("returns empty array for empty collection", () => {
			expect($(".nonexistent").get()).toEqual([]);
		});

		it("supports negative indices", () => {
			const span = test.querySelector(".item2");
			expect($(".test span").get(-1)).toBe(span);
		});
	});
});
