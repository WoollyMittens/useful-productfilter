/*
	Source:
	van Creij, Maurice (2018). "productfilter.js: Filter and sort a product list.", http://www.woollymittens.nl/.

	License:
	This work is licensed under a Creative Commons Attribution 3.0 Unported License.
*/

// establish the class
var ProductFilter = function (config) {

	// PROPERTIES

	this.config = config;

	// CLASSES

	this.sorting = new this.Sorting(config, this);
	this.filtering = new this.Filtering(config, this);

	// METHODS

	// EVENTS

};

// return as a require.js module
if (typeof define != 'undefined') define([], function () { return ProductFilter });
if (typeof module != 'undefined') module.exports = ProductFilter;
