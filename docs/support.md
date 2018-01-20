# Browser Support

This page describes browser support for the various components of Dabby.js:

| Feature											| IE	| FF	| Chrome | Safari | iOS | Android | Used in				|
|---------------------------------------------------|-------|-------|--------|--------|-----|---------|---------------------|
| [XMLHttpRequest](https://caniuse.com/#feat=xhr2)	| 10	| 12	| 31	 | 7.1	  | 8   | 4.4.4	  | $.ajax()			|
| [classList](https://caniuse.com/#feat=classlist)	| 10	| 26	| 28	 | 7	  | 7.1 | 4.4	  | .addClass(), .toggleClass, .removeClass() |
| [getComputedStyle](https://caniuse.com/#feat=getcomputedstyle) | 9 | 4 | 11 | 5	  | 5.1 | 4		  | .css(), .width(), .height(), .outerWidth(), .outerHeight(), .innerWidth(), .innerHeight()	|
| [dataset](https://caniuse.com/#feat=dataset)		| 11	| 6		| 7		 | 5.1	  | 5.1 | 3		  | .data()				|
| [getBoundingClientRect](https://caniuse.com/#feat=getboundingclientrect) | 9 | 12 | 4 | 4 | 4.1 | 2.3 | .offset()			|
| [addEventListener](https://caniuse.com/#feat=addeventlistener) | 9 | 7 | 4 | 3.1	  | 3.2 | 2.1	  | .on(), .one()		|
| [CustomEvent](https://caniuse.com/#feat=customevent) | X	| 11	| 15	 | 6.1	  | 6.1 | 4.4	  | .trigger(), via polyfill |
| [Object.keys](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) | 9 | 4 | 5 | 5 | ? | ? | setCss(), $.each(), $.extend(), $.map() |
| [insertAdjacentElement](https://caniuse.com/#feat=insert-adjacent) | 6 | 48 | 4 | 3.1 | 3.2 | 2.3	  | .before(), .prepend(), .append(), .after() |
| [querySelectorAll](https://caniuse.com/#feat=queryselector) | 9 | 3.5 | 4	 | 3.1	  | 3.2 | 2.1	  | $()					|
| **Browser Support** 								| **11** | **48** | **31** | **7.1** | **8** | **4.4.4** |				|

Note: Whilst the code should support the specified browsers, the test suite has only been run in IE11, Edge, Firefox 55, Chrome 60, iOS 9.3, and Android 6. If you need specific browser support, please run the test suite in that browser to check compatibility (And report back any problems).
