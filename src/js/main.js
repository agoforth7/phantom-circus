var SlideModel = Backbone.Model.extend({});

var SlideCollection = Backbone.Collection.extend({
	model: SlideModel
});

var SliderView = Backbone.View.extend({

	className: 'slider',

	events: {
		'click .arrow-left': 'goBack',
		'click .arrow-right': 'goForward'
	},

	initialize: function () {
		this.current = 0;
		this.childViews = [];
		setInterval(this.goForward.bind(this), 7000);
	},

	render: function () {
		var _this = this;

		this.childViews = [];

		this.$el.html(this.template())

		var sliderImages = this.$('.slider-images');

		this.collection.each(function (model) {
			var sliderImage = new SliderImageView({ model: model });
			// Render each view
			sliderImage.render();
			// Hide them by default - should really do this in the CSS (.slider-image { display: none })
			sliderImage.hide();
			// Append each view to .slider-images
			sliderImages.append(sliderImage.$el);

			_this.childViews.push(sliderImage);
		});

		this.childViews[0].show();
	},

	template: function () {
		return `
			<h1 class="tagline">Pushing Boundaries</h1>
			<button class="see-show">See A Show</button>
			<div class="slider-images"></div>
			<img class="arrow-left" src="#">
			<img class="arrow-right" src="#">
		`;
	},

	goForward: function () {
		this.hideCurrent();

		if (this.current === this.collection.length - 1) {
			this.current = 0;
		} else {
			this.current++;
		}

		this.showNext();
	},

	goBack: function () {
		this.hideCurrent();

		if (this.current > 0) {
			this.current--;
		} else {
			this.current = this.collection.length - 1;
		}

		this.showNext();
	},

	hideCurrent: function () {
		// use this.current to hide the previous SliderImageView
		this.childViews[this.current].hide();
	},

	showNext: function () {
		// use this.current to show the next SliderImageView
		this.childViews[this.current].show();
	}

});

var SliderImageView = Backbone.View.extend({

	className: 'slider-image',

	initialize: function () {
		this.$el.css('background-image', 'url(' + this.model.get('url') + ')');
	},

	render: function () {
		this.$el.html(this.template({ title: this.model.get('title') }));
	},

	template: function (data) {
		return `<h2>${data.title}</h2>`;
	},

	show: function () {
		this.$el.fadeIn();
	},

	hide: function () {
		this.$el.fadeOut();
	}

});

var slides = [
	{ url: 'assets/images/carousel_poi_01.jpg', title: 'Fire Twirling' },
	{ url: 'assets/images/carousel_aerialists_01.jpg', title: 'Aerialists' },
	{ url: 'assets/images/carousel_acrobats_01.jpg', title: 'Acrobalance' },
	{ url: 'assets/images/carousel_belly_01.jpg', title: 'Belly Dancing' },
	{ url: 'assets/images/carousel_clown_01.jpg', title: 'Clowns' }
];

var collection = new SlideCollection(slides);

var app = new SliderView({ collection: collection });

app.render();

$('#slider-container').append(app.$el);

// console.log(sliderView.render());

// console.assert(app.current === 0);
// console.assert(app.childViews.length === 5);
// console.assert(app.$el.children().length === 5);

// app.$('.arrow-right').trigger('click');

// console.assert(app.current === 1);


// app.$('.arrow-left').trigger('click');

// console.assert(sliderView.current === 0);