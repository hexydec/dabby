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

	describe("$.fn.unwrap", () => {
		it("returns self on unwrap", () => {
			test.innerHTML = '<div class="testtemp"><div class="testtemp2">test 2</div><div class="testtemp3">test 3</div></div>';
			const obj = $(".testtemp2");
			expect(obj.unwrap().get()).toEqual(obj.get());
		});

		it("can unwrap node", () => {
			test.innerHTML = '<div class="testtemp"><div class="testtemp2">test 2</div><div class="testtemp3">test 3</div></div>';
			$(".testtemp2").unwrap();
			expect($(".test > div").get()).toEqual($(".testtemp2, .testtemp3").get());
		});
	});
});
