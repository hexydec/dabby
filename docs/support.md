# Browser Support

This page describes browser support for the various components of Dabby.js:

| Feature											| IE	| FF	| Chrome | Safari | iOS | Android | Used in				|
|---------------------------------------------------|-------|-------|--------|--------|-----|---------|---------------------|
| [XMLHttpRequest](https://caniuse.com/#feat=xhr2)	| 10	| 12	| 31	 | 7.1	  | 8   | 4.4.4	  | $.ajax()			|
| [classList](https://caniuse.com/#feat=classlist)	| 10	| 26	| 28	 | 7	  | 7.1 | 4.4	  | $.fn.addClass(), $.fn.toggleClass, $.fn.removeClass(), $.fn.hasClass() |
| [getComputedStyle](https://caniuse.com/#feat=getcomputedstyle) | 9 | 4 | 11 | 5	  | 5.1 | 4		  | $.fn.css(), $.fn.offset(), $.fn.width(), $.fn.height(), $.fn.outerWidth(), $.fn.outerHeight(), $.fn.innerWidth(), $.fn.innerHeight()	|
| [dataset](https://caniuse.com/#feat=dataset)		| 11	| 6		| 7		 | 5.1	  | 5.1 | 3		  | $.fn.data()				|
| [getBoundingClientRect](https://caniuse.com/#feat=getboundingclientrect) | 9 | 12 | 4 | 4 | 4.1 | 2.3 | $.fn.offset()			|
| [addEventListener](https://caniuse.com/#feat=addeventlistener) | 9 | 7 | 4 | 3.1	  | 3.2 | 2.1	  | $(), $.ajax(), $.fn.on(), $.fn.one(), $.fn.off()		|
| [CustomEvent](https://caniuse.com/#feat=customevent) | 9\*	| 11	| 15	 | 6.1	  | 6.1 | 4.4	  | $.fn.trigger() |
| [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create) | 9* | 4 | 5 | 5 | Yes | Yes* | $.fn.offset() |
| [Object.create](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create) | 9 | 4 | 5 | 5 | Yes | Yes | $.fn.offset() |
| [Object.getPrototypeOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf) | 9 | 3.5 | 5 | 5 | Yes | Yes | $.isPlainObject() |
| [Object.keys](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) | 9 | 4 | 5 | 5 | Yes | Yes | setCss(), $.each(), $.extend(), $.map() |
| [insertAdjacentElement](https://caniuse.com/#feat=insert-adjacent) | 6 | 48 | 4 | 3.1 | 3.2 | 2.3	  | $.fn.before(), $.fn.prepend(), $.fn.append(), $.fn.after(), $.fn.replaceWith(), $.fn.replaceAll() |
| [querySelectorAll](https://caniuse.com/#feat=queryselector) | 9 | 3.5 | 4	 | 3.1	  | 3.2 | 2.1	  | $()					|
| **Browser Support** 								| **11** | **48** | **31** | **7.1** | **8** | **4.4.4** |				|

\*via polyfill

Note: Whilst the code should support the specified browsers, the test suite has only been run in IE11, Edge, Firefox 55, Chrome 60, iOS 9.3, and Android 6. If you need specific browser support, please run the test suite in that browser to check compatibility (And report back any problems).
