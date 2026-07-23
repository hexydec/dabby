import $ from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";
import parseHTML from "../../internal/parsehtml/parsehtml.js";
import type { DabbyFactory } from "../../types.js";

/**
 * Parse a string of HTML into an array of `Element` nodes.
 *
 * Uses the browser's native `DOMParser` so the result is a fully-realised DOM
 * tree, not an inert document fragment. Comments and whitespace-only text
 * nodes between top-level elements are discarded; only element children of
 * `<body>` are returned.
 *
 * Pass `keepScripts` (or pass `true` as the second argument) to execute
 * `<script>` tags by appending them to the supplied document — without this,
 * scripts in the parsed markup will not run.
 *
 * Accepts a `TrustedHTML` value for environments enforcing the Trusted Types
 * Content-Security-Policy.
 *
 * @example
 * const nodes = $.parseHTML("<p>One</p><p>Two</p>"); // Element[]
 * $("#root").append(...nodes);
 */
($ as DabbyFactory & { parseHTML: typeof parseHTML }).parseHTML = parseHTML;

// Augment ModularDabbyStatics for modular builds
declare module '../../dabby.js' {
  interface ModularDabbyStatics {
    parseHTML(html: string | TrustedHTML, context?: Node | Document | boolean, keepScripts?: boolean): Element[];
  }
}

// Export type witness to force TypeScript to include this file's augmentation
export type __parseHTML = typeof parseHTML;
