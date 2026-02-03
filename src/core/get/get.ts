import type {} from "../../modular.js";

// This file exists for backward compatibility but the get method
// is already defined in the Dabby class. This export ensures
// type augmentation is included when importing this module.

// Export type witnesses to force TypeScript to include this file's augmentation
export type __coreGet = true;
