jquery.autocomplete_from_select.js
==================================

What is it?
-----------
I felt jQuery UI's autocomplete should be useable with a call like:
````javascript
  $('select').autocomplete_from_select(); 
````
So I made it happen. 

What does it do?
----------------
It uses the `option`s from the `select` elements to which it is applied as a datasource for jQuery UI's autocomplete.

It also takes a few liberties:

1. If you tab over without selecting an item, it will select the first item from the list of matches for you.
2. If you tab over and there were no matches, it clears the text field of input to make it clear no option was selected.
3. Comparisons are case-insensitive.
4. It hides the `select` element, and displays a text field for jQuery UI's autocomplete to take over.
5. It renames the `select` element to nothing, and uses it's name on a hidden `input` that gets submitted to the server instead.
6. It assumes your `select` elements have an `id` attribute.
7. It automatically shows all options onfocus when the field is blank.

How do I use it?
----------------
First you need to make sure you include jQuery and enough of jQuery UI to have autocomplete support. Then stick the file `jquery.autocomplete_from_select.js` in your project and load it as well.

To use it, the following would replace all selects on the page with an autocomplete field. You can change the selector 
to whatever you like to limit the applicability. 

````javascript
  $('select').autocomplete_from_select({
    'width': '95%', 
    'additional-match-attributes': []
  });
````

That shows the default options.

The `additional-match-attributes` option is an array of data attribute names you have in your select `option` tags in case you want to match on more than one attribute.

For example, if you have:

````html
  <select name="id">
    <option value="123" data-other-id="abc">Blam!</option>
  </select>
````

and set `additional-match-attributes` like this:

````javascript
  $('select').autocomplete_from_select({
    'width': '95%', 
    'additional-match-attributes': ['other-id']
  });
````

It will match the option shown above if the user starts typing "abc" or if the user starts typing "blam!"

By [Sammy Larbi](http://www.codeodor.com)
