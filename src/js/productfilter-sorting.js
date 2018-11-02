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
