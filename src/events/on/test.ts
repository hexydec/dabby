import { describe, it, expect, beforeAll, afterAll } from "vitest";
import $ from "../../build.js";

describe("Events", () => {
	let test: HTMLElement;

	beforeAll(() => {
		test = document.createElement("div");
		test.className = "test";
		document.body.appendChild(test);
		test.innerHTML = '<div class="testtemp"><p>Inner</p></div>';
	});

	afterAll(() => {
		test.remove();
	});

	describe("$.fn.on / $.fn.off", () => {
		it("returns self on set event", () => {
			const obj = $(".testtemp");
			const func = () => {};
			expect(obj.on("test.trigger", func)).toBe(obj);
		});

		it("can set and trigger event", () => {
			const obj = $(".testtemp");
			let triggered = -1;
			const func = () => { triggered++; };
			obj.on("test.trigger", func);
			for (let i = 0; i < 3; i++) {
				obj.trigger("test.trigger");
				expect(triggered).toBe(i);
			}
			obj.off("test.trigger", func);
		});

		it("events are set on the correct object", () => {
			const obj = $(".testtemp");
			let triggered = 0;
			const func = () => { triggered++; };
			obj.on("test.trigger2", func);
			obj.trigger("test.trigger2");
			expect(triggered).toBe(1);
			$(test).trigger("test.trigger2");
			expect(triggered).toBe(1); // should not increment
			obj.off("test.trigger2", func);
		});

		it("returns self on remove event", () => {
			const obj = $(".testtemp");
			const func = () => {};
			obj.on("test.trigger3", func);
			expect(obj.off("test.trigger3", func)).toBe(obj);
		});

		it("removes event handler", () => {
			const obj = $(".testtemp");
			let triggered = 0;
			const func = () => { triggered++; };
			obj.on("test.trigger4", func);
			obj.trigger("test.trigger4");
			expect(triggered).toBe(1);
			obj.off("test.trigger4", func);
			obj.trigger("test.trigger4");
			expect(triggered).toBe(1);
		});

		it("can set delegated events", () => {
			const body = $("body");
			const obj = $(".testtemp");
			let triggered = 0;
			const func = () => { triggered++; };
			body.on("test.delegated", ".testtemp", func);
			obj.trigger("test.delegated");
			expect(triggered).toBe(1);
			body.off("test.delegated", ".testtemp", func);
		});

		it("delegated events trigger on child click", () => {
			const body = $("body");
			const obj = $(".testtemp");
			let triggered = 0;
			const func = () => { triggered++; };
			body.on("test.delegated2", ".testtemp", func);
			$("p", obj).trigger("test.delegated2");
			expect(triggered).toBe(1);
			body.off("test.delegated2", ".testtemp", func);
		});

		it("can add multiple events as space-separated string", () => {
			const obj = $(".testtemp");
			let triggered = 0;
			const func = () => { triggered++; };
			obj.on("test.multi1 test.multi2 test.multi3", func);
			obj.trigger("test.multi1");
			obj.trigger("test.multi2");
			obj.trigger("test.multi3");
			expect(triggered).toBe(3);
			obj.off("test.multi1 test.multi2 test.multi3", func);
		});

		it("can add multiple events as an object", () => {
			const obj = $(".testtemp");
			let triggered = 0;
			const func = () => { triggered++; };
			obj.on({ "test.obj1 test.obj2": func, "test.obj3": func });
			obj.trigger("test.obj1");
			obj.trigger("test.obj2");
			obj.trigger("test.obj3");
			expect(triggered).toBe(3);
			obj.off({ "test.obj1 test.obj2": func, "test.obj3": func });
		});

		it("can remove all events at once", () => {
			const obj = $(".testtemp");
			let triggered = 0;
			const func = () => { triggered++; };
			obj.on("test.all1 test.all2 test.all3", func);
			obj.off();
			obj.trigger("test.all1");
			obj.trigger("test.all2");
			obj.trigger("test.all3");
			expect(triggered).toBe(0);
		});

		it("can remove events by name without handler", () => {
			const obj = $(".testtemp");
			let triggered = 0;
			const func = () => { triggered++; };
			obj.on("test.nohandler", func);
			obj.off("test.nohandler");
			obj.trigger("test.nohandler");
			expect(triggered).toBe(0);
		});
	});
});
