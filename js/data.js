(function() {

	function Ratio(long, short, example) {

		this.long = long;
		this.short = short;
		this.multiplier = (long/short);
		this.example = example;
		this.variants = [];

	};
	Ratio.prototype.getName = function() {

		var
		name = [this.long, this.short].join(':');

		return name;

	};
	Ratio.prototype.getLongSide = function(short) {

		return (short*this.multiplier);

	};
	Ratio.prototype.getShortSide = function(long) {

		return (long/this.multiplier);

	};
	Ratio.prototype.getExampleWidth = function(ppu) {

		return (ppu*(this.long*this.variants[this.example].variant));

	};
	Ratio.prototype.getExampleHeight = function(ppu) {

		return (ppu*(this.short*this.variants[this.example].variant));

	};
	Ratio.prototype.setVariant = function(variant) {

		this.variants.push(variant);
		return this;

	};

	function Variant(ratio, variant) {

		this.ratio = ratio;
		this.variant = variant;
		this.short = (this.ratio.short*this.variant);
		this.long = this.ratio.getLongSide(this.short);
		this.printers = [];

	};
	Variant.prototype.getSize = function() {

		var
		landscape = [this.long, this.short].join('x');

		return landscape;

	};
	Variant.prototype.getName = function() {

		return this.getSize();

	};
	Variant.prototype.setPrinter = function(id) {

		this.printers.push(printers[id]);
		return this;

	};
	Variant.prototype.getPrinters = function() {

		var
		out = '';

		this.printers.forEach(function(printer) {

			out += ROCK.STRING.replacer('<a href="{link}" class="printer">{name}</a> ', {
				link: printer.getLink(),
				name: printer.getName()
			});

		});

		return out;

	};
	Variant.prototype.getPrintersCount = function() {

		return this.printers.length;

	};

	function Printer(name, url) {

		this.name = name;
		this.url = url;

	};
	Printer.prototype.getLink = function() {

		return this.url;

	};
	Printer.prototype.getName = function() {

		return this.name;

	};

	var
	ratios = window.ratios = {},
	printers = window.printers = {},
	variants = window.variants = {},
	makeRatio = function(id, long, short, example) {

		ratios[id] = new Ratio(long, short, example);
		return ratios[id];

	},
	makePrinter = function(id, name, url) {

		printers[id] = new Printer(name, url);
		return printers[id];

	},
	makeVariant = function(id, ratio, variant) {

		variants[id] = new Variant(ratios[ratio], variant);
		ratios[ratio].setVariant(variants[id]);
		return variants[id];

	},
	setPrinter = function(variant, printer) {

		variants[variant].printers.push(printers[printer]);

	};

	makePrinter('jessops', 'jessops', 'https://photo.jessops.com');
	makePrinter('snapfish', 'snapfish', 'https://snapfish.com');
	makePrinter('truprint', 'truprint', 'https://truprint.co.uk');
	makePrinter('boots', 'boots photo', 'https://bootsphoto.com');
	makePrinter('photobox', 'photobox', 'https://photobox.co.uk');
	makePrinter('tesco', 'tesco photo', 'https://tescophoto.com');
	makePrinter('asda', 'asda photo', 'https://asda-photo.co.uk');
	makePrinter('sixbyfourprints', 'sixbyfourprints', 'http://sixbyfourprints.com');
	makePrinter('sevenbyfiveprints', 'sevenbyfiveprints', 'http://sevenbyfiveprints.com');
	makePrinter('eightbysixprints', 'eightbysixprints', 'http://eightbysixprints.com');

	makeRatio('three_two', 3, 2, 0);
	makeVariant('6x4', 'three_two', 2);
	setPrinter('6x4', 'jessops');
	setPrinter('6x4', 'photobox');
	setPrinter('6x4', 'truprint');
	setPrinter('6x4', 'boots');
	setPrinter('6x4', 'snapfish');
	setPrinter('6x4', 'tesco');
	setPrinter('6x4', 'asda');
	makeVariant('9x6', 'three_two', 3);
	setPrinter('9x6', 'jessops');
	setPrinter('9x6', 'asda');
	makeVariant('12x8', 'three_two', 4);
	setPrinter('12x8', 'jessops');
	setPrinter('12x8', 'truprint');
	setPrinter('12x8', 'boots');
	setPrinter('12x8', 'tesco');
	setPrinter('12x8', 'asda');
	makeVariant('15x10', 'three_two', 5);
	makeVariant('18x12', 'three_two', 6);
	setPrinter('18x12', 'asda');
	makeVariant('30x20', 'three_two', 10);
	setPrinter('30x20', 'asda');
	makeVariant('36x24', 'three_two', 12);
	setPrinter('36x24', 'asda');

	makeRatio('seven_five', 7, 5, 0);
	makeVariant('7x5', 'seven_five', 1);
	setPrinter('7x5', 'jessops');
	setPrinter('7x5', 'photobox');
	setPrinter('7x5', 'truprint');
	setPrinter('7x5', 'tesco');
	setPrinter('7x5', 'boots');
	setPrinter('7x5', 'snapfish');
	setPrinter('7x5', 'asda');
	makeVariant('14x10', 'seven_five', 2);
	makeVariant('21x15', 'seven_five', 3);
	makeVariant('28x20', 'seven_five', 4);

	makeRatio('four_three', 4, 3, 0);
	makeVariant('8x6', 'four_three', 2);
	setPrinter('8x6', 'jessops');
	setPrinter('8x6', 'photobox');
	setPrinter('8x6', 'snapfish');
	setPrinter('8x6', 'truprint');
	setPrinter('8x6', 'boots');
	setPrinter('8x6', 'tesco');
	setPrinter('8x6', 'asda');
	makeVariant('12x9', 'four_three', 3);
	makeVariant('16x12', 'four_three', 4);
	setPrinter('16x12', 'asda');
	makeVariant('20x15', 'four_three', 5);

	makeRatio('five_four', 5, 4, 0);
	makeVariant('10x8', 'five_four', 2);
	setPrinter('10x8', 'jessops');
	setPrinter('10x8', 'photobox');
	setPrinter('10x8', 'truprint');
	setPrinter('10x8', 'snapfish');
	setPrinter('10x8', 'boots');
	setPrinter('10x8', 'tesco');
	setPrinter('10x8', 'asda');
	makeVariant('15x12', 'five_four', 3);
	makeVariant('20x16', 'five_four', 4);
	setPrinter('20x16', 'asda');
	makeVariant('25x20', 'five_four', 5);

	makeRatio('five_three', 5, 3, 0);
	makeVariant('5x3', 'five_three', 1);
	makeVariant('10x6', 'five_three', 2);
	makeVariant('15x9', 'five_three', 3);
	makeVariant('20x12', 'five_three', 4);

	makeRatio('two_one', 2, 1, 0);
	makeVariant('2x1', 'two_one', 1);
	makeVariant('4x2', 'two_one', 2);
	makeVariant('6x3', 'two_one', 3);
	makeVariant('8x4', 'two_one', 4);

	makeRatio('six_five', 6, 5, 0);
	makeVariant('12x10', 'six_five', 2);
	setPrinter('12x10', 'asda');

	makeRatio('square', 1, 1, 1);
	makeVariant('4x4', 'square', 4);
	setPrinter('4x4', 'snapfish');
	setPrinter('4x4', 'boots');
	setPrinter('4x4', 'truprint');
	setPrinter('4x4', 'asda');
	makeVariant('5x5', 'square', 5);
	setPrinter('5x5', 'photobox');
	setPrinter('5x5', 'snapfish');
	setPrinter('5x5', 'boots');
	setPrinter('5x5', 'truprint');
	setPrinter('5x5', 'asda');
	makeVariant('6x6', 'square', 6);
	setPrinter('6x6', 'asda');
	makeVariant('8x8', 'square', 8);
	setPrinter('8x8', 'photobox');
	setPrinter('8x8', 'snapfish');
	setPrinter('8x8', 'boots');
	setPrinter('8x8', 'truprint');
	setPrinter('8x8', 'asda');
	makeVariant('10x10', 'square', 10);
	setPrinter('10x10', 'asda');
	makeVariant('12x12', 'square', 12);
	setPrinter('12x12', 'asda');
	makeVariant('16x16', 'square', 16);
	setPrinter('16x16', 'jessops');
	setPrinter('16x16', 'asda');
	makeVariant('20x20', 'square', 20);
	setPrinter('20x20', 'asda');
	makeVariant('24x24', 'square', 24);
	setPrinter('24x24', 'jessops');
	makeVariant('32x32', 'square', 32);
	setPrinter('32x32', 'jessops');

	makeRatio('sixteen_nine', 16, 9, 0);
	makeVariant('16x9', 'sixteen_nine', 1);
	makeVariant('32x18', 'sixteen_nine', 2);
	makeVariant('48x27', 'sixteen_nine', 3);
	makeVariant('64x36', 'sixteen_nine', 4);

	console.log(printers);
	console.log(ratios);
	console.log(variants);

})();
