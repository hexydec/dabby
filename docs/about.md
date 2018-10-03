# About Dabby.js

Dabby.js is designed to be a simple and streamlined as possible whilst covering as much of the jQuery API as much as is feasibly possible in a small size (~6kb minified and Gzipped), you can also build it as part of your project and only include the bits you are actually using.

## Project Aims

- Be small (Less than 10kb minified and gzipped)
- Be built in a modular was so that its components can be included as needed
- Be fast, tries to use the browsers native functions in each method (Without duplicating more complex functionality)
- Be easy to understand. jQuery and other clone libraries' code can be a little obfuscated to read and understand

## Why did you create Dabby.js?

Most of my projects were using 10-15% of jQuery, it seemed a bit ridiculous to be forcing a 33kb file on my users, when my own code was only 10kb. Plus it is not exactly the fastest library on the planet, I want my mobile users to have a good experience and not drain their battery.

I supposed I could have rewritten it in vanilla JavaScript, but jQuery has really got the API right, I want to think about what I am trying to achieve, not how to handle nodes etc.

I thought I cannot be the only developer who wants a smaller jQuery? Plus I wanted the challenge and to learn more JavaScript.

## What Dabby.js is and isn't

First things first, Dabby.js is not jQuery, whilst it replicates much of jQuery's API, under the hood, the code and design ethos is different.

It is designed to be a cut down version of jQuery, leaning more on the browser than smoothing everything out for you like jQuery does.

It is however designed to be completely modular, as it is written as ES6 modules, this means you can just include the bits you are actually using in your project.

Dabby.js is designed for modern browsers and supports IE11+, Chrome, Firefox, iOS 8+, and Android 4.4.4.

The final thing to note is that currently the full dabby.js library weighs in at just under 6kb zipped, and can be smaller with a custom build.

## Differences between dabby.js and jQuery:

- No fx library, if you want effects, use CSS and class toggles
- ‎Extra CSS selectors like :first are not supported, and dabby doesn't have a selector engine plugin architecture, it supports what the browser's `document.querySelectorAll()` supports
- ‎Doesn't support the deferred object
- ‎Events return the native browser event, not a super or custom object like jQuery
- ‎Ajax support is much more basic, dabby doesn't support global callbacks or promises, and only offers a subset of the configuration options
- ‎The Ajax object returned is the native XHR object, not a super or custom object like jQuery's jqXHR object
- ‎Dabby does not stack selectors like jQuery does, so methods like andBack() are not supported
- ‎It may not support all the inputs of each method that jQuery does (See documentation for each method to see differences if available)
