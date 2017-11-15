# Dabby.js: Lightweight jQuery clone

A lightweight modular jQuery clone library built for modern browsers.

**This project is pre-beta, make sure to test your integration with this code thoroughly before deploying**

## jQuery is awesome, why do I need this?

jQuery is a great library, the API is simple yet expressive, it was most definitely ahead of it's time. But things have moved on a bit since its creation, browsers stick to the standards more closely, and indeed have replicated much of jQuery's functionality to the point where it is actually overkill for most projects that use it.

But it is still a pleasure to use, wouldn't it be great if you could have the features from you need jQuery but without the bloat?

## Why did you create Dabby.js?

Most of my projects were using 10-15% of jQuery, it seemed a bit ridiculous to be forcing a 33kb file on my users, when my own code was only 10kb. Plus it is not exactly the fastest library on the planet, I want my mobile users to have a good experience and not drain their battery.

I supposed I could have rewritten it in vanilla JavaScript, but jQuery has really got the API right, I want to think about what I am trying to achieve, not how to handle nodes etc.

I thought I cannot be the only developer who wants a smaller jQuery? Plus I wanted the challenge and to learn more JavaScript.

## What Dabby.js is and isn't

First things first, Dabby.js is not jQuery, whilst it replicates much of jQuery's API, under the hood, the code and design ethos is different.

It is designed to be a cut down version of jQuery, leaning more on the browser than smoothing everything out for you like jQuery does.

It is however designed to be completely modular, and comes with a rudimentary code scanner (Currently written in PHP) that will take your custom code and build a custom version of dabby for that code.

Dabby.js is designed for modern browsers and supports IE11+, Chrome, Firefox, iOS 9.3+, and Android (What versions of some of these browsers I don't know yet).

The final thing to note is that currently the full dabby.js library weighs in at just under 5kb zipped, and can be smaller with a custom build.

## Differences between dabby.js and jQuery:

- No fx library, if you want effects, use CSS and class toggles
- ‎Extra CSS selectors like :first are not supported, and dabby doesn't have a selector engine plugin architecture, it supports what the browser's `document.querySelectorAll()` supports
- ‎Doesn't support the deferred object
- ‎Events return the native browser event, not a super or custom object like jQuery
- ‎Ajax support is much more basic, dabby doesn't support global callbacks or promises, and only offers a subset of the configuration options
- ‎The Ajax object returned is the native XHR object, not a super or custom object like jQuery's jqXHR object
- ‎Dabby does not stack selectors like jQuery does, so methods like andBack() are not supported
- ‎It may not support all the inputs of each method that jQuery does

## I'm sold, how do I get started?

First thing to do it to swap jQuery out for dabby.js. It does support AMD modules, so if your project does too, have a fiddle with your build to achieve this.

Next you should probably audit and refactor your code to update anything that dabby will definitely not support, like custom pseudo selectors. Ajax calls will probably need checking over too.

Then run it in the browser, or through your test suite to highlight any other issues.

## Troubleshooting

You can always swap dabby.js out for jQuery to see if the issue is with your code or dabby.js. It is a very young library which hadn't yet had much testing, so expect bugs.

If the issue still persists, you can create an issue for out in the tracker.

## Contributing

If you find an issue with dabby.js, please create an issue in the tracker, fork the code, fix the issue, then create a pull request, and I will evaluate your submission.
