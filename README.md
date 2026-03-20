# Dabby.js: Lightweight Modular ES6 jQuery clone

A lightweight modular jQuery clone/alternative library built for modern browsers in ES6.

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

[See the API documentation here](src/).

## Custom Builds

As Dabby.js is built in ES6, you can include just the parts you need in your project (If you are using ES6 modules). Include the core library like this, methods are imported without a variable:

```javascript
import $ from "/src/core/dabby/dabby.js"; // update to reference where you have the project stored
import "/src/attributes/attr/attr.js"; // if you need to create elements with attributes like $("<element>", {some: "attributes"}), include this
import "/src/traversal/filter/filter.js"; // I need $.fn.is(), which is written with $.fn.filter() and $.fn.not()
```

You can either do this in each module you need dabby.js in, or build a file that imports all the methods you need for your project, and include that somewhere.

## TypeScript Support

Dabby.js is written in TypeScript with a seamless developer experience. Import `$` and the modules you need — all types are automatically added via module augmentation. No separate type imports required.

### Full Build

```typescript
import $ from 'dabbyjs';

// All methods available with full type safety and IntelliSense
$('#app').html('<div>Hello</div>').addClass('active').on('click', () => {});
const text = $('#app').text(); // inferred as string
```

### Modular Build

Import only the modules you need. TypeScript automatically knows which methods are available based on your imports:

```typescript
import $ from 'dabbyjs/modular';
import 'dabbyjs/src/manipulation/html/html';
import 'dabbyjs/src/events/on/on';

// TypeScript knows html() and on() are available, with perfect autocomplete
$('#app').html('Hello').on('click', () => {});

// TypeScript error — css() was not imported
$('#app').css('color', 'red'); // Error: Property 'css' does not exist
```

Method chaining preserves all augmented types — every chained call returns the full type with all imported methods available.

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