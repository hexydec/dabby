// Module augmentation for auto-inferred modular imports
// This file is imported automatically when html.ts is imported
declare module 'dabbyjs' {
  export interface ModularDabbyMethods {
    html(this: import('../../core/dabby/dabby.js').Dabby): string | undefined;
    html(this: import('../../core/dabby/dabby.js').Dabby, content: string | ((this: Element, index: number, currentHTML: string) => string)): import('../../core/dabby/dabby.js').Dabby;
  }
}
