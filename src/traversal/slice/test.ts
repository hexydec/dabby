import { describe, it, expect, beforeAll, afterAll } from "vitest";
import $ from "../../build.js";

describe("Traversal", () => {
	let test: HTMLElement;

	beforeAll(() => {
		test = document.createElement("div");
		test.className = "test";
		document.body.appendChild(test);
		test.innerHTML = '<div class="t1"></div><div class="t2"></div><div class="t3"></div><div class="t4"></div><div class="t5"></div><div class="t6"></div>';
	});

	afterAll(() => {
		test.remove();
	});

	describe("$.fn.slice", () => {
		it("can slice from start index", () => {
			expect($(".test > div").slice(4).get()).toEqual($(".t5, .t6").get());
		});

		it("can slice with start and end indices", () => {
			expect($(".test > div").slice(2, 4).get()).toEqual($(".t3, .t4").get());
		});

		it("can slice with negative start", () => {
			expect($(".test > div").slice(-2).get()).toEqual($(".t5, .t6").get());
		});

		it("can slice with negative start and end", () => {
			expect($(".test > div").slice(-3, -1).get()).toEqual($(".t4, .t5").get());
		});
	});
});
