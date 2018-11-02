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
		var keyword, keywords = [];
		var tags = document.querySelectorAll(filter.getAttribute('data-filter') + ' ' + filter.getAttribute('data-by'));
		// create a key for each tag
		for (var a = 0, b = tags.length; a < b; a += 1) {
			keyword = tags[a].textContent;
			if (keywords.indexOf(keyword) < 0) keywords.push(keyword);
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
			option.textContent = keywords[c];
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
