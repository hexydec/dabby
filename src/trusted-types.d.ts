// Trusted Types API declarations
// These are not yet in TypeScript's built-in lib.dom.d.ts

interface TrustedHTML {
	toString(): string;
}

interface TrustedScript {
	toString(): string;
}

interface TrustedScriptURL {
	toString(): string;
}

interface TrustedTypePolicyOptions {
	createHTML?: (input: string, ...args: unknown[]) => string;
	createScript?: (input: string, ...args: unknown[]) => string;
	createScriptURL?: (input: string, ...args: unknown[]) => string;
}

interface TrustedTypePolicy {
	readonly name: string;
	createHTML(input: string, ...args: unknown[]): TrustedHTML;
	createScript(input: string, ...args: unknown[]): TrustedScript;
	createScriptURL(input: string, ...args: unknown[]): TrustedScriptURL;
}

interface TrustedTypePolicyFactory {
	createPolicy(policyName: string, policyOptions?: TrustedTypePolicyOptions): TrustedTypePolicy;
	isHTML(value: unknown): value is TrustedHTML;
	isScript(value: unknown): value is TrustedScript;
	isScriptURL(value: unknown): value is TrustedScriptURL;
	readonly defaultPolicy: TrustedTypePolicy | null;
}

declare var trustedTypes: TrustedTypePolicyFactory;
declare var TrustedHTML: {
	prototype: TrustedHTML;
	new(): TrustedHTML;
};
