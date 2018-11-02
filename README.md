# productfilter.js: Filter and sort a product list.

Filter and sort a list of flexible product cards.

Try the <a href="http://www.woollymittens.nl/default.php?url=useful-productfilter">demo</a>.

## How to include the script

The stylesheet is best included in the header of the document.

```html
<link rel="stylesheet" href="./css/productfilter.css"/>
```

This include can be added to the header or placed inline before the script is invoked.

```html
<script src="./js/productfilter.js"></script>
```

## How to start the script

```html
<form class="product-controls">
	<label>
		Sort:
		<select data-sort=".product-list" data-by="value">
			<option>---</option>
			<option value="h3">Alphabetical</option>
			<option value=".product-date" data-type="date">Date ascending</option>
			<option value=".product-date" data-type="date" data-direction="descending">Date descending</option>
			<option value=".product-author">Author</option>
			<option value=".product-rating dd" data-type="number" data-direction="descending">Rating</option>
		</select>
	</label>
	<label>Description: <input data-filter=".product-list" data-by="figcaption h3, figcaption p" type="text" placeholder="keyword" value=""/></label>
	<label>Authors: <select data-filter=".product-list" data-by=".product-author"></select></label>
	<label>Categories: <select data-filter=".product-list" data-by=".product-category dd"></select></label>
</form>
<ul class="product-list">
	<li>
		<figure class="product-card">
			<div class="product-photo"><img alt="" src="img/photo_0.jpg"/></div>
			<figcaption>
				<h3>North Era</h3>
				<p>Lorem ipsum dolor sit amet</p>
				<dl class="product-properties">
					<dt>Author:</dt><dd class="product-author">Lorem</dd>
					<dt>Date:</dt><dd class="product-date" data-value="3 Nov 2018">November 3rd 2018</dd>
				</dl>
				<dl class="product-rating">
					<dt>Rating:</dt><dd>8</dd>
				</dl>
				<dl class="product-category">
					<dt>Categories:</dt><dd>Coastal</dd><dd>Landscape</dd><dd>Water</dd>
				</dl>
			</figcaption>
		</figure>
	</li>
	...
</ul>
```

**'data-sort' : {CSS Rule}** - Parent element within to sort.

**'value' : {CSS Rule}** - The HTML element containing the value to sort by.

**'data-type' : {Keyword}** - Parse the data as date, number, or string.

**'data-direction' : {Keyword}** - Ascending or descending sort.

**'data-filter' : {CSS Rule}** - Parent element within to filter.

**'data-by' : {CSS rule}** - The HTML element containing the value to filter by.

**'data-value' : {string}** - Placeholder value (that's easier to parse).

```javascript
var productFilter = new ProductFilter({
	'sorters': document.querySelectorAll('[data-sort]'),
	'filters': document.querySelectorAll('[data-filter]'),
	'cards': '.product-list > li',
	'delay': 500
});
```

**'sorters' : {DOM nodes}** - Form elements that sort content.

**'filters' : {DOM nodes}** - Form elements that filter content.

**'cards' : {CSS rule}** - The affected product cards.

**'delay' : {Miliseconds}** - Time for animations to complete.

## How to control the script

TODO: External API calls.

## How to build the script

This project uses node.js from http://nodejs.org/

This project uses gulp.js from http://gulpjs.com/

The following commands are available for development:
+ `npm install` - Installs the prerequisites.
+ `gulp import` - Re-imports libraries from supporting projects to `./src/libs/` if available under the same folder tree.
+ `gulp dev` - Builds the project for development purposes.
+ `gulp dist` - Builds the project for deployment purposes.
+ `gulp watch` - Continuously recompiles updated files during development sessions.
+ `gulp serve` - Serves the project on a temporary web server at http://localhost:8500/.
+ `gulp php` - Serves the project on a temporary php server at http://localhost:8500/.

## License

This work is licensed under a Creative Commons Attribution 3.0 Unported License. The latest version of this and other scripts by the same author can be found at http://www.woollymittens.nl/
