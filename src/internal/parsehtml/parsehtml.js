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
				script.text = item.innerText;
			}
			context.head.appendChild(script);
		});
	}

	// extract nodes
	return Array.from(obj.children);
};
