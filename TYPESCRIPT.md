# Dabby TypeScript Type System

This document explains how Dabby's TypeScript type system works, focusing on the module augmentation pattern that enables auto-importing types for a modular, tree-shakeable DOM library.

## Architecture Overview

Dabby's type system solves a specific problem: how do you provide accurate TypeScript types for a library where methods are **optional side-effect imports** that attach themselves to a shared prototype at runtime?

The answer is **module augmentation** combined with **type witness exports**.

```
src/trusted-types.d.ts     Trusted Types API declarations
src/types.ts               Base types: DOMNode, Selector, DabbyFactory, etc.
src/core/dabby/dabby.ts    Dabby class with core methods (each, get, map)
src/dabby.ts               Modular entry point: empty interfaces + factory exports
src/[category]/[method]/   Each method file augments dabby.ts interfaces
```

## The Core Types

### `src/types.ts` — Foundation types

```typescript
type DOMNode = Element | Document | DocumentFragment | Window;
type Selector = string | DOMNode | DOMNode[] | NodeList | HTMLCollection | Dabby;
type ReadyCallback = (this: Document, $: DabbyFactory) => void;
```

`DOMNode` defines everything Dabby can wrap. `Selector` defines everything you can pass to `$()`.

The `$()` factory also accepts `TrustedHTML` for Trusted Types compatibility — see [Trusted Types Support](#trusted-types-support) below.

### `src/core/dabby/dabby.ts` — The class

```typescript
class Dabby implements Iterable<DOMNode> {
  readonly length: number;
  readonly [index: number]: DOMNode;
  // Core methods baked into the class:
  each(), get(), map()
}
```

The Dabby class is intentionally minimal. It only has the methods needed to bootstrap iteration and element access. All other methods (html, css, on, even, odd, etc.) are added to `Dabby.prototype` at runtime by individual module files.

The file also creates and exports the `$` factory function:

```typescript
const $ = ((selector?, context?) => new Dabby(selector, context)) as DabbyFactory;
Object.defineProperty($, "prototype", { value: Dabby.prototype });
Object.defineProperty($, "fn", { value: Dabby.prototype });
```

## The Module Augmentation Pattern

This is the heart of the system. It happens in three places working together.

### Step 1: Empty interfaces in `src/dabby.ts`

```typescript
export interface ModularDabbyMethods {
  // Initially empty — populated by method file imports
}

export interface ModularDabbyStatics {
  // Initially empty — populated by static method file imports
}
```

These are **open interfaces**. TypeScript's declaration merging means any file can add members to them later.

### Step 2: Method files augment the interfaces

Each method file (e.g. `src/manipulation/html/html.ts`) does three things:

**a) Implements the method and attaches it to the prototype:**

```typescript
function html(this: Dabby): string | undefined;
function html(this: Dabby, content: string | TrustedHTML | HTMLCallback): Dabby;
function html(this: Dabby, content?: string | TrustedHTML | HTMLCallback) { /* ... */ }

Object.defineProperty(Dabby.prototype, "html", { value: html, configurable: true });
```

**b) Declares a module augmentation:**

```typescript
declare module '../../dabby.js' {
  interface ModularDabbyMethods {
    html(): string | undefined;
    html(content: string | TrustedHTML | ((this: Element, index: number, currentHTML: string) => string)): this;
  }
}
```

This tells TypeScript: "when this file is imported, add `html()` to the `ModularDabbyMethods` interface defined in `dabby.ts`."

The `this` return type is critical — it resolves to whatever type the caller is, enabling method chaining with full type awareness.

**c) Exports a type witness:**

```typescript
export type __html = typeof html;
```

This forces TypeScript to include the file's module augmentation. Without it, TypeScript may tree-shake the augmentation since the file has no value exports that other files depend on. The type witness is never used directly — its existence is what matters.

### Step 3: The factory type collects augmented methods

```typescript
export type DabbyAuto = Dabby & ModularDabbyMethods;

export type DabbyAutoFactory = {
  (selector?: Selector | TrustedHTML | ReadyCallback, context?: Selector | Record<string, unknown>): DabbyAuto;
  readonly prototype: DabbyAuto;
  readonly fn: DabbyAuto;
} & ModularDabbyStatics;

export const $ = $base as unknown as DabbyAutoFactory;
export default $ as DabbyAutoFactory;
```

`DabbyAuto` intersects the base `Dabby` class with `ModularDabbyMethods`. As method files are imported and augment `ModularDabbyMethods`, the type of `$()` results grows to include those methods.

## How It Looks to the Consumer

```typescript
import $ from 'dabbyjs';

// At this point, $().html doesn't exist in types — ModularDabbyMethods is empty

import 'dabbyjs/manipulation/html/html';
// Now ModularDabbyMethods has html(), so $().html() is valid

import 'dabbyjs/events/on/on';
// Now ModularDabbyMethods also has on()

$('#app').html('Hello');     // OK — html() is known
$('#app').on('click', fn);   // OK — on() is known
$('#app').css('color');       // ERROR — css not imported, not in ModularDabbyMethods
```

Types track exactly what's available at runtime. Import a module file, get the method in your types. Don't import it, TypeScript prevents you from calling it.

> **Scope of this guarantee.** This holds for **consumers** of the published package, not inside Dabby's own source tree. See [Scope of the Per-Import Guarantee](#scope-of-the-per-import-guarantee) below for why.

## Scope of the Per-Import Guarantee

The "import a method, get its type; skip it, get an error" behaviour is real, but it is a property of the **compilation boundary**, not of individual `import` statements. It's worth understanding precisely, because it behaves differently depending on who is compiling.

### `declare module` augmentations are global within one compilation

TypeScript merges every `declare module '../../dabby.js'` block it sees into a single, program-wide `ModularDabbyMethods` / `ModularDabbyStatics`. Once *any* file contributing an augmentation is part of the current compilation, that member is visible **everywhere** in that compilation — there is no per-`import`-statement scoping.

Inside this repository that means the guarantee does **not** hold. `tsconfig.build.json` includes `src/**/*.ts`, so all method files (and their augmentations) are part of one compilation. From within the repo, `$().css()` type-checks even in a file that only imported `html` — because `css.ts` is in the program and has already merged `css` into the interface.

### Why it holds for published consumers

The isolation comes from the [`package.json` exports map](#packagejson-type-fields), not from the augmentation mechanism:

- Each method has its own subpath (`./manipulation/html/html`) pointing at its own emitted `./dist/manipulation/html/html.d.ts`.
- A consumer's compiler only loads the `.d.ts` files for the subpaths they actually import.
- So only the augmentations the consumer imported enter *their* program, and only those methods appear on `$()`.

In other words: the per-method `.d.ts` files are the real unit of "import this, get its type." The repo authoring everything in one compilation is what makes the rule invisible locally.

### How the modular typing is actually verified

Because the rule is invisible from inside `src/`, the type tests don't try to assert it via auto-inference. `test-d/modular.test-d.ts` instead exercises the **explicit `createDabby<'html' | 'text' | 'on'>()` enumeration**, which is robust to the global-augmentation effect: `DabbyWithMethods` uses `Pick<DabbyMethodSignatures, Methods>`, so it exposes *only* the named methods regardless of what augmentations are present in the program. The auto-inferred `$` is only checked positively (imported methods are present); `expectError` in `test-d/dabby.test-d.ts` targets wrong **argument types**, not missing methods.

To assert "a non-imported method is absent" the consumer way, you'd need a **separate compilation per import set** (or to compile against the built `dist` `.d.ts` files through the `exports` map) — neither is done in-repo, by design.

## The `import type {} from '../../dabby.js'` Line

Each method file includes this seemingly empty import:

```typescript
import type {} from "../../dabby.js";
```

This establishes a **module reference** to `dabby.ts` so that the `declare module '../../dabby.js'` augmentation has a target. Without it, TypeScript doesn't know which module is being augmented. The `type` keyword ensures no runtime import is generated — this is purely a compile-time hint.

## The Type Witness Pattern Explained

Why does `export type __html = typeof html;` matter?

TypeScript's module system only processes augmentations from files that are **part of the compilation**. A side-effect import (`import './html.js'`) with no value exports could be ignored by TypeScript during type checking because nothing depends on it type-wise.

By exporting a type, the file becomes a proper TypeScript module with an export. The `declare module` augmentation in that module is then guaranteed to be processed. The type itself is never referenced anywhere — it's a trigger, not a value.

## Alternative: Explicit Generic Method Typing

For users who want to enumerate available methods explicitly rather than relying on auto-inference:

```typescript
import { createDabby } from 'dabbyjs';
import 'dabbyjs/manipulation/html/html';
import 'dabbyjs/events/on/on';

const $ = createDabby<'html' | 'on'>();
$('#app').html('Hello');  // OK
$('#app').css('color');   // ERROR
```

This uses `DabbyMethodSignatures`, a comprehensive interface that defines every possible method signature:

```typescript
export interface DabbyMethodSignatures<Self = Dabby> {
  html: { (): string | undefined; (content: string | TrustedHTML): Self }
  css:  { (prop: string): string;  (prop: string, value: string): Self }
  on:   { (events: string, callback: Function): Self }
  even: { (): Self }
  odd:  { (): Self }
  // ... every method
}

export type DabbyWithMethods<Methods extends keyof DabbyMethodSignatures> =
  Dabby & Pick<DabbyMethodSignatures<DabbyWithMethods<Methods>>, Methods>;
```

The `Self` generic parameter is what makes method chaining work. `DabbyWithMethods<'html' | 'on'>` creates a type where `html()` returns `DabbyWithMethods<'html' | 'on'>`, preserving access to both methods on the chained result.

## The Full Build Type

`src/dabby-full.ts` provides `DabbyFull` — an interface with **all** methods declared non-optionally. This is used when the consumer imports the bundled build that includes everything:

```typescript
export interface DabbyFull extends Omit<Dabby, keyof DabbyFullMethods> {
  html(): string | undefined;
  html(content: string | TrustedHTML): this;
  css(prop: string): string;
  css(prop: string, value: string): this;
  even(): DabbyFull;
  odd(): DabbyFull;
  // ... every method, fully typed
}
```

## Trusted Types Support

Dabby supports the [Trusted Types API](https://developer.mozilla.org/en-US/docs/Web/API/Trusted_Types_API) for environments enforcing `Content-Security-Policy: require-trusted-types-for 'script'`.

### How it works

- `src/trusted-types.d.ts` provides TypeScript declarations for the Trusted Types API (not yet in lib.dom.d.ts)
- `src/internal/trustedhtml/trustedhtml.ts` creates a `trustedTypes.createPolicy("dabby", { createHTML: (s) => s })` pass-through policy at init
- All `innerHTML` assignments route through `toTrustedHTML()` which wraps strings via the policy when available
- `TrustedHTML` objects passed to public APIs (`.html()`, `.append()`, `$()`, etc.) are passed through unchanged

### DOM sinks covered

| Sink | File | How it's handled |
|------|------|-----------------|
| `innerHTML` | `parsehtml.ts` | Wrapped via `toTrustedHTML()` + DOMParser |
| `innerHTML` | `html.ts` | Wrapped via `toTrustedHTML()` |
| `script.src` | `parsehtml.ts`, `ajax.ts` | Script element creation (TrustedScriptURL sink) |

### Zero impact when not enforced

- If `trustedTypes` is not available, `toTrustedHTML()` returns the raw string unchanged
- If the policy name "dabby" is blocked by CSP, it falls back gracefully
- Adds ~30 bytes gzipped to the bundle

## Package Distribution

### `package.json` type fields

```json
{
  "types": "dist/dabby.d.ts",
  "exports": {
    ".": { "types": "./dist/dabby.d.ts", "default": "./dist/dabby.js" },
    "./*": { "types": "./dist/*.d.ts", "default": "./dist/*.js" }
  }
}
```

The `./*` wildcard gives each method module its own subpath (e.g. `dabbyjs/manipulation/html/html`), so consumers can import individual methods and TypeScript can resolve the `.d.ts` files for augmentation.

### `tsconfig.json` key settings

```json
{
  "moduleResolution": "bundler",
  "declaration": true,
  "declarationMap": true,
  "paths": {
    "dabbyjs": ["./src/dabby.ts"],
    "dabbyjs/*": ["./src/*", "./dist/*"]
  }
}
```

- `"moduleResolution": "bundler"` enables the modern resolution mode compatible with Vite/Rollup
- `declaration: true` generates all `.d.ts` files from the source
- `paths` maps the package name to source for local development

## Build Pipeline

```
tsc -p tsconfig.build.json    → generates ~90+ .d.ts files in dist/
vite build                     → bundles JS using entry src/build.ts
```

The TypeScript compiler generates declaration files for every source file. The module augmentations in each method's `.d.ts` file are what make the auto-import system work for published consumers — same pattern, just pointing at `dist/` instead of `src/`.

## Runtime vs Type-Time

The two systems are independent and mirror each other:

| Layer | Runtime (JS) | Type-Time (TS) |
|-------|-------------|----------------|
| Method attachment | `Object.defineProperty(Dabby.prototype, "html", ...)` | `declare module { interface ModularDabbyMethods { html(): ... } }` |
| Static attachment | `$.ajax = ajaxFunction` | `declare module { interface ModularDabbyStatics { ajax(): ... } }` |
| Trigger | `import './html.js'` executes the defineProperty | `import './html.js'` includes the augmentation |
| Without import | `$().html` is `undefined` at runtime | `$().html` is a type error at compile time |

## Summary

The type system's elegance is in how three TypeScript features combine:

1. **Open interfaces** (`ModularDabbyMethods`) — can be extended from any file via declaration merging
2. **Module augmentation** (`declare module '../../dabby.js'`) — ties extensions to a specific module, scoped by import
3. **Type witnesses** (`export type __html = typeof html`) — ensures TypeScript processes the augmentation

The result: types follow imports automatically. No configuration, no manual type lists, no separate type packages. Import a method, get its types.
