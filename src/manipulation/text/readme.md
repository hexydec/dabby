# .text()
Retrieves the text from all items in the collection, or sets the text content on each item in the collection.

## Usage
```javascript
$(selector).text();
$(selector).text(text);
```

### text
A string of text, or a function that returns a string.

## Returns
When getting text: A string containing the combined text of all elements in the collection.

When setting text: The original Dabby collection.

## Differences to jQuery
None.

## Examples
This will retrieve the text content of the `<p>` element:

```javascript
const myText = $("p").text();
console.log(myText);
```

This will set the text content of the `<h2>` element to "New Title".

```javascript
$("h2").text("New Title");
```

Set the text using a function, this will set the text of each `<li>` element to include its index and its original text.

```javascript
$("li").text((i, value) => "Item " + (i + 1) + ": " + value);
```