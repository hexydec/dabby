import { describe, it, expect, beforeAll, afterAll } from "vitest";
import $ from "../../build.js";

describe("Events", () => {
	let test: HTMLElement;

	beforeAll(() => {
		test = document.createElement("div");
		test.className = "test";
		document.body.appendChild(test);
	});

	afterAll(() => {
		test.remove();
	});

	describe("$.fn.trigger", () => {
		it("returns self on trigger", () => {
			test.innerHTML = '<div class="testtemp"><div>1</div><div>2</div><div>3</div></div>';
			const dabbyDivs = $(".testtemp div");
			expect(dabbyDivs.trigger("click")).toBe(dabbyDivs);
		});

		it("can trigger events on all elements", () => {
			test.innerHTML = '<div class="testtemp"><div>1</div><div>2</div><div>3</div></div>';
			let count = 0;
			const divs = test.querySelectorAll(".testtemp div");
			divs.forEach(div => {
				(div as HTMLElement).onclick = (e) => {
					count++;
					e.stopPropagation();
				};
			});
			$(".testtemp div").trigger("click");
			expect(count).toBe(3);
		});

		it("can trigger custom events", () => {
			test.innerHTML = '<div class="testtemp"></div>';
			let triggered = false;
			$(".testtemp").on("custom.event", () => { triggered = true; });
			$(".testtemp").trigger("custom.event");
			expect(triggered).toBe(true);
		});
	});
});
