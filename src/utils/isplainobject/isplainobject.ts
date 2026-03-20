import $ from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";
import isPlainObject from "../../internal/isplainobject/isplainobject.js";
import type { DabbyFactory } from "../../types.js";

($ as DabbyFactory & { isPlainObject: typeof isPlainObject }).isPlainObject = isPlainObject;

// Augment ModularDabbyStatics for modular builds
declare module '../../dabby.js' {
  interface ModularDabbyStatics {
    isPlainObject(obj: unknown): boolean;
  }
}

// Export type witness to force TypeScript to include this file's augmentation
export type __isPlainObject = typeof isPlainObject;
