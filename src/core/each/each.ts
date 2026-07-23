/**
 * Backward-compatibility shim for `$.fn.each`.
 *
 * The instance-level `each` is defined directly on the {@link Dabby} class
 * and is therefore always available. Importing this file additionally pulls
 * in the static `$.each` augmentation from {@link "../../utils/each/each.js"}.
 *
 * @see [Dabby class](../dabby/readme.md) for the canonical `each` definition.
 */
import type {} from "../../dabby.js";
import "../../utils/each/each.js";

// Export type witness to force TypeScript to include this file's augmentation
export type __coreEach = true;
