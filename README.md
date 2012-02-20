# jQuery-toCurrency

Easily convert numbers to formatted currencies with jQuery. If you've ever used Rails' number_to_currency you will find this familiar.


## Usage

This plugin basically implements two methods:

* `$.toCurrency(number, [options])` - accepts a number (String or Number) and, optionally, some configuration options. Returns a string containing the number formatted as a currency.
* `$(selector).toCurrency([options])` - called on a jQuery selection, it interprets the element(s) `text()` as a number, and applies formatting to it.


### Examples

```javascript
	$.toCurrency(1000); // returns "€ 1,000.00"
```

or

```html
	<span class="price">10000</span>
	<script>
		$(".price").toCurrency(); // $(".price").text() will now be "€ 10,000.00"
	</script>
```


## Options

Both methods accept an object with configuration options as the last argument. The complete list with default values is the following:

```javascript
	$(selector).toCurrency({
		precision: 2,           // decimal precision
		delimiter: ",",         // thousands delimiter
		separator: ".",         // decimal separator
		unit: "&euro;",         // unit
		format: "%u %n",        // format. %u is the placeholder for the unit, %n for the number
		negativeFormat: false   // format for negative numbers. If false, id defaults to the same format as positive numbers
	});
```