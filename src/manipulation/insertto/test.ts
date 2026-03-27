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

	describe("$.fn.prependTo", () => {
		it("returns itself when inserted", () => {
			test.innerHTML = '<div class="testtemp"></div>';
			const main = $("<div>Test</div>");
			expect(main.prependTo(".testtemp").get()).toEqual(main.get());
		});

		it("can insert html", () => {
			test.innerHTML = '<div class="testtemp"></div>';
			$("<div>Test</div>").prependTo(".testtemp");
			expect($(".testtemp").html()).toBe("<div>Test</div>");
		});
	});

	describe("$.fn.appendTo", () => {
		it("can append element to target", () => {
			test.innerHTML = '<div class="testtemp"><span>existing</span></div>';
			$("<div>New</div>").appendTo(".testtemp");
			expect($(".testtemp").html()).toBe("<span>existing</span><div>New</div>");
		});
	});

	describe("$.fn.insertBefore", () => {
		it("can insert element before target", () => {
			test.innerHTML = '<div class="testtemp"><span class="target">target</span></div>';
			$("<div>Before</div>").insertBefore(".target");
			expect($(".testtemp").html()).toBe("<div>Before</div><span class=\"target\">target</span>");
		});
	});

	describe("$.fn.insertAfter", () => {
		it("can insert element after target", () => {
			test.innerHTML = '<div class="testtemp"><span class="target">target</span></div>';
			$("<div>After</div>").insertAfter(".target");
			expect($(".testtemp").html()).toBe("<span class=\"target\">target</span><div>After</div>");
		});
	});
});
