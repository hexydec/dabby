# Dabby.js: Lightweight jQuery clone

A lightweight modular jQuery clone library built for modern browsers.

![Licence](https://img.shields.io/badge/Licence-MIT-lightgrey.svg)
![Project Status](https://img.shields.io/badge/Project%20Status-Pre--Beta-yellow.svg)
![Size Minified](https://img.shields.io/badge/Size%20(Minified)-14.4kb-brightgreen.svg)
![Size Gzipped](https://img.shields.io/badge/Size%20(Gzipped)-4.98kb-brightgreen.svg)

**This project is pre-beta, make sure to test your integration with this code thoroughly before deploying**

## jQuery is awesome, why do I need this?

jQuery is a great library, the API is simple yet expressive, but with advancements in browser technology often the full functionality of jQuery is not needed, and there is not really a granular way to remove the bits you aren't using.

Wouldn't it be good to have a simpler jQuery like library that is modular?

Dabby.js is designed to be a simple and streamlined as possible whilst covering as much of the jQuery API as much as is feasibly possible in a small size (~5kb minified and Gzipped), it also comes with a code scanner to render custom builds.

[Find out more about the project here.](documentation/about.md)

## I'm sold, how do I get started?

Makes sure the following software is installed:

- Git
- [NodeJS](http://nodejs.org/)
- [GruntJS](http://gruntjs.com/)

Clone the repository, and build it:

```
$ git clone https://github.com/hexydec/dabby
$ cd dabby
$ npm install
$ grunt
```

Then swap jQuery out for dabby.js. It does support AMD modules and CommonJS, so if your project does too, have a fiddle with your build to achieve this.

Next you should probably audit and refactor your code to update anything that Dabby will definitely not support, like custom pseudo selectors. Ajax calls will probably need checking over too.

Then run it in the browser, or through your test suite to highlight any other issues.

## Dabby.js API

Dabby.js is billed as a jQuery clone library, and as such tries to implement as much of the jQuery API as is feasible without getting away from being fast, small, and letting the browser do most of the work.

[See the API documentation here](documentation/api.md).

## Custom Builds

Dabby comes with a PHP script to generate a custom build for you from your code. Point your web browser to `[Your local web address]/dabby/scan/scan.php` and paste your code (Without dabby) into the code box, and click generate. Your custom build by default will be found in `/dabby/dist/custom/dabby.js`

## Troubleshooting

You can always swap dabby.js out for jQuery to see if the issue is with your code or dabby.js. It is a very young library which hadn't yet had much testing, so expect bugs.

If the issue still persists, you can create an issue for it in the tracker.

## Contributing

If you find an issue with dabby.js, please create an issue in the tracker, fork the code, fix the issue, then create a pull request, and I will evaluate your submission.

Also look at the [To Do list](documentation/todo.md) and the [coding style guide](documentation/codingstyle.md).
