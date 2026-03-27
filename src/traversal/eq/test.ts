import { describe, it, expect, beforeAll, afterAll } from "vitest";
import $ from "../../build.js";

describe("Traversal", () => {
	let test: HTMLElement;

	beforeAll(() => {
		test = document.createElement("div");
		test.className = "test";
		document.body.appendChild(test);
		test.innerHTML = '<div class="testtemp">test</div><div class="testtemp">test 2</div><div class="testtemp">test 3</div>';
	});

	afterAll(() => {
		test.remove();
	});

	describe("$.fn.eq", () => {
		it("returns only a single node", () => {
			expect($(".testtemp").eq(0).get().length).toBe(1);
		});

		it("can select by positive index", () => {
			expect($(".testtemp").eq(0).get(0).innerHTML).toBe("test");
			expect($(".testtemp").eq(1).get(0).innerHTML).toBe("test 2");
			expect($(".testtemp").eq(2).get(0).innerHTML).toBe("test 3");
		});

		it("can select by negative index", () => {
			expect($(".testtemp").eq(-1).get(0).innerHTML).toBe("test 3");
			expect($(".testtemp").eq(-2).get(0).innerHTML).toBe("test 2");
			expect($(".testtemp").eq(-3).get(0).innerHTML).toBe("test");
		});

		it("returns empty for out of range positive index", () => {
			expect($(".testtemp").eq(4).get()).toEqual($().get());
		});

		it("returns empty for out of range negative index", () => {
			expect($(".testtemp").eq(-4).get()).toEqual($().get());
		});
	});
});
