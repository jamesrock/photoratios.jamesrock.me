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
	Variant.prototype.setPrinter = function(printer) {

		this.printers.push(printer);
		printer.setVariant(this);
		return this;

	};

	function Printer(name, url) {

		this.name = name;
		this.url = url;
		this.variants = [];

	};
	Printer.prototype.getLink = function() {

		return this.url;

	};
	Printer.prototype.getName = function() {

		return this.name;

	};
	Printer.prototype.setVariant = function(variant) {

		this.variants.push(variant);
		return this;

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

		variants[variant].setPrinter(printers[printer]);
		return variants[variant];

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

	makeRatio('3:2', 3, 2, 0);
	makeVariant('6x4', '3:2', 2);
	setPrinter('6x4', 'jessops');
	setPrinter('6x4', 'photobox');
	setPrinter('6x4', 'truprint');
	setPrinter('6x4', 'boots');
	setPrinter('6x4', 'snapfish');
	setPrinter('6x4', 'tesco');
	setPrinter('6x4', 'asda');
	makeVariant('9x6', '3:2', 3);
	setPrinter('9x6', 'jessops');
	setPrinter('9x6', 'asda');
	makeVariant('12x8', '3:2', 4);
	setPrinter('12x8', 'jessops');
	setPrinter('12x8', 'truprint');
	setPrinter('12x8', 'boots');
	setPrinter('12x8', 'tesco');
	setPrinter('12x8', 'asda');
	makeVariant('15x10', '3:2', 5);
	setPrinter('15x10', 'boots');
	makeVariant('18x12', '3:2', 6);
	setPrinter('18x12', 'asda');
	setPrinter('18x12', 'boots');
	makeVariant('30x20', '3:2', 10);
	setPrinter('30x20', 'asda');
	setPrinter('30x20', 'boots');
	makeVariant('36x24', '3:2', 12);
	setPrinter('36x24', 'asda');

	makeRatio('7:5', 7, 5, 0);
	makeVariant('7x5', '7:5', 1);
	setPrinter('7x5', 'jessops');
	setPrinter('7x5', 'photobox');
	setPrinter('7x5', 'truprint');
	setPrinter('7x5', 'tesco');
	setPrinter('7x5', 'boots');
	setPrinter('7x5', 'snapfish');
	setPrinter('7x5', 'asda');
	makeVariant('14x10', '7:5', 2);
	makeVariant('21x15', '7:5', 3);
	makeVariant('28x20', '7:5', 4);

	makeRatio('4:3', 4, 3, 0);
	makeVariant('8x6', '4:3', 2);
	setPrinter('8x6', 'jessops');
	setPrinter('8x6', 'photobox');
	setPrinter('8x6', 'snapfish');
	setPrinter('8x6', 'truprint');
	setPrinter('8x6', 'boots');
	setPrinter('8x6', 'tesco');
	setPrinter('8x6', 'asda');
	makeVariant('12x9', '4:3', 3);
	makeVariant('16x12', '4:3', 4);
	setPrinter('16x12', 'asda');
	makeVariant('20x15', '4:3', 5);
	makeVariant('40x30', '4:3', 10);

	makeRatio('5:4', 5, 4, 0);
	makeVariant('10x8', '5:4', 2);
	setPrinter('10x8', 'jessops');
	setPrinter('10x8', 'photobox');
	setPrinter('10x8', 'truprint');
	setPrinter('10x8', 'snapfish');
	setPrinter('10x8', 'boots');
	setPrinter('10x8', 'tesco');
	setPrinter('10x8', 'asda');
	makeVariant('15x12', '5:4', 3);
	makeVariant('20x16', '5:4', 4);
	setPrinter('20x16', 'boots');
	setPrinter('20x16', 'asda');
	makeVariant('25x20', '5:4', 5);

	makeRatio('5:3', 5, 3, 0);
	makeVariant('5x3', '5:3', 1);
	makeVariant('10x6', '5:3', 2);
	makeVariant('15x9', '5:3', 3);
	makeVariant('20x12', '5:3', 4);

	makeRatio('2:1', 2, 1, 0);
	makeVariant('2x1', '2:1', 1);
	makeVariant('4x2', '2:1', 2);
	makeVariant('6x3', '2:1', 3);
	makeVariant('8x4', '2:1', 4);

	makeRatio('6:5', 6, 5, 0);
	makeVariant('12x10', '6:5', 2);
	setPrinter('12x10', 'asda');

	makeRatio('1:1', 1, 1, 1);
	makeVariant('4x4', '1:1', 4);
	setPrinter('4x4', 'snapfish');
	setPrinter('4x4', 'boots');
	setPrinter('4x4', 'truprint');
	setPrinter('4x4', 'asda');
	makeVariant('5x5', '1:1', 5);
	setPrinter('5x5', 'photobox');
	setPrinter('5x5', 'snapfish');
	setPrinter('5x5', 'boots');
	setPrinter('5x5', 'truprint');
	setPrinter('5x5', 'asda');
	makeVariant('6x6', '1:1', 6);
	setPrinter('6x6', 'asda');
	makeVariant('8x8', '1:1', 8);
	setPrinter('8x8', 'photobox');
	setPrinter('8x8', 'snapfish');
	setPrinter('8x8', 'boots');
	setPrinter('8x8', 'truprint');
	setPrinter('8x8', 'asda');
	makeVariant('10x10', '1:1', 10);
	setPrinter('10x10', 'asda');
	makeVariant('12x12', '1:1', 12);
	setPrinter('12x12', 'asda');
	makeVariant('16x16', '1:1', 16);
	setPrinter('16x16', 'jessops');
	setPrinter('16x16', 'asda');
	makeVariant('20x20', '1:1', 20);
	setPrinter('20x20', 'asda');
	makeVariant('24x24', '1:1', 24);
	setPrinter('24x24', 'jessops');
	makeVariant('32x32', '1:1', 32);
	setPrinter('32x32', 'jessops');

	makeRatio('16:9', 16, 9, 0);
	makeVariant('16x9', '16:9', 1);
	makeVariant('32x18', '16:9', 2);
	makeVariant('48x27', '16:9', 3);
	makeVariant('64x36', '16:9', 4);

	console.log(printers);
	console.log(ratios);
	console.log(variants);

})();
