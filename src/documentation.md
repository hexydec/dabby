# Dabby.js Documentation

The library supports the following methods:

| Method				| Notes														|
|-----------------------|-----------------------------------------------------------|
| **Ajax**																			|
|-----------------------|-----------------------------------------------------------|
| $.ajax()				| Make AJAX requests										|
| $.get()				| Shorthand to make AJAX requests using the GET method		|
| $.getScript()			| Shorthand to insert a script into the DOM					|
| $.load()				| Make an AJAX request to insert HTML it into the DOM		|
| $.post()				| Shorthand to make AJAX requests using the POST method		|
| $.fn.serialize()		| Serialize the value of form elements into a query string	|
|-----------------------|-----------------------------------------------------------|
| **Attributes**																	|
|-----------------------|-----------------------------------------------------------|
| $.fn.attr()			| Get/set HTML attributes									|
| $.fn.addClass()		| Add a class to an HTML element							|
| $.fn.removeClass()	| Remove a class from an HTML element						|
| $.fn.toggleClass()	| Toggle a class on and off									|
| $.fn.css()			| Get/set CSS attributes									|
| $.fn.data()			| Get/set data attributes									|
| $.fn.hasClass()		| See whether an HTML element has the requested class		|
| $.fn.prop()			| Get/set HTML properties									|
| $.fn.val()			| Get/set form control values								|
|-----------------------|-----------------------------------------------------------|
| **Core**																			|
|-----------------------|-----------------------------------------------------------|
| $.each()				| Apply a callback function to an array or object			|
| $.fn.each()			| Apply a callback function to a dabby object				|
| $.isArray()			| Determine whether the input is an array					|
| $.isFunction()		| Determine whether the input is an function				|
| $.isWindow()			| Determine whether the input node/object is the window		|
| $.map()				| Map a callback function onto each item in an array/object	|
| $.param()				| Render a query string from an array						|
|-----------------------|-----------------------------------------------------------|
| **Dimensions**																	|
|-----------------------|-----------------------------------------------------------|
| $.fn.offset()			| Get/set the top and left position							|
| $.fn.offsetParent()	| Get the offset parent of the first node					|
| $.fn.scrollLeft()		| Get/set the scrollLeft attribute							|
| $.fn.scrollTop()		| Get/set the scrollTop attribute							|
| $.fn.width()			| Get/set the width of a set of elements					|
| $.fn.height()			| Get/set the height of a set of elements					|
| $.fn.innerWidth()		| Get/set the width of a set of elements including padding	|
| $.fn.innerHeight()	| Get/set the height of a set of elements including padding	|
| $.fn.outerWidth()		| Get/set the width of elements including padding/margin	|
| $.fn.outerHeight()	| Get/set the height of elements including padding/margin	|
|-----------------------|-----------------------------------------------------------|
| **Events**																		|
|-----------------------|-----------------------------------------------------------|
| $.fn.on()				| Attach a callback to an event on elements or their parents|
| $.fn.one()			| Attach a callback to an event to be triggered only once	|
| $.fn.off()			| Remove a callback attached with $.fn.on()/$.fn.one()		|
| $.fn.trigger()		| Trigger an event on the supplied nodes					|
| $.fn.focusin()		| Trigger the focusin event on the supplied nodes			|
| $.fn.focusout()		| Trigger the focusout event on the supplied nodes			|
| $.fn.focus()			| Trigger the focus event on the supplied nodes				|
| $.fn.blur()			| Trigger the blur event on the supplied nodes				|
| $.fn.load()			| Trigger the load event on the supplied nodes				|
| $.fn.scroll()			| Trigger the scroll event on the supplied nodes			|
| $.fn.unload()			| Trigger the unload event on the supplied nodes			|
| $.fn.resize()			| Trigger the resize event on the supplied nodes			|
| $.fn.click()			| Trigger the click event on the supplied nodes				|
| $.fn.dblclick()		| Trigger the dblclick event on the supplied nodes			|
| $.fn.mousedown()		| Trigger the mousedown event on the supplied nodes			|
| $.fn.mouseup()		| Trigger the mouseup event on the supplied nodes			|
| $.fn.mousemove()		| Trigger the mousemove event on the supplied nodes			|
| $.fn.mouseover()		| Trigger the mouseover event on the supplied nodes			|
| $.fn.mouseout()		| Trigger the mouseout event on the supplied nodes			|
| $.fn.mouseenter()		| Trigger the mouseenter event on the supplied nodes		|
| $.fn.mouseleave()		| Trigger the mouseleave event on the supplied nodes		|
| $.fn.change()			| Trigger the change event on the supplied nodes			|
| $.fn.select()			| Trigger the select event on the supplied nodes			|
| $.fn.keydown()		| Trigger the keydown event on the supplied nodes			|
| $.fn.keypress()		| Trigger the keypress event on the supplied nodes			|
| $.fn.keyup()			| Trigger the keyup event on the supplied nodes				|
| $.fn.error()			| Trigger the error event on the supplied nodes				|
| $.fn.submit()			| Trigger the submit event on the supplied nodes			|
|-----------------------|-----------------------------------------------------------|
| **Manipulation**																	|
|-----------------------|-----------------------------------------------------------|
| $.fn.clone()			| Clone a collection										|
| $.fn.empty()			| Empty a set of DOM nodes of content/HTML					|
| $.fn.html()			| Get/set the innerHTML property of a collection			|
| $.fn.before()			| Insert HTML before each item in a collection				|
| $.fn.prepend()		| Insert HTML as the first child of each item				|
| $.fn.append()			| Insert HTML as the last child of each item				|
| $.fn.after()			| Insert HTML before each item in a collection				|
| $.fn.insertBefore()	|															|
| $.fn.prependTo()		|															|
| $.fn.appendTo()		|															|
| $.fn.insertAfter()	|															|
| $.fn.remove()			|															|
| $.fn.detach()			|															|
| $.fn.slice()			|															|
| $.fn.text()			|															|
| $.fn.unwrap()			|															|
| $.fn.wrap()			|															|
| $.fn.wrapAll()		|															|
|-----------------------|-----------------------------------------------------------|
| **Traversal**																		|
|-----------------------|-----------------------------------------------------------|
| $.fn.add()			|															|
| $.fn.children()		|															|
| $.fn.eq()				|															|
| $.fn.filter()			|															|
| $.fn.not()			|															|
| $.fn.find()			|															|
| $.fn.first()			|															|
| $.fn.has()			|															|
| $.fn.index()			|															|
| $.fn.is()				|															|
| $.fn.has()			|															|
| $.fn.next()			|															|
| $.fn.nextAll()		|															|
| $.fn.nextUntil()		|															|
| $.fn.prev()			|															|
| $.fn.prevAll()		|															|
| $.fn.prevUntil()		|															|
| $.fn.parent()			|															|
| $.fn.parents()		|															|
| $.fn.parentsUntil()	|															|
| $.fn.siblings()		|															|
|-----------------------|-----------------------------------------------------------|
