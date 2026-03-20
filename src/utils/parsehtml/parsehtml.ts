import $ from "../../core/dabby/dabby.js";
import type {} from "../../modular.js";
import parseHTML from "../../internal/parsehtml/parsehtml.js";
import type { DabbyFactory } from "../../types.js";

($ as DabbyFactory & { parseHTML: typeof parseHTML }).parseHTML = parseHTML;

// Augment ModularDabbyStatics for modular builds
declare module '../../modular.js' {
  interface ModularDabbyStatics {
    parseHTML(html: string, context?: Node | Document | boolean, keepScripts?: boolean): Node[];
  }
}

// Export type witness to force TypeScript to include this file's augmentation
export type __parseHTML = typeof parseHTML;
