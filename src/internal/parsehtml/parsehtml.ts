type Context = boolean | null | Document

export default (html: string, context: Context, runscripts: boolean = false) => {

	// sort out args
	if (typeof context === "boolean") {
		runscripts = context;
		context = null as null;
	}

	// prepare context
	if (!context) {
		context = document.implementation.createHTMLDocument("");
	}

	// create a vessel to parse HTML into
	const obj = (context as Document).createElement("div");
	obj.innerHTML = html;

    

	// run scripts
	if (runscripts && html.includes("<script")) {
		obj.querySelectorAll("script").forEach(item => {
			const src = item.getAttribute("src"),
				script = (context as Document).createElement("script");
			if (src) {
				script.src = src;
			} else {
				script.text = item.innerText;
			}
			(context as Document).head.appendChild(script);
		});
	}

	// extract nodes
	return [...obj.children];
};
