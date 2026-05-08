# Dabby.js: Lightweight Modular ES6 jQuery clone

A lightweight modular jQuery clone/alternative library built for modern browsers in ES6 with full TypeScript support.

![Licence](https://img.shields.io/badge/Licence-MIT-lightgrey.svg)
![Project Status](https://img.shields.io/badge/Project%20Status-Beta-yellow.svg)
![Size Minified](https://img.shields.io/badge/Size%20(Minified)-28.3kb-brightgreen.svg)
![Size Gzipped](https://img.shields.io/badge/Size%20(Gzipped)-8.26kb-brightgreen.svg)

**This project is in beta, make sure to test your integration with this code thoroughly before deploying**

## jQuery is awesome, why do I need this?

jQuery is a great library, the API is simple yet expressive, but with advancements in browser technology often the full functionality of jQuery is not needed, and there is not really a granular way to remove the bits you aren't using.

Wouldn't it be good to have a simpler jQuery like library that is modular?

Dabby.js is a jQuery alternative designed to be as simple and streamlined as possible whilst covering as much of the jQuery API as much as is feasibly possible in a small size (<10kb minified and Gzipped), you can also build it as part of your project and only include the bits you are actually using.

[Find out more about the project here.](docs/about.md)

## Features

- **Modular** — import only the methods you need, tree-shake the rest
- **TypeScript-first** — written in TypeScript with automatic type inference via module augmentation
- **Trusted Types** — compatible with `require-trusted-types-for` CSP directive
- **jQuery 4 parity** — CSS px allowlist, `.even()`/`.odd()`, FormData support, DOMParser-based HTML parsing
- **Small** — <10kb gzipped for the full bundle

## I'm sold, how do I get started?

Want to get started quickly? [Download the latest release here](https://github.com/hexydec/dabby/releases).

Want to build the bundle yourself? Make sure the following software is installed:

- Git
- [NodeJS](http://nodejs.org/)

Clone the repository, and build it:

```
$ git clone https://github.com/hexydec/dabby
$ cd dabby
$ npm install
$ npm run build
```

Then swap jQuery out for Dabby.js in your project.

Next you should probably audit and refactor your code to update anything that Dabby.js will definitely not support, like custom pseudo selectors or any animation methods.

Then run it in the browser, or through your test suite to highlight any other issues.

Dabby.js compiles an ES6 module with TypeScript definitions. Include Dabby.js like this:

```javascript
import $ from "dabbyjs/dist/dabby.js"; // or dabby.min.js
```

For TypeScript projects:

```typescript
import $ from "dabbyjs"; // Automatically includes type definitions
```

## Browser Support

[Browser support for Dabby.js can be found here](docs/support.md):

## Dabby.js API

Dabby.js is billed as a jQuery clone library, and as such tries to implement as much of the jQuery API as is feasible without getting away from being fast, small, and letting the browser do most of the work.

Every module has its own readme with signatures, parameters and examples. Click any method below to jump to its docs.

### Core

The `$()` factory and the underlying `Dabby` class. Methods on this section are always available — no extra import needed.

- [`$()` factory and `Dabby` class](src/core/dabby/readme.md) — selectors, HTML creation, ready callback
- [`$.fn.each()`](src/core/each/readme.md) — iterate the collection
- [`$.fn.get()`](src/core/get/readme.md) — get a node from the collection
- [`$.fn.map()`](src/core/map/readme.md) — translate the collection through a callback

### Manipulation

- [`$.fn.html()`](src/manipulation/html/readme.md) — get/set inner HTML
- [`$.fn.text()`](src/manipulation/text/readme.md) — get/set text content
- [`$.fn.append()` / `.prepend()` / `.before()` / `.after()`](src/manipulation/insert/readme.md) — insert content
- [`$.fn.appendTo()` / `.prependTo()` / `.insertBefore()` / `.insertAfter()`](src/manipulation/insertto/readme.md) — insert into a target
- [`$.fn.empty()`](src/manipulation/empty/readme.md) — remove children
- [`$.fn.remove()` / `.detach()`](src/manipulation/remove/readme.md) — remove from DOM
- [`$.fn.replaceWith()` / `.replaceAll()`](src/manipulation/replace/readme.md) — swap nodes
- [`$.fn.clone()`](src/manipulation/clone/readme.md) — deep-copy elements
- [`$.fn.wrap()`](src/manipulation/wrap/readme.md) — wrap each element
- [`$.fn.wrapAll()`](src/manipulation/wrapall/readme.md) — wrap a group
- [`$.fn.unwrap()`](src/manipulation/unwrap/readme.md) — remove the parent

### Attributes & classes

- [`$.fn.attr()`](src/attributes/attr/readme.md) — get/set HTML attributes
- [`$.fn.prop()`](src/attributes/prop/readme.md) — get/set DOM properties
- [`$.fn.removeProp()`](src/attributes/removeprop/readme.md) — delete a property
- [`$.fn.data()`](src/attributes/data/readme.md) — read/write `data-*`
- [`$.fn.val()`](src/attributes/val/readme.md) — get/set form values
- [`$.fn.css()`](src/attributes/css/readme.md) — get/set inline CSS
- [`$.fn.addClass()` / `.removeClass()` / `.toggleClass()`](src/attributes/class/readme.md) — class manipulation
- [`$.fn.hasClass()`](src/attributes/hasclass/readme.md) — class predicate
- [`$.fn.show()` / `.hide()` / `.toggle()`](src/attributes/show-hide/readme.md) — visibility

### Events

- [`$.fn.on()` / `.one()`](src/events/on/readme.md) — bind handlers (with optional delegation)
- [`$.fn.off()`](src/events/off/readme.md) — remove handlers
- [`$.fn.trigger()`](src/events/trigger/readme.md) — fire an event
- [`$.fn.triggerHandler()`](src/events/triggerhandler/readme.md) — invoke handlers without dispatching
- [Named events: `click`, `keydown`, `submit`, …](src/events/named/readme.md) — 24 jQuery-style shortcuts

### Traversal

- [`$.fn.find()`](src/traversal/find/readme.md) — descendants matching a selector
- [`$.fn.children()`](src/traversal/children/readme.md) — direct children
- [`$.fn.parent()` / `.parents()` / `.parentsUntil()`](src/traversal/parents/readme.md) — ancestors
- [`$.fn.closest()`](src/traversal/closest/readme.md) — nearest matching ancestor
- [`$.fn.siblings()`](src/traversal/siblings/readme.md) — siblings
- [`$.fn.next()` / `.nextAll()` / `.nextUntil()` / `.prev()` / `.prevAll()` / `.prevUntil()`](src/traversal/next-prev/readme.md) — sibling chain
- [`$.fn.filter()` / `.is()` / `.not()`](src/traversal/filter/readme.md) — narrow or test a collection
- [`$.fn.has()`](src/traversal/has/readme.md) — keep parents containing a match
- [`$.fn.add()`](src/traversal/add/readme.md) — combine collections
- [`$.fn.first()`](src/traversal/first/readme.md) / [`.last()`](src/traversal/last/readme.md) / [`.eq()`](src/traversal/eq/readme.md) — pick by position
- [`$.fn.even()`](src/traversal/even/readme.md) / [`.odd()`](src/traversal/odd/readme.md) — even/odd index subsets
- [`$.fn.slice()`](src/traversal/slice/readme.md) — array-style subset
- [`$.fn.index()`](src/traversal/index/readme.md) — position lookup

### Dimensions

- [`$.fn.width()` / `.height()` / `.innerWidth()` / `.innerHeight()` / `.outerWidth()` / `.outerHeight()`](src/dimensions/width-height/readme.md) — measurements
- [`$.fn.scrollLeft()` / `.scrollTop()`](src/dimensions/scroll/readme.md) — scroll position
- [`$.fn.offset()`](src/dimensions/offset/readme.md) — viewport position
- [`$.fn.offsetParent()`](src/dimensions/offsetparent/readme.md) — nearest positioned ancestor
- [`$.fn.position()`](src/dimensions/position/readme.md) — position relative to the offset parent

### Ajax

- [`$.ajax()`](src/ajax/ajax/readme.md) — primary request method
- [`$.get()` / `$.post()`](src/ajax/getpost/readme.md) — GET/POST shortcuts
- [`$.getScript()`](src/ajax/getscript/readme.md) — load and execute a script
- [`$.fn.load()`](src/ajax/load/readme.md) — load HTML into elements
- [`$.fn.serialize()`](src/ajax/serialize/readme.md) — serialise a form
- [`$.param()`](src/ajax/param/readme.md) — serialise an object as a query string

### Utilities

- [`$.each()`](src/utils/each/readme.md) — iterate any collection
- [`$.map()`](src/utils/map/readme.md) — translate any collection
- [`$.extend()`](src/utils/extend/readme.md) — shallow/deep merge
- [`$.parseHTML()`](src/utils/parsehtml/readme.md) — parse HTML to nodes
- [`$.isPlainObject()`](src/utils/isplainobject/readme.md) — plain-object predicate
- [`isFunction()`](src/utils/isfunction/readme.md) / [`isWindow()`](src/utils/iswindow/readme.md) — internal type guards

## Custom Builds

As Dabby.js is built in ES6, you can include just the parts you need in your project (if you are using ES6 modules). Import the core library and only the methods you need:

```javascript
import $ from "dabbyjs";
import "dabbyjs/attributes/attr/attr";       // create elements with attributes like $("<element>", {some: "attributes"})
import "dabbyjs/traversal/filter/filter";    // $.fn.is(), $.fn.filter() and $.fn.not()
```

You can either do this in each module you need dabby.js in, or build a file that imports all the methods you need for your project, and include that somewhere.

## TypeScript Support

Dabby.js is written in TypeScript with a seamless developer experience. Import `$` and the modules you need — all types are automatically added via module augmentation. No separate type imports required.

### Full Build

```typescript
import $ from 'dabbyjs/full';

// All methods available with full type safety and IntelliSense
$('#app').html('<div>Hello</div>').addClass('active').on('click', () => {});
const text = $('#app').text(); // inferred as string
```

### Modular Build

Import only the modules you need. TypeScript automatically knows which methods are available based on your imports:

```typescript
import $ from 'dabbyjs';
import 'dabbyjs/manipulation/html/html';
import 'dabbyjs/events/on/on';

// TypeScript knows html() and on() are available, with perfect autocomplete
$('#app').html('Hello').on('click', () => {});

// TypeScript error — css() was not imported
$('#app').css('color', 'red'); // Error: Property 'css' does not exist
```

Method chaining preserves all augmented types — every chained call returns the full type with all imported methods available.

### Trusted Types Support

Dabby.js supports the [Trusted Types API](https://developer.mozilla.org/en-US/docs/Web/API/Trusted_Types_API) for environments with `Content-Security-Policy: require-trusted-types-for 'script'`. All HTML-accepting methods (`.html()`, `.append()`, `.prepend()`, `.before()`, `.after()`, `$()`) accept `TrustedHTML` objects and route string assignments through a `trustedTypes` policy.

```typescript
// TrustedHTML objects pass through directly
const policy = trustedTypes.createPolicy('myApp', { createHTML: (s) => DOMPurify.sanitize(s) });
$('#app').html(policy.createHTML('<div>Safe HTML</div>'));

// Raw strings are wrapped via dabby's own policy automatically
$('#app').html('<div>Hello</div>'); // Works in both enforced and non-enforced environments
```

### Build Commands

```bash
npm run build          # TypeScript compilation + Vite bundle
npm run build:types    # TypeScript declarations only
npm run build:bundle   # Vite bundle only
npm run dev            # Watch mode
npm run test:types     # Run type tests (tsd)
```

## Troubleshooting

You can always swap dabby.js out for jQuery to see if the issue is with your code or dabby.js. It is a very young library which hasn't been tested as much as jQuery, so expect bugs. But this library is being used in production of most of my own websites.

If the issue still persists, you can create an issue for it in the tracker.

## Contributing

If you find an issue with dabby.js, please create an issue in the tracker, fork the code, fix the issue, then create a pull request, and I will evaluate your submission.

Also look at the [To Do list](docs/todo.md) and the [coding style guide](docs/codestyle.md).

## Licence

The MIT License (MIT). Please see [License File](LICENCE) for more information.
