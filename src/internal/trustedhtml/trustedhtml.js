let policy = null;

if (typeof trustedTypes !== "undefined") {
	try {
		policy = trustedTypes.createPolicy("dabby", {
			createHTML: (s) => s,
		});
	} catch {
		// Policy name "dabby" not allowed by CSP — site-level "default" policy handles it
	}
}

/**
 * Wrap a string for safe assignment to innerHTML.
 * Passes through TrustedHTML unchanged, wraps strings via the dabby policy if available.
 *
 * @param {string|TrustedHTML} html The HTML string or TrustedHTML to wrap
 * @returns {string|TrustedHTML} A TrustedHTML object if policy is available, otherwise the raw string
 */
export default function toTrustedHTML(html) {
	if (typeof TrustedHTML !== "undefined" && html instanceof TrustedHTML) {
		return html;
	}
	if (policy) {
		return policy.createHTML(html);
	}
	return html;
}
