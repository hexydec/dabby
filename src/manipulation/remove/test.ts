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

	describe("$.fn.remove", () => {
		it("removes elements from DOM with selector filter", () => {
			test.innerHTML = '<div class="testtemp"><div></div></div><div class="testtemp2"></div>';
			const obj = $(".testtemp, .testtemp2");
			obj.remove(".testtemp2");
			expect(document.querySelectorAll(".testtemp2").length).toBe(0);
		});

		it("removes attached events", () => {
			test.innerHTML = '<div class="testtemp"></div><div class="testtemp2"></div>';
			let clicked = 0;
			const obj = $(".testtemp, .testtemp2").on("click", () => { clicked++; });
			obj.remove(".testtemp2");
			obj.click();
			expect(clicked).toBe(1);
		});

		it("does not error when removing detached node", () => {
			const node = $("<div>");
			expect(node.remove()).toBe(node);
		});
	});

	describe("$.fn.detach", () => {
		it("returns the node when detached", () => {
			test.innerHTML = '<div class="testtemp"><div class="testtemp2"></div></div>';
			const obj = $(".testtemp");
			expect(obj.detach().get(0)).toBe(obj.get(0));
		});

		it("removes node from DOM", () => {
			test.innerHTML = '<div class="testtemp2"></div>';
			$(".testtemp2").detach();
			expect($(".testtemp2").get()).toEqual([]);
		});
	});
});
