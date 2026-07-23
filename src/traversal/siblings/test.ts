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

	describe("$.fn.siblings", () => {
		it("can get siblings", () => {
			expect($(".testtemp2").siblings().get()).toEqual($(".testtemp, .testtemp3").get());
		});

		it("can filter siblings by selector", () => {
			expect($(".testtemp2").siblings(".testtemp3").get()).toEqual($(".testtemp3").get());
		});

		it("can filter siblings by Dabby object", () => {
			expect($(".testtemp2").siblings($(".testtemp3")).get()).toEqual($(".testtemp3").get());
		});

		it("can filter siblings by node collection", () => {
			expect($(".testtemp2").siblings($(".testtemp3").get()).get()).toEqual($(".testtemp3").get());
		});

		it("excludes the element itself", () => {
			const siblings = $(".testtemp2").siblings();
			expect(siblings.is(".testtemp2")).toBe(false);
		});
	});
});
