import $ from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";
import parseHTML from "../../internal/parsehtml/parsehtml.js";
import type { DabbyFactory } from "../../types.js";

($ as DabbyFactory & { parseHTML: typeof parseHTML }).parseHTML = parseHTML;

// Augment ModularDabbyStatics for modular builds
declare module '../../dabby.js' {
  interface ModularDabbyStatics {
    parseHTML(html: string | TrustedHTML, context?: Node | Document | boolean, keepScripts?: boolean): Element[];
  }
}

// Export type witness to force TypeScript to include this file's augmentation
export type __parseHTML = typeof parseHTML;
