var slides = [
	{ url: '#', title: 'Fire Twirling' },
	{ url: '#', title: 'Aerialists' },
	{ url: '#', title: 'Acrobalance' },
	{ url: '#', title: 'Belly Dancing' },
	{ url: '#', title: 'Clowns' }
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

		if (_this.current < _this.collection.length) {
			_this.current += 1;
		} else if (_this.current = _this.collection.length) {
			_this.current = 0;
		}

		_this.showNext();
	});

	this.el.on('click', '.arrow-right', function () {
		_this.hideCurrent();
		
		if (_this.current < _this.collection.length) {
			_this.current += 1;
		} else if (_this.current = 0) {
			_this.current = _this.collection.length;
		}

		_this.showNext();
	});
}

SliderView.prototype.hideCurrent = function () {
	// use this.current to hide the previous SliderImageView
	this.childViews[this.current].hide();
};

SliderView.prototype.showNext = function () {
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

	var sliderImages = this.el.find('.slider-images');

	this.collection.each(function (model) {
		var sliderImage = new SliderImageView(model);
		// Render each view
		sliderImage.render();
		// Append each view to .slider-images
		sliderImages.append(sliderImage.el);

		_this.childViews.push(sliderImage);
	});
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
	this.el.html('<h2>${title}</h2>');
	// add the background-image css property to this.el
	this.el.css('background-image', 'url("' + url + '")');
};

SliderImageView.prototype.hide = function () {
	// add a class to this.el? remove a class? fade manually?
	this.el.addClass('visible');
};

SliderImageView.prototype.show = function () {
	// add a class to this.el?
	this.el.removeClass('visible');
};

var sliderView = new SliderView(sliderCollection);

sliderView.render();

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


// // start the app!

// var slider = new SliderView(collection);

// slider.render();

// $('#slider-container').append(slider.el);