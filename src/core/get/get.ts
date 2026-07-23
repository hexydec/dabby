/**
 * Backward-compatibility shim for `$.fn.get`.
 *
 * The `get` method is defined directly on the {@link Dabby} class and is
 * always available. Importing this file is therefore optional; it exists
 * only so that legacy code referencing `dabbyjs/core/get/get` continues to
 * resolve.
 *
 * @see [Dabby class](../dabby/readme.md) for the canonical `get` definition.
 */
import type {} from "../../dabby.js";

// Export type witness to force TypeScript to include this file's augmentation
export type __coreGet = true;
