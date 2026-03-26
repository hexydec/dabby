import toTrustedHTML from "../trustedhtml/trustedhtml.js";

export default function parseHTML(
	html: string | TrustedHTML,
	context?: Node | Document | boolean,
	runscripts: boolean = false
): Element[] {
	if (typeof context === "boolean") {
		runscripts = context;
	}

	const parser = new DOMParser();
	const parsed = parser.parseFromString(
		`<!doctype html><html><body>${toTrustedHTML(html)}</body></html>` as string,
		"text/html"
	);

	if (runscripts && String(html).includes("<script")) {
		const doc = (context instanceof Document)
			? context
			: (context instanceof Node)
				? context.ownerDocument || document
				: document;

		parsed.querySelectorAll("script").forEach(item => {
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

	return [...parsed.body.children] as Element[];
}
