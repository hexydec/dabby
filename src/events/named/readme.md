# Named Events

This module adds named methods for a number of common events:

- .blur()
- .change()
- .click()
- .contextmenu()
- .dblclick()
- .error()
- .focusin()
- .focusout()
- .focus()
- .keydown()
- .keypress()
- .keyup()
- .mousedown()
- .mouseup()
- .mousemove()
- .mouseover()
- .mouseout()
- .mouseenter()
- .mouseleave()
- .resize()
- .scroll()
- .select()
- .submit()
- .unload()

Using these methods is equivalent to the following code:

```javascript
$(selector).trigger("[insert event here]"); // trigger an event
$(selector).on("[insert event here]", callback); // bind event to callback
```

## Usage

```javascript
$(selector).click(); // trigger a click
$(selector).click(callback); // attach a click event with a callback
$(selector).click(data, callback); // attach a click event with data
```

### callback

A callback fuunction to execute when the event is triggered.

### data

Any data to pass to the callback.

## Differences to jQuery

None.
