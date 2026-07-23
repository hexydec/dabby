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

	describe("$.fn.clone", () => {
		it("can clone elements", () => {
			test.innerHTML = '<div class="testtemp"><span>child</span></div>';
			const clone = $(".testtemp").clone();
			expect(clone.get(0).className).toBe("testtemp");
			expect(clone.get(0)).not.toBe(test.querySelector(".testtemp"));
		});

		it("deep clones children", () => {
			test.innerHTML = '<div class="testtemp"><span>child</span></div>';
			const clone = $(".testtemp").clone();
			expect(clone.get(0).innerHTML).toBe("<span>child</span>");
		});

		it("cloned element is independent", () => {
			test.innerHTML = '<div class="testtemp"><span>child</span></div>';
			const original = $(".testtemp");
			const clone = original.clone();
			clone.html("changed");
			expect(original.html()).toBe("<span>child</span>");
		});

		it("returns correct length", () => {
			test.innerHTML = '<div class="t">1</div><div class="t">2</div>';
			const clone = $(".t").clone();
			expect(clone.length).toBe(2);
		});
	});
});
