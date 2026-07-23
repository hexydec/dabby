import $, { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";
import type { Selector } from "../../types.js";

function factory(func: string, obj: Dabby, selector: Selector): Dabby {
	const target = $(selector);
	(target as Dabby & Record<string, (obj: Dabby) => void>)[func](obj);
	return obj;
}

/**
 * Insert the current collection before each element matched by the target.
 *
 * The inverse of `.before()`: rather than inserting content into the current
 * collection, the current collection is inserted before each target element
 * (as a previous sibling).
 *
 * @param selector - a selector, node, array of nodes or Dabby collection identifying the target
 * @returns the original Dabby collection
 *
 * @example
 * $("<label>Name:</label>").insertBefore("input[name='name']");
 */
function insertBefore(this: Dabby, selector: Selector): Dabby {
	return factory("before", this, selector);
}

Object.defineProperty(Dabby.prototype, "insertBefore", { value: insertBefore, configurable: true });

/**
 * Prepend the current collection to each element matched by the target.
 *
 * The inverse of `.prepend()`: the current collection is inserted as the
 * first child of each target element.
 *
 * @param selector - a selector, node, array of nodes or Dabby collection identifying the target
 * @returns the original Dabby collection
 *
 * @example
 * $("<h2>Heading</h2>").prependTo(".container");
 */
function prependTo(this: Dabby, selector: Selector): Dabby {
	return factory("prepend", this, selector);
}

Object.defineProperty(Dabby.prototype, "prependTo", { value: prependTo, configurable: true });

/**
 * Append the current collection to each element matched by the target.
 *
 * The inverse of `.append()`: the current collection is inserted as the
 * last child of each target element.
 *
 * @param selector - a selector, node, array of nodes or Dabby collection identifying the target
 * @returns the original Dabby collection
 *
 * @example
 * $("<li>New item</li>").appendTo(".todo-list");
 */
function appendTo(this: Dabby, selector: Selector): Dabby {
	return factory("append", this, selector);
}

Object.defineProperty(Dabby.prototype, "appendTo", { value: appendTo, configurable: true });

/**
 * Insert the current collection after each element matched by the target.
 *
 * The inverse of `.after()`: rather than inserting content into the current
 * collection, the current collection is inserted after each target element
 * (as a next sibling).
 *
 * @param selector - a selector, node, array of nodes or Dabby collection identifying the target
 * @returns the original Dabby collection
 *
 * @example
 * $("<button>Submit</button>").insertAfter("form");
 */
function insertAfter(this: Dabby, selector: Selector): Dabby {
	return factory("after", this, selector);
}

Object.defineProperty(Dabby.prototype, "insertAfter", { value: insertAfter, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module '../../dabby.js' {
  interface ModularDabbyMethods {
    appendTo(selector: Selector): this;
    insertAfter(selector: Selector): this;
    insertBefore(selector: Selector): this;
    prependTo(selector: Selector): this;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __appendTo = typeof appendTo;
export type __insertAfter = typeof insertAfter;
export type __insertBefore = typeof insertBefore;
export type __prependTo = typeof prependTo;

