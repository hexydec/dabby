import { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../modular.js";

type Position = { top: number; left: number };

function position(this: Dabby): Position | undefined {
	if (this[0]) {
		const element = this[0] as HTMLElement;
		return { left: element.offsetLeft, top: element.offsetTop };
	}
	return undefined;
}

Object.defineProperty(Dabby.prototype, "position", { value: position, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module 'dabbyjs' {
  interface ModularDabbyMethods {
    position: typeof position;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __position = typeof position;

