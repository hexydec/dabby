// Global augmentation file that will be picked up by TypeScript
// This allows method files to augment without circular dependencies

import type { Dabby } from './core/dabby/dabby.js';

// Declare global augmentation target
declare global {
  namespace DabbyModular {
    interface Methods {
      // This will be augmented by each method file
    }
  }
}

export {};
