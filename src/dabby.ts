/// <reference path="trusted-types.d.ts" />
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
import type { Selector, ReadyCallback } from './types.js'
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
// Self parameter enables proper return types for method chaining
export interface DabbyMethodSignatures<Self = Dabby> {
  // Manipulation
  html: {
    (): string | undefined
    (content: string | TrustedHTML | Element | Dabby | ((this: Element, index: number, currentHTML: string) => string)): Self
  }
  text: {
    (): string
    (content: string | number | boolean | ((this: Element, index: number, currentText: string) => string | number | boolean)): Self
  }
  append: {
    (content: string | TrustedHTML | Element | Element[] | Dabby | ((this: Element, index: number) => string | Element | Dabby)): Self
  }
  prepend: {
    (content: string | TrustedHTML | Element | Element[] | Dabby | ((this: Element, index: number) => string | Element | Dabby)): Self
  }
  before: {
    (content: string | TrustedHTML | Element | Element[] | Dabby | ((this: Element, index: number) => string | Element | Dabby)): Self
  }
  after: {
    (content: string | TrustedHTML | Element | Element[] | Dabby | ((this: Element, index: number) => string | Element | Dabby)): Self
  }
  appendTo: {
    (selector: Selector): Self
  }
  prependTo: {
    (selector: Selector): Self
  }
  insertBefore: {
    (selector: Selector): Self
  }
  insertAfter: {
    (selector: Selector): Self
  }
  empty: {
    (): Self
  }
  remove: {
    (selector?: string): Self
  }
  detach: {
    (selector?: string): Self
  }
  clone: {
    (withDataAndEvents?: boolean, deepWithDataAndEvents?: boolean | null): Self
  }
  wrap: {
    (html: Selector | ((this: Element, index: number) => Selector)): Self
  }
  wrapAll: {
    (html: Selector | ((this: Element) => Selector)): Self
  }
  unwrap: {
    (selector?: Selector): Self
  }
  replaceWith: {
    (html: Selector | ((this: Element, index: number, html: string) => Selector)): Self
  }
  replaceAll: {
    (html: Selector): Self
  }

  // Events
  on: {
    (events: Record<string, (this: Element, event: Event, ...args: unknown[]) => void | false>): Self
    (events: string, callback: (this: Element, event: Event, ...args: unknown[]) => void | false): Self
    (events: string, selector: string, callback: (this: Element, event: Event, ...args: unknown[]) => void | false): Self
    (events: string, selector: string, data: unknown, callback: (this: Element, event: Event, ...args: unknown[]) => void | false): Self
  }
  off: {
    (): Self
    (events: Record<string, (this: Element, event: Event, ...args: unknown[]) => void | false>): Self
    (events: string, callback: (this: Element, event: Event, ...args: unknown[]) => void | false): Self
    (events: string, selector: string, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): Self
  }
  one: {
    (events: Record<string, (this: Element, event: Event, ...args: unknown[]) => void | false>): Self
    (events: string, callback: (this: Element, event: Event, ...args: unknown[]) => void | false): Self
    (events: string, selector: string, callback: (this: Element, event: Event, ...args: unknown[]) => void | false): Self
    (events: string, selector: string, data: unknown, callback: (this: Element, event: Event, ...args: unknown[]) => void | false): Self
  }
  trigger: {
    (name: string, data?: unknown): Self
  }
  triggerHandler: {
    (name: string, data?: unknown): unknown
  }

  // Named events
  click: { (callback: (this: Element, event: Event, ...args: unknown[]) => void | false): Self; (): Self }
  dblclick: { (callback: (this: Element, event: Event, ...args: unknown[]) => void | false): Self; (): Self }
  mousedown: { (callback: (this: Element, event: Event, ...args: unknown[]) => void | false): Self; (): Self }
  mouseup: { (callback: (this: Element, event: Event, ...args: unknown[]) => void | false): Self; (): Self }
  mousemove: { (callback: (this: Element, event: Event, ...args: unknown[]) => void | false): Self; (): Self }
  mouseover: { (callback: (this: Element, event: Event, ...args: unknown[]) => void | false): Self; (): Self }
  mouseout: { (callback: (this: Element, event: Event, ...args: unknown[]) => void | false): Self; (): Self }
  mouseenter: { (callback: (this: Element, event: Event, ...args: unknown[]) => void | false): Self; (): Self }
  mouseleave: { (callback: (this: Element, event: Event, ...args: unknown[]) => void | false): Self; (): Self }
  keydown: { (callback: (this: Element, event: Event, ...args: unknown[]) => void | false): Self; (): Self }
  keypress: { (callback: (this: Element, event: Event, ...args: unknown[]) => void | false): Self; (): Self }
  keyup: { (callback: (this: Element, event: Event, ...args: unknown[]) => void | false): Self; (): Self }
  focus: { (callback: (this: Element, event: Event, ...args: unknown[]) => void | false): Self; (): Self }
  blur: { (callback: (this: Element, event: Event, ...args: unknown[]) => void | false): Self; (): Self }
  focusin: { (callback: (this: Element, event: Event, ...args: unknown[]) => void | false): Self; (): Self }
  focusout: { (callback: (this: Element, event: Event, ...args: unknown[]) => void | false): Self; (): Self }
  change: { (callback: (this: Element, event: Event, ...args: unknown[]) => void | false): Self; (): Self }
  select: { (callback: (this: Element, event: Event, ...args: unknown[]) => void | false): Self; (): Self }
  submit: { (callback: (this: Element, event: Event, ...args: unknown[]) => void | false): Self; (): Self }
  scroll: { (callback: (this: Element, event: Event, ...args: unknown[]) => void | false): Self; (): Self }
  resize: { (callback: (this: Element, event: Event, ...args: unknown[]) => void | false): Self; (): Self }
  contextmenu: { (callback: (this: Element, event: Event, ...args: unknown[]) => void | false): Self; (): Self }
  error: { (callback: (this: Element, event: Event, ...args: unknown[]) => void | false): Self; (): Self }
  unload: { (callback: (this: Element, event: Event, ...args: unknown[]) => void | false): Self; (): Self }

  // Attributes & Classes
  addClass: {
    (cls: string | string[] | ((this: Element, index: number, currentClass: string) => string | string[])): Self
  }
  removeClass: {
    (cls: string | string[] | ((this: Element, index: number, currentClass: string) => string | string[])): Self
  }
  toggleClass: {
    (cls: string | string[] | ((this: Element, index: number, currentClass: string) => string | string[]), state?: boolean): Self
  }
  hasClass: {
    (cls: string): boolean
  }
  css: {
    (prop: string): string
    (props: string[]): Record<string, string>
    (prop: string, value: string | number | ((this: Element, index: number, currentValue: string) => string | number)): Self
    (props: Record<string, string | number>): Self
  }
  attr: {
    (name: string): string | undefined
    (name: string, value: string | number | boolean | null | ((this: Element, index: number, currentValue: string | undefined) => string | number | boolean | null)): Self
    (props: Record<string, unknown>): Self
  }
  data: {
    (): Record<string, unknown>
    (name: string): unknown
    (name: string, value: string | number | boolean | object | null): Self
    (props: Record<string, string | number | boolean | object | null>): Self
  }
  prop: {
    (prop: string): unknown
    (prop: string, value: unknown | ((this: Element, index: number, currentValue: unknown) => unknown)): Self
    (props: Record<string, unknown>): Self
  }
  removeProp: {
    (prop: string): Self
  }
  val: {
    (): string | string[] | undefined
    (value: string | number | string[] | ((this: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement, index: number, currentValue: string) => string | number | string[])): Self
  }

  // Visibility
  hide: {
    (): Self
  }
  show: {
    (): Self
  }
  toggle: {
    (show?: boolean): Self
  }

  // Traversal
  add: {
    (selector: Selector): Self
  }
  filter: {
    (selector: Selector | ((this: Element, index: number) => boolean)): Self
  }
  is: {
    (selector: Selector | ((this: Element, index: number) => boolean)): boolean
  }
  not: {
    (selector: Selector): Self
  }
  has: {
    (selector: Selector): Self
  }
  first: {
    (): Self
  }
  last: {
    (): Self
  }
  find: {
    (selector: Selector): Self
  }
  children: {
    (selector?: Selector): Self
  }
  parent: {
    (selector?: Selector): Self
  }
  parents: {
    (selector?: Selector): Self
  }
  parentsUntil: {
    (selector: Selector, filter?: Selector): Self
  }
  closest: {
    (selector: Selector): Self
  }
  next: {
    (selector?: Selector): Self
  }
  nextAll: {
    (selector?: Selector): Self
  }
  nextUntil: {
    (selector: Selector, filter?: Selector): Self
  }
  prev: {
    (selector?: Selector): Self
  }
  prevAll: {
    (selector?: Selector): Self
  }
  prevUntil: {
    (selector: Selector, filter?: Selector): Self
  }
  siblings: {
    (selector?: Selector): Self
  }
  eq: {
    (index: number): Self
  }
  index: {
    (selector?: Selector): number
  }
  slice: {
    (start: number, end?: number): Self
  }
  even: {
    (): Self
  }
  odd: {
    (): Self
  }

  // Dimensions
  width: {
    (): number | undefined
    (val: number | string | ((this: Element | Window | Document, index: number, currentValue: number) => number | string)): Self
  }
  height: {
    (): number | undefined
    (val: number | string | ((this: Element | Window | Document, index: number, currentValue: number) => number | string)): Self
  }
  innerWidth: {
    (): number | undefined
    (val: number | string | ((this: Element | Window | Document, index: number, currentValue: number) => number | string)): Self
  }
  innerHeight: {
    (): number | undefined
    (val: number | string | ((this: Element | Window | Document, index: number, currentValue: number) => number | string)): Self
  }
  outerWidth: {
    (): number | undefined
    (val: number | string | boolean | ((this: Element | Window | Document, index: number, currentValue: number) => number | string)): Self
  }
  outerHeight: {
    (): number | undefined
    (val: number | string | boolean | ((this: Element | Window | Document, index: number, currentValue: number) => number | string)): Self
  }
  offset: {
    (): { top: number; left: number } | undefined
    (coords: { top: number; left: number } | ((this: Element, index: number, currentValue: { top: number; left: number }) => { top: number; left: number })): Self
  }
  offsetParent: {
    (): Self
  }
  position: {
    (): { top: number; left: number } | undefined
  }
  scrollLeft: {
    (): number | undefined
    (pos: number | ((this: Element | Window, index: number, currentValue: number) => number)): Self
  }
  scrollTop: {
    (): number | undefined
    (pos: number | ((this: Element | Window, index: number, currentValue: number) => number)): Self
  }

  // Ajax (instance)
  load: {
    (url: string, data: string | Record<string, unknown>, success: (this: Element, response: unknown, status: string | number, xhr: XMLHttpRequest) => void): Self
    (url: string, success: (this: Element, response: unknown, status: string | number, xhr: XMLHttpRequest) => void): Self
    (url: string): Self
  }
  serialize: {
    (): string
  }

  // Utilities
  each: {
    (callback: (this: Element, index: number, element: Element) => void | false): Self
  }
}

// Create a Dabby interface with only the specified methods
// Self-referencing via DabbyMethodSignatures<...> ensures chained methods preserve the full type
export type DabbyWithMethods<Methods extends keyof DabbyMethodSignatures> = Dabby & Pick<DabbyMethodSignatures<DabbyWithMethods<Methods>>, Methods>

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
// Intersection with Dabby ensures DabbyAuto is assignable to Dabby,
// which is required because many augmented methods use `this: Dabby`
export type DabbyAuto = Dabby & ModularDabbyMethods

// Factory type that returns auto-inferred Dabby
export type DabbyAutoFactory = {
  (selector?: Selector | TrustedHTML | ReadyCallback, context?: Selector | Record<string, unknown>): DabbyAuto
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
