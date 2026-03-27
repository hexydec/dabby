import { describe, it, expect, beforeAll, afterAll } from "vitest";
import $ from "../../build.js";

describe("Traversal", () => {
	let test: HTMLElement;

	beforeAll(() => {
		test = document.createElement("div");
		test.className = "test";
		document.body.appendChild(test);
		test.innerHTML = '<div class="testtemp">test</div><div class="testtemp2">test 2</div><div class="testtemp3">test 3</div><div class="testtemp4">test 4</div>';
	});

	afterAll(() => {
		test.remove();
	});

	describe("$.fn.next", () => {
		it("can find next element", () => {
			expect($(".testtemp").next().get(0)).toBe($(".testtemp2").get(0));
		});

		it("can find next element matching a selector", () => {
			expect($(".testtemp").next(".testtemp2").get(0)).toBe($(".testtemp2").get(0));
		});

		it("returns empty when selector doesn't match next sibling", () => {
			expect($(".testtemp").next(".testtemp3").length).toBe(0);
		});
	});

	describe("$.fn.nextAll", () => {
		it("can find all next elements", () => {
			expect($(".testtemp").nextAll().get()).toEqual($(".testtemp2, .testtemp3, .testtemp4").get());
		});

		it("can filter next elements by selector", () => {
			expect($(".testtemp").nextAll(".testtemp, .testtemp3").get()).toEqual($(".testtemp3").get());
		});
	});

	describe("$.fn.nextUntil", () => {
		it("can find next elements until", () => {
			expect($(".testtemp").nextUntil(".testtemp4").get()).toEqual($(".testtemp2, .testtemp3").get());
		});

		it("can filter next elements until with selector", () => {
			expect($(".testtemp").nextUntil(".testtemp4", ".testtemp2").get()).toEqual($(".testtemp2").get());
		});
	});

	describe("$.fn.prev", () => {
		it("can find previous element", () => {
			expect($(".testtemp4").prev().get(0)).toBe($(".testtemp3").get(0));
		});

		it("can find previous element matching selector", () => {
			expect($(".testtemp4").prev(".testtemp3").get(0)).toBe($(".testtemp3").get(0));
		});

		it("returns empty when selector doesn't match previous sibling", () => {
			expect($(".testtemp4").prev(".testtemp").length).toBe(0);
		});
	});

	describe("$.fn.prevAll", () => {
		it("can find all previous elements", () => {
			expect($(".testtemp4").prevAll().get()).toEqual([$(".testtemp3").get(0), $(".testtemp2").get(0), $(".testtemp").get(0)]);
		});

		it("can filter previous elements by selector", () => {
			expect($(".testtemp4").prevAll(".testtemp4, .testtemp3, .testtemp").get()).toEqual([$(".testtemp3").get(0), $(".testtemp").get(0)]);
		});
	});

	describe("$.fn.prevUntil", () => {
		it("can find previous elements until", () => {
			expect($(".testtemp4").prevUntil(".testtemp").get()).toEqual([$(".testtemp3").get(0), $(".testtemp2").get(0)]);
		});

		it("can filter previous elements until with selector", () => {
			expect($(".testtemp4").prevUntil(".testtemp4", ".testtemp2").get()).toEqual($(".testtemp2").get());
		});
	});
});
