import type { Dabby } from '../../core/dabby/dabby.js';

// Module augmentation - automatically adds html() when html.ts is imported!
declare module 'dabbyjs' {
  interface ModularDabbyMethods {
    html: {
      (): string;
      (content: string | Element | Dabby | ((this: Element, index: number, currentHTML: string) => string)): Dabby;
    };
  }
}
