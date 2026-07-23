/**
 * DEMO: Auto-inferred type imports — no generics, no manual lists
 * ================================================================
 *
 * This is the recommended way to use Dabby. You import `$` once, then
 * import each method you need as a side-effect. The TypeScript types
 * automatically expand as you import more methods — zero configuration.
 *
 * Try it yourself:
 *   1. Type `$el.` below — autocomplete should show ONLY methods you've
 *      imported, plus the always-present `each`/`get`/`map`.
 *   2. Hover any method to see its full signature.
 *   3. Add a new import line (e.g. `import "../src/attributes/css/css.js"`)
 *      — `css` immediately becomes available with full types.
 *   4. Comment out an import — calls to that method become red.
 */

// 1. Import the factory — that's all you need from the package itself
import $ from "../src/dabby.js";

// 2. Each side-effect import adds that method to $ via module augmentation.
//    No types to import, no generics to maintain, no factory wrapping.
import "../src/manipulation/html/html.js";
import "../src/manipulation/text/text.js";
import "../src/events/on/on.js";
import "../src/events/named/named.js";
import "../src/attributes/class/class.js";
import "../src/traversal/find/find.js";

// ---------------------------------------------------------------------------
// 3. Use it. Autocomplete is fully aware of which methods you imported.
// ---------------------------------------------------------------------------

const $el = $("#app");

// html() — getter returns string | undefined
const html = $el.html();
console.log(html);

// html() — setter, full callback typing
$el.html("<p>hello</p>");
$el.html(function (index, currentHTML) {
	// `this` is Element, `index` is number, `currentHTML` is string
	return `<p>${index}: ${currentHTML.length} chars in ${this.tagName}</p>`;
});

// text() — string | number | boolean accepted
const text: string = $el.text();
console.log(text);
$el.text("hello").text(42).text(true);

// on() — three overloads (events+cb, events+selector+cb, events+selector+data+cb)
$el.on("click", function (event) {
	// `this` is Element, `event` is Event
	console.log(this.tagName, event.type);
});
$el.on("click", ".child", function (event) {
	console.log("delegated", this, event);
});

// Named events (from events/named) — shortcut + zero-arg trigger
$el.click(() => console.log("clicked"));
$el.click(); // triggers a click event

// Class methods — string, string[], or a callback
$el.addClass("active");
$el.addClass(["a", "b"]);
$el.addClass((index, currentClass) => `c-${index}-${currentClass}`);

// Chaining preserves the full augmented type
$el
	.html("<p>chained</p>")
	.text("override")
	.addClass("clicked")
	.on("click", () => {})
	.click()
	.find(".child");

// find() returns a new Dabby with all the imported methods still available
const $children = $el.find(".child");
$children.html("nested").click(() => console.log("child clicked"));

// Core methods (each / get / map) live on the Dabby class itself —
// they're always present even without any side-effect imports
$el.each(function (index, element) {
	console.log(index, element);
});
const allNodes = $el.get();
const firstNode = $el.get(0);
console.log(allNodes, firstNode);

// ---------------------------------------------------------------------------
// 4. Methods you didn't import are TypeScript errors.
//    Uncomment any of these lines and your IDE/tsc will mark it red.
//    (We can't @ts-expect-error these because TypeScript's `declare module`
//    augmentations are project-wide — if ANY file in the same compilation
//    imports `css.js`, every file will see `css` on $. That's how module
//    augmentation works in TS by design. In a real consumer codebase, only
//    the modules they actually import end up in their compilation.)
// ---------------------------------------------------------------------------

// $el.css("color");        // ✗ Property 'css' does not exist
// $el.attr("id");          // ✗ Property 'attr' does not exist
// $el.val();               // ✗ Property 'val' does not exist
// $el.append("<p/>");      // ✗ Property 'append' does not exist
// $el.hide();              // ✗ Property 'hide' does not exist

export {};
