let policy: TrustedTypePolicy | null = null;

if (typeof trustedTypes !== "undefined") {
	try {
		policy = trustedTypes.createPolicy("dabby", {
			createHTML: (s: string) => s,
		});
	} catch {
		// Policy name "dabby" not allowed by CSP — site-level "default" policy handles it
	}
}

/**
 * Wrap a string for safe assignment to innerHTML.
 * Passes through TrustedHTML unchanged, wraps strings via the dabby policy if available.
 */
export default function toTrustedHTML(html: string | TrustedHTML): string | TrustedHTML {
	if (typeof TrustedHTML !== "undefined" && html instanceof TrustedHTML) {
		return html;
	}
	if (policy) {
		return policy.createHTML(html as string);
	}
	return html;
}
