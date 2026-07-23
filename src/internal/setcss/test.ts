import { describe, it, expect, beforeAll, afterAll } from "vitest";
import $ from "../../build.js";
import setCss from "./setcss.js";

describe("Internal", () => {
	describe("setCss", () => {
		let test, rmain;

		beforeAll(() => {
			test = document.createElement("div");
			test.className = "test";
			document.body.appendChild(test);
			rmain = test;
		});

		afterAll(() => {
			test.remove();
		});

		it("returns Dabby object when CSS is set", () => {
			const main = $(".test");
			rmain.style.cssText = "";
			expect(setCss(main, "border-left-color", "red").get()).toEqual(main.get());
		});

		it("can set CSS property", () => {
			const main = $(".test");
			rmain.style.cssText = "";
			setCss(main, "border-left-color", "red");
			expect(rmain.style.borderLeftColor).toBe("red");
		});

		it("can set camelCase CSS property", () => {
			const main = $(".test");
			rmain.style.cssText = "";
			setCss(main, "borderLeftColor", "red");
			expect(rmain.style.borderLeftColor).toBe("red");
		});

		it("can set CSS property through a callback function", () => {
			const main = $(".test");
			setCss(main, "borderLeftColor", "red");
			setCss(main, "borderLeftColor", function (index, current) {
				expect(current).toBe("red");
				return "green";
			});
			expect(rmain.style.borderLeftColor).toBe("green");
		});

		it("can set CSS variable", () => {
			const main = $(".test");
			setCss(main, { "--css-variable": "test" });
			expect(rmain.style.getPropertyValue("--css-variable")).toBe("test");
		});
	});
});
