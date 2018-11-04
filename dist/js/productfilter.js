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
if (typeof module !== 'undefined') {
	exports = module.exports = ProductFilter;
}

// extend the class
ProductFilter.prototype.Filtering = function(config, context) {

  // PROPERTIES

  this.config = config;
  this.allStates = / product-hiding| product-hidden| product-showing| product-shown/g;
  this.shownStates = / product-showing| product-shown/g;
  this.hiddenStates = / product-hiding| product-hidden/g;

  // METHODS

  this.setupFilters = function() {
		var filters = this.config.filters;
		var options;
		// for every filter
		for (var a = 0, b = filters.length; a < b; a += 1) {
			// if the filter is empty, prefill the options from the data set
			options = filters[a].getElementsByTagName('option');
			if (options.length === 0) this.prefillFilters(filters[a]);
			// add the event listener
			filters[a].addEventListener('change', this.performFiltering.bind(this, filters[a]));
		}
	};

	this.prefillFilters = function(filter) {
		// get the filter keywords from the document
		var keyword, keywords = [], count = {};
		var tags = document.querySelectorAll(filter.getAttribute('data-filter') + ' ' + filter.getAttribute('data-by'));
		// create a key for each tag
		for (var a = 0, b = tags.length; a < b; a += 1) {
			keyword = tags[a].textContent;
			if (keywords.indexOf(keyword) < 0) {
        keywords.push(keyword);
        count[keyword] = 1;
      } else {
        count[keyword] += 1;
      }
		}
		// sort the keywords
		keywords.sort();
		// add the default option
		var option = document.createElement('option');
		option.value = '';
		option.textContent = '---';
		filter.appendChild(option);
		// for each keyword
		for (var c = 0, d = keywords.length; c < d; c += 1) {
			// create an option in the filter
			option = document.createElement('option');
			option.value = '^' + keywords[c] + '$';
			option.textContent = keywords[c] + '(' + count[keywords[c]] + ')';
			filter.appendChild(option);
		}
	};

	this.performFiltering = function(filter) {
		// reset all states
		var cards = document.querySelectorAll(this.config.cards);
		for (var a = 0, b = cards.length; a < b; a += 1) {
			cards[a].className = cards[a].className.replace(this.allStates, '') + ' product-showing';
		}
		// add each filter layer
		var filters = this.config.filters;
		for (var a = 0, b = filters.length; a < b; a += 1) {
			this.addFilter(filters[a]);
		}
	};

	this.addFilter = function(filter) {
		// for all cards
		var tags, matches, completed;
		var cards = document.querySelectorAll(this.config.cards);
		var rule = filter.getAttribute('data-by');
		var value = new RegExp(filter.value, 'i');
		var completed;
		for (var a = 0, b = cards.length; a < b; a += 1) {
			// get the tags from the card
			matches = false;
			tags = cards[a].querySelectorAll(rule);
			for (var c = 0, d = tags.length; c < d; c += 1) {
				// remember if a tag matches the keyword
				matches = value.test(tags[c].textContent) || matches || (filter.value == '');
			}
			// hide or show the card based on the match
			if (!matches) cards[a].className = cards[a].className.replace(this.allStates, '') + ' product-hiding';
			// handle the end of the animation
			completed = this.completeTransition.bind(this, cards[a]);
			cards[a].style.transitionDuration = this.config.delay + 'ms';
			setTimeout(completed, this.config.delay);
			// cards[a].ontransitionend = completed;
		}
	};

	this.completeTransition = function(card, evt) {
		console.log('completeTransition', evt);
		card.className = (this.shownStates.test(card.className))
			? card.className.replace(this.shownStates, '') + ' product-shown'
			: card.className.replace(this.hiddenStates, '') + ' product-hidden'
	};

  // EVENTS

  this.setupFilters();

};

// extend the class
ProductFilter.prototype.Sorting = function(config, context) {

	// PROPERTIES

	this.config = config;

	// METHODS

	this.setupSorters = function() {
		var sorters = this.config.sorters;
		// for every sorter
		for (var a = 0, b = sorters.length; a < b; a += 1) {
			// add the event listener
			sorters[a].addEventListener('change', this.performSorting.bind(this, sorters[a]));
		}
	};

	this.cardValues = function(cards, rule, type) {
		var tag, value, values = [];
		for (var a = 0, b = cards.length; a < b; a += 1) {
			// get the tag containing the value
			tag = cards[a].querySelector(rule);
			// retrieve the value
			if (tag) { value = tag.getAttribute('data-value') || tag.textContent; }
			else { value = 'a'; }
			// process the value
			switch(type) {
				case 'number': value = parseFloat(value); break;
				case 'date': value = new Date(value); break;
				default: value = value.trim();
			}
			// store the value
			values.push({
				'value': value,
				'card': cards[a]
			});
		}
		return values;
	};

	this.performSorting = function(sorter, evt) {
		// pick a sorting method
		var rule = sorter.value;
		var type = sorter.options[sorter.selectedIndex].getAttribute('data-type') || 'string';
		var direction = (sorter.options[sorter.selectedIndex].getAttribute('data-direction') == 'descending') ? -1 : 1;
		// sort all cards
		var cards = document.querySelectorAll(this.config.cards);
		var sortable = this.cardValues(cards, rule, type);
		// sort the results
		sortable.sort(function(a, b) {return (a.value < b.value) ? -direction : direction;});
		console.log('sorted', type, direction, sortable);
		// for all results
		for (var c = 0, d = sortable.length; c < d; c += 1) {
			// apply the sort order
			sortable[c].card.style.order = c;
		}
	};

	// EVENTS

	this.setupSorters();

};
