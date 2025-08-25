/**
 * Generates a DOM tree from the input HTML
 * @function parseHtml
 * @param {string} html A string containing valid HTML
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

	// prepare context
	if (!context) {
		context = document.implementation.createHTMLDocument("");
	}

	// create a vessel to parse HTML into
	const obj = context.createElement("div");
	obj.innerHTML = html;

	// run scripts
	if (runscripts && html.includes("<script")) {
		obj.querySelectorAll("script").forEach(item => {
			const src = item.getAttribute("src"),
				script = context.createElement("script");
			if (src) {
				script.src = src;
			} else {
				script.textContent = item.innerText;
			}
			context.head.appendChild(script);
		});
	}

	// extract nodes
	return [...obj.children];
};
