import { describe, it, expect, beforeAll, afterAll } from "vitest";
import $ from "../../build.js";

describe("Attributes", () => {
	let test: HTMLElement;

	beforeAll(() => {
		test = document.createElement("div");
		test.className = "test";
		document.body.appendChild(test);
		test.innerHTML = '<div class="testtemp"></div>';
	});

	afterAll(() => {
		test.remove();
	});

	describe("$.fn.css", () => {
		it("can retrieve CSS property", () => {
			const rmain = test.querySelector(".testtemp") as HTMLElement;
			rmain.style.color = "red";
			const main = $(".testtemp");
			expect(main.css("color")).toBe("red");
		});

		it("can retrieve multiple CSS properties", () => {
			const rmain = test.querySelector(".testtemp") as HTMLElement;
			rmain.style.color = "red";
			rmain.style.display = "block";
			const main = $(".testtemp");
			const props = ["color", "display"];
			expect(main.css(props)).toEqual({
				"color": "red",
				"display": "block"
			});
		});

		it("can retrieve multiple CSS properties with camelCase", () => {
			const rmain = test.querySelector(".testtemp") as HTMLElement;
			rmain.style.fontSize = "16px";
			rmain.style.fontWeight = "bold";
			const main = $(".testtemp");
			const props = ["fontSize", "fontWeight"];
			expect(main.css(props)).toEqual({
				"fontSize": "16px",
				"fontWeight": "bold"
			});
		});

		it("returns Dabby object after set", () => {
			const rmain = test.querySelector(".testtemp") as HTMLElement;
			rmain.style.cssText = "";
			const main = $(".testtemp");
			expect(main.css("border", "solid red")).toBe(main);
		});

		it("can set CSS property", () => {
			const rmain = test.querySelector(".testtemp") as HTMLElement;
			rmain.style.cssText = "";
			const main = $(".testtemp");
			main.css("border", "solid red");
			expect(rmain.style.borderLeftColor).toBe("red");
		});

		it("can set CSS property through an object", () => {
			const rmain = test.querySelector(".testtemp") as HTMLElement;
			rmain.style.cssText = "";
			const main = $(".testtemp");
			main.css({ border: "solid red", padding: 10 });
			expect(rmain.style.borderLeftColor).toBe("red");
			expect(rmain.style.padding).toBe("10px");
		});
	});
});
