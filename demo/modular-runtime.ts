// Runtime version of modular-autocomplete.ts — wires up the real demo page
import $ from "../src/dabby.js";
import "../src/manipulation/html/html.js";
import "../src/manipulation/text/text.js";
import "../src/events/on/on.js";
import "../src/events/named/named.js";
import "../src/attributes/class/class.js";
import "../src/traversal/find/find.js";

const $log = $("#log");
const log = (msg: string) => {
	const existing = $log.text();
	$log.text(existing + msg + "\n");
};

log("Demo started");

$("#app")
	.find(".box")
	.on("click", function (this: Element) {
		log(`Clicked: ${this.querySelector("strong")?.textContent}`);
		$(this).addClass("clicked");
	});

$("#app")
	.find(".child")
	.on("click", function (this: Element, event: Event) {
		event.stopPropagation();
		log(`Clicked child: ${this.textContent}`);
	});

log("Click handlers attached");
