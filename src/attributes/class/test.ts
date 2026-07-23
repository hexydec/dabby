import { describe, it, expect, beforeEach, beforeAll, afterAll } from "vitest";
import $ from "../../build.js";

describe("Attributes", () => {
	let test: HTMLElement;

	beforeAll(() => {
		test = document.createElement("div");
		test.className = "test";
		document.body.appendChild(test);
	});

	afterAll(() => {
		test.remove();
	});

	describe("$.fn.addClass", () => {
		beforeEach(() => {
			test.innerHTML = '<div class="testtemp"></div>';
		});

		it("returns itself when setting class", () => {
			const main = $(".testtemp");
			expect(main.addClass("test1")).toBe(main);
		});

		it("can add a single class", () => {
			const main = $(".testtemp");
			const rmain = test.querySelector(".testtemp") as HTMLElement;
			main.addClass("test1");
			expect(rmain.className).toBe("testtemp test1");
		});

		it("can add multiple classes as space-separated string", () => {
			const main = $(".testtemp");
			const rmain = test.querySelector(".testtemp") as HTMLElement;
			main.addClass("test2 test3");
			expect(rmain.className).toBe("testtemp test2 test3");
		});

		it("can add multiple classes as array", () => {
			const main = $(".testtemp");
			const rmain = test.querySelector(".testtemp") as HTMLElement;
			main.addClass(["new1", "new2"]);
			expect(rmain.className).toBe("testtemp new1 new2");
		});

		it("does not add duplicate classes", () => {
			const main = $(".testtemp");
			const rmain = test.querySelector(".testtemp") as HTMLElement;
			main.addClass("testtemp");
			expect(rmain.className).toBe("testtemp");
		});
	});

	describe("$.fn.removeClass", () => {
		beforeEach(() => {
			test.innerHTML = '<div class="testtemp test1 test2 test3"></div>';
		});

		it("returns itself when removing class", () => {
			const main = $(".testtemp");
			expect(main.removeClass("test1")).toBe(main);
		});

		it("can remove a single class", () => {
			const main = $(".testtemp");
			const rmain = test.querySelector(".testtemp") as HTMLElement;
			main.removeClass("test1");
			expect(rmain.className).toBe("testtemp test2 test3");
		});

		it("can remove multiple classes", () => {
			const main = $(".testtemp");
			const rmain = test.querySelector(".testtemp") as HTMLElement;
			main.removeClass("test2 test3");
			expect(rmain.className).toBe("testtemp test1");
		});

		it("gracefully handles removing non-existent class", () => {
			const main = $(".testtemp");
			const rmain = test.querySelector(".testtemp") as HTMLElement;
			main.removeClass("nonexistent");
			expect(rmain.className).toBe("testtemp test1 test2 test3");
		});
	});

	describe("$.fn.toggleClass", () => {
		beforeEach(() => {
			test.innerHTML = '<div class="testtemp"></div>';
		});

		it("returns itself when toggling class", () => {
			const main = $(".testtemp");
			expect(main.toggleClass("test1")).toBe(main);
		});

		it("can toggle class on", () => {
			const main = $(".testtemp");
			const rmain = test.querySelector(".testtemp") as HTMLElement;
			main.toggleClass("test1");
			expect(rmain.className).toBe("testtemp test1");
		});

		it("can toggle class off", () => {
			const main = $(".testtemp");
			const rmain = test.querySelector(".testtemp") as HTMLElement;
			main.toggleClass("test1");
			main.toggleClass("test1");
			expect(rmain.className).toBe("testtemp");
		});

		it("can toggle multiple classes", () => {
			const main = $(".testtemp");
			const rmain = test.querySelector(".testtemp") as HTMLElement;
			main.toggleClass("test2 test3");
			expect(rmain.className).toBe("testtemp test2 test3");
		});

		it("can toggle with explicit state true", () => {
			const main = $(".testtemp");
			const rmain = test.querySelector(".testtemp") as HTMLElement;
			main.toggleClass("test2 test3 test4", true);
			expect(rmain.className).toBe("testtemp test2 test3 test4");
		});

		it("can toggle with explicit state false", () => {
			const main = $(".testtemp");
			const rmain = test.querySelector(".testtemp") as HTMLElement;
			rmain.className = "testtemp test2 test3";
			main.toggleClass("test5 test3 test4", false);
			expect(rmain.className).toBe("testtemp test2");
		});

		it("treats 0 as toggle (not state)", () => {
			const main = $(".testtemp");
			const rmain = test.querySelector(".testtemp") as HTMLElement;
			rmain.className = "testtemp test2";
			main.toggleClass("test3", 0 as unknown as boolean);
			expect(rmain.className).toBe("testtemp test2 test3");
		});
	});
});
