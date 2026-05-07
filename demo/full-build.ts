/**
 * DEMO: Full build — every method available, no per-method imports needed
 *
 * Open this file in your IDE and check:
 *   1. Type `$('#x').` — autocomplete should show EVERY method
 *   2. Hover any method — should show the right signature
 *   3. Static methods on $ (like $.ajax, $.each, $.extend) should also autocomplete
 */

import $ from "../src/build.js";

const $el = $("#app");

// Manipulation
$el.html("<p>hello</p>");
$el.text("text");
$el.append("<span>x</span>");
$el.empty();
$el.remove();
$el.clone(true, true);

// Attributes
$el.css("color", "red");
$el.attr("id", "x");
$el.data("foo", { bar: 1 });
$el.addClass("active");
$el.hasClass("active");
$el.val("hello");

// Events
$el.on("click", () => {});
$el.click(() => {});
$el.trigger("custom", { detail: 1 });

// Traversal
const $children = $el.find(".child").filter(".active").not(".disabled");
$children.first().last().eq(0);
$el.parent().parents(".container").closest("body");
$el.next().nextAll().siblings();

// Dimensions
const w: number | undefined = $el.width();
const h: number | undefined = $el.height();
$el.scrollTop(100);
$el.offset();

// Static methods — should autocomplete on $ itself
$.ajax({ url: "/api" });
$.each([1, 2, 3], (i, v) => console.log(i, v));
$.extend({}, { a: 1 }, { b: 2 });
$.param({ q: "search" });
$.parseHTML("<p>x</p>");

console.log(w, h, $children);

export {};
