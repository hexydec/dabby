/**
 * Backward-compatibility shim for `$.fn.map`.
 *
 * The instance-level `map` is defined directly on the {@link Dabby} class.
 * Importing this file additionally pulls in {@link "../../traversal/add/add.js"}
 * because the class method uses `add` internally to merge per-element results.
 *
 * @see [Dabby class](../dabby/readme.md) for the canonical `map` definition.
 */
import type {} from "../../dabby.js";
import "../../traversal/add/add.js";

// Export type witness to force TypeScript to include this file's augmentation
export type __coreMap = true;
