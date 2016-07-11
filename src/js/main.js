var slides = [
	{ url: 'assets/images/carousel_poi_01.jpg', title: 'Fire Twirling' },
	{ url: 'assets/images/carousel_aerialists_01.jpg', title: 'Aerialists' },
	{ url: 'assets/images/carousel_acrobats_01.jpg', title: 'Acrobalance' },
	{ url: 'assets/images/carousel_belly_01.jpg', title: 'Belly Dancing' },
	{ url: 'assets/images/carousel_clown_01.jpg', title: 'Clowns' }
];

var sliderCollection = new Backbone.Collection(slides);

function SliderView (collection) {
	var _this = this;

	this.el = $('<div></div>', {
		class: 'slider'
	});
	this.collection = collection;
	this.current = 0;

	this.el.on('click', '.arrow-left', function () {
		_this.hideCurrent();

		if (_this.current > 0) {
			_this.current--;
		} else {
			_this.current = _this.collection.length - 1;
		}

		_this.showNext();
	});

	this.el.on('click', '.arrow-right', this.cycle.bind(this));

	setInterval(this.cycle.bind(this), 7000);
}

SliderView.prototype.cycle = function () {
	this.hideCurrent();

	if (this.current === this.collection.length - 1) {
		this.current = 0;
	} else {
		this.current++;
	}

	this.showNext();
};

SliderView.prototype.hideCurrent = function () {
	// use this.current to hide the previous SliderImageView
	this.childViews[this.current].hide();
};

SliderView.prototype.showNext = function () {
	console.log(this.current);
	// use this.current to show the next SliderImageView
	this.childViews[this.current].show();
};

SliderView.prototype.render = function () {
	var _this = this;
	
	this.childViews = [];

	this.el.html(`
		<h1 class="tagline">Pushing Boundaries</h1>
		<button class="see-show">See A Show</button>
		<div class="slider-images"></div>
		<img class="arrow-left" src="#">
		<img class="arrow-right" src="#">
	`)

	// console.log(this.el);

	var sliderImages = this.el.find('.slider-images');

	this.collection.each(function (model) {
		var sliderImage = new SliderImageView(model);
		// Render each view
		sliderImage.render();
		// Hide them by default - should really do this in the CSS (.slider-image { display: none })
		sliderImage.hide();
		// Append each view to .slider-images
		sliderImages.append(sliderImage.el);

		_this.childViews.push(sliderImage);
	});

	this.childViews[0].show();

	// console.log(sliderImages);
};

function SliderImageView (model) {
	this.el = $('<div></div>', {
		class: 'slider-image'
	});

	this.model = model;

	this.el.on('click', '.see-show', function () {
		
	});
}

SliderImageView.prototype.render = function () {
	var url = this.model.get('url');
	var title = this.model.get('title');

	// create the children elements
	// set the title
	this.el.html(`<h2>${title}</h2>`);
	// add the background-image css property to this.el
	this.el.css('background-image', 'url(' + url + ')');
};

SliderImageView.prototype.hide = function () {
	this.el.hide();
	// add a class to this.el? remove a class? fade manually?
	// this.el.removeClass('visible');
	// this.el.addClass('hidden', {
	// 	visibility: 'hidden',
	// 	opacity: 0,
	// 	transition: visibility 0s 2s, opacity 2s linear
	// });
};

SliderImageView.prototype.show = function () {
	this.el.show();
	// add a class to this.el?
	// this.el.removeClass('hidden');
	// this.el.addClass('visible', {
	// 	visibility: 'visible',
	// 	opacity: 1,
	// 	transition: 'opacity 2s linear'
	// });
};

var sliderView = new SliderView(sliderCollection);

sliderView.render();

$('#slider-container').append(sliderView.el);

// console.log(sliderView.render());

console.assert(sliderView.current === 0);
console.assert(sliderView.childViews.length === 5);
console.assert(sliderView.el.children().length === 5);

sliderView.el
	.find('.arrow-right')
	.trigger('click');

console.assert(sliderView.current === 1);


sliderView.el
	.find('.arrow-left')
	.trigger('click');

// console.assert(sliderView.current === 0);