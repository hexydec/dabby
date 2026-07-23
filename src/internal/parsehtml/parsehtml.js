import toTrustedHTML from "../trustedhtml/trustedhtml.js";

/**
 * Generates a DOM tree from the input HTML
 * @function parseHtml
 * @param {string|TrustedHTML} html A string containing valid HTML
 * @param {(Node|boolean)=} context A node to use as context for generating the DOM, if not specified then the document is used, can also soecify `runscripts` (shorthand)
 * @param {boolean=} runscripts A boolean indicating whether to extract script tags from `html` and run them
 * @returns {Node[]} An array of Node objects representing the input HTML
 */

export default (html, context, runscripts = false) => {

	// sort out args
	if (typeof context === "boolean") {
		runscripts = context;
		context = null;
	}

	// parse HTML using DOMParser (safer than innerHTML, Trusted Types compatible)
	const parser = new DOMParser();
	const parsed = parser.parseFromString(
		"<!doctype html><html><body>" + toTrustedHTML(html) + "</body></html>",
		"text/html"
	);

	// run scripts
	if (runscripts && String(html).includes("<script")) {
		const doc = (context instanceof Document)
			? context
			: (context instanceof Node)
				? context.ownerDocument || document
				: document;

		parsed.querySelectorAll("script").forEach(item => {
			const src = item.getAttribute("src"),
				script = doc.createElement("script");
			if (src) {
				script.src = src;
			} else {
				script.textContent = item.innerText;
			}
			doc.head.appendChild(script);
		});
	}

	// extract nodes
	return [...parsed.body.children];
};
