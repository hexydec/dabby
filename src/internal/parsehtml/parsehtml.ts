export default function parseHTML(
	html: string,
	context?: Node | Document | boolean,
	runscripts: boolean = false
): Element[] {
	let doc: Document;

	if (typeof context === "boolean") {
		runscripts = context;
		doc = document.implementation.createHTMLDocument("");
	} else if (context && context instanceof Document) {
		doc = context;
	} else if (context && context instanceof Node) {
		doc = context.ownerDocument || document;
	} else {
		doc = document.implementation.createHTMLDocument("");
	}

	const obj = doc.createElement("div");
	obj.innerHTML = html;

	if (runscripts && html.includes("<script")) {
		obj.querySelectorAll("script").forEach(item => {
			const src = item.getAttribute("src");
			const script = doc.createElement("script");

			if (src) {
				script.src = src;
			} else {
				script.textContent = item.innerText;
			}
			doc.head.appendChild(script);
		});
	}

	return [...obj.children] as Element[];
}
