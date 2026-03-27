import { describe, it, expect } from "vitest";
import events from "./getevents.js";

describe("Internal", () => {
	describe("getevents", () => {
		it("is an array", () => {
			expect(Array.isArray(events)).toBe(true);
		});

		it("contains 24 event names", () => {
			expect(events.length).toBe(24);
		});

		it("contains common event names", () => {
			expect(events).toContain("click");
			expect(events).toContain("focus");
			expect(events).toContain("blur");
			expect(events).toContain("submit");
			expect(events).toContain("keydown");
			expect(events).toContain("mouseenter");
			expect(events).toContain("contextmenu");
			expect(events).toContain("scroll");
			expect(events).toContain("resize");
		});

		it("contains keyboard events", () => {
			expect(events).toContain("keydown");
			expect(events).toContain("keyup");
			expect(events).toContain("keypress");
		});

		it("contains mouse events", () => {
			expect(events).toContain("click");
			expect(events).toContain("dblclick");
			expect(events).toContain("mouseenter");
			expect(events).toContain("mouseleave");
			expect(events).toContain("mouseover");
			expect(events).toContain("mouseout");
			expect(events).toContain("mousedown");
			expect(events).toContain("mouseup");
			expect(events).toContain("mousemove");
		});
	});
});
