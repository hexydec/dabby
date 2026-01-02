/// <reference path="./manipulation/html/html.ts" />
/// <reference path="./manipulation/text/text.ts" />
/// <reference path="./manipulation/insert/insert.ts" />
/// <reference path="./events/on/on.ts" />
/// <reference path="./attributes/class/class.ts" />

/**
 * Modular Dabby Export Helper
 *
 * This file provides a properly-typed factory function for creating
 * modular Dabby builds with only the methods you import.
 *
 * Usage:
 * import { createDabby } from 'dabbyjs/modular'
 * import 'dabbyjs/src/manipulation/html/html'
 * import 'dabbyjs/src/events/on/on'
 *
 * const $ = createDabby<'html' | 'on'>()
 * $('#app').html('Hello') // ✓ TypeScript knows this exists
 * $('#app').css('color', 'red') // ✗ TypeScript error - not imported
 */

import type { Dabby } from './core/dabby/dabby.js'
import type { Selector } from './types.js'
import $base from './core/dabby/dabby.js'

// This interface is populated by method files via module augmentation
// When you import a method file (e.g., 'dabbyjs/src/manipulation/html/html'),
// that file augments this interface with its method signature
export interface ModularDabbyMethods {
  // Methods added dynamically via module augmentation
  // Example: After importing 'dabbyjs/src/manipulation/html/html', this will have html()
}

// This interface is populated by static utility method files via module augmentation
// These are methods added to the $ factory itself (e.g., $.ajax(), $.map())
export interface ModularDabbyStatics {
  // Static methods added dynamically via module augmentation
  // Example: After importing 'dabbyjs/src/ajax/ajax/ajax', this will have ajax()
}

// Define all possible Dabby methods with their signatures
export interface DabbyMethodSignatures {
  // Manipulation
  html: {
    (): string
    (content: string | Element | Dabby | ((this: Element, index: number, currentHTML: string) => string)): Dabby
  }
  text: {
    (): string
    (content: string | number | boolean | ((this: Element, index: number, currentText: string) => string | number | boolean)): Dabby
  }
  append: {
    (content: string | Element | Element[] | Dabby | ((this: Element, index: number) => string | Element | Dabby)): Dabby
  }
  prepend: {
    (content: string | Element | Element[] | Dabby | ((this: Element, index: number) => string | Element | Dabby)): Dabby
  }
  empty: {
    (): Dabby
  }
  remove: {
    (selector?: string): Dabby
  }

  // Events
  on: {
    (events: string | Record<string, (this: Element, event: Event, ...args: unknown[]) => void | false>, selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): Dabby
  }
  off: {
    (events?: string | Record<string, (this: Element, event: Event, ...args: unknown[]) => void | false>, selector?: string | ((this: Element, event: Event, ...args: unknown[]) => void | false), callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): Dabby
  }
  one: {
    (events: string | Record<string, (this: Element, event: Event, ...args: unknown[]) => void | false>, selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): Dabby
  }
  trigger: {
    (name: string, data?: unknown): Dabby
  }

  // Attributes & Classes
  addClass: {
    (cls: string | string[] | ((this: Element, index: number, currentClass: string) => string | string[])): Dabby
  }
  removeClass: {
    (cls: string | string[] | ((this: Element, index: number, currentClass: string) => string | string[])): Dabby
  }
  toggleClass: {
    (cls: string | string[] | ((this: Element, index: number, currentClass: string) => string | string[]), state?: boolean): Dabby
  }
  hasClass: {
    (cls: string): boolean
  }
  css: {
    (prop: string): string
    (props: string[]): Record<string, string>
    (prop: string, value: string | number | ((this: Element, index: number, currentValue: string) => string | number)): Dabby
    (props: Record<string, string | number>): Dabby
  }
  attr: {
    (name: string): string | undefined
    (name: string, value: string | number | boolean | null | ((this: Element, index: number, currentValue: string | undefined) => string | number | boolean | null)): Dabby
    (props: Record<string, unknown>): Dabby
  }
  data: {
    (): Record<string, unknown>
    (name: string): unknown
    (name: string, value: string | number | boolean | object | null): Dabby
    (props: Record<string, string | number | boolean | object | null>): Dabby
  }

  // Visibility
  hide: {
    (): Dabby
  }
  show: {
    (): Dabby
  }
  toggle: {
    (show?: boolean): Dabby
  }

  // Traversal
  filter: {
    (selector: string | ((this: Element, index: number) => boolean)): Dabby
  }
  first: {
    (): Dabby
  }
  last: {
    (): Dabby
  }
  find: {
    (selector: string): Dabby
  }
  children: {
    (selector?: string): Dabby
  }
  parent: {
    (selector?: string): Dabby
  }
  parents: {
    (selector?: string): Dabby
  }
  closest: {
    (selector: string): Dabby
  }
  next: {
    (selector?: string): Dabby
  }
  prev: {
    (selector?: string): Dabby
  }
  siblings: {
    (selector?: string): Dabby
  }
  eq: {
    (index: number): Dabby
  }

  // Utilities
  each: {
    (callback: (this: Element, index: number, element: Element) => void | false): Dabby
  }
}

// Create a Dabby interface with only the specified methods
export type DabbyWithMethods<Methods extends keyof DabbyMethodSignatures> = Dabby & {
  [K in Methods]: DabbyMethodSignatures[K]
}

// Factory function type
export type DabbyModularFactory<Methods extends keyof DabbyMethodSignatures> = {
  (selector?: Selector): DabbyWithMethods<Methods>
  readonly prototype: DabbyWithMethods<Methods>
  readonly fn: DabbyWithMethods<Methods>
}

/**
 * Create a properly-typed Dabby factory with only the methods you've imported
 *
 * Since TypeScript can't automatically detect which methods you've imported via side-effects,
 * this is just a type-safe wrapper around the base Dabby instance.
 *
 * @example
 * import { $ } from 'dabbyjs/modular'
 * import 'dabbyjs/src/manipulation/html/html'
 * import 'dabbyjs/src/events/on/on'
 *
 * // TypeScript won't stop you from using unimported methods (limitation of side-effect imports)
 * // But at least you get full type safety for the methods that DO exist
 * $('#app').html('Hello').on('click', () => {})
 */
export function createDabby<Methods extends keyof DabbyMethodSignatures = never>(): DabbyModularFactory<Methods> {
  return $base as unknown as DabbyModularFactory<Methods>
}

// Create a Dabby type with auto-inferred methods from imports
// ModularDabbyMethods properties override optional Dabby properties
export type DabbyAuto = Omit<Dabby, keyof ModularDabbyMethods> & ModularDabbyMethods

// Factory type that returns auto-inferred Dabby
export type DabbyAutoFactory = {
  (selector?: Selector): DabbyAuto
  readonly prototype: DabbyAuto
  readonly fn: DabbyAuto
} & ModularDabbyStatics

/**
 * Dabby with AUTO-INFERRED methods! 🎉
 *
 * This is the recommended way to use Dabby - methods are automatically added
 * to TypeScript's understanding as you import them via module augmentation!
 *
 * When you import a method file (e.g., 'dabbyjs/src/manipulation/html/html'),
 * that file augments the ModularDabbyMethods interface, and TypeScript
 * automatically knows html() is available!
 *
 * @example
 * import $ from 'dabbyjs'  // Default export
 * // or
 * import { $ } from 'dabbyjs'  // Named export
 *
 * import 'dabbyjs/src/manipulation/html/html'  // Automatically adds html() to $
 * import 'dabbyjs/src/events/on/on'            // Automatically adds on() to $
 *
 * // TypeScript knows these methods exist - no manual listing needed!
 * $('#app').html('Hello')   // ✓ TypeScript knows html() exists!
 * $('#app').on('click', fn) // ✓ TypeScript knows on() exists!
 * $('#app').css('color')    // ✗ TypeScript error - css not imported!
 */
export const $ = $base as unknown as DabbyAutoFactory

// Default export - auto-inferred modular Dabby (recommended!)
export default $ as DabbyAutoFactory
