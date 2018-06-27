(function() {

	/*

	21/1.4 is is 15 on any other calculator
	15.000000000000002

	tests: [2, 2.5, 3, 3.5, 4]
	halves also work for three_two, which some printers offer

	*/

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
	Ratio.prototype.getExampleWidth = function() {

		return (ppu*(this.long*this.variants[this.example].variant));

	};
	Ratio.prototype.getExampleHeight = function() {

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
	root = document.getElementById('app'),
	ppu = 30,
	skipNoPrinters = true,
	ratios = window.ratios = {},
	printers = {},
	variants = window.variants = {},
	tests = [
		'three_two',
		'seven_five',
		'four_three',
		'five_four',
		'six_five',
		// 'sixteen_nine',
		// 'five_three',
		// 'two_one',
		'square'
	],
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

	},
	render = function() {

		var
		out = '';

		tests.forEach(function(test) {

			var
			ratio = ratios[test],
			name = ratio.getName(),
			template = '\
			<div class="group">\
				<div class="example" style="{style}"><span>{name}</span></div>\
				<h2 class="name">{name}</h2>\
				<div class="sizes">{items}</div>\
			</div>',
			items = '',
			style = 'width: ' + ratio.getExampleWidth() + 'px; height: ' + ratio.getExampleHeight() + 'px';

			ratio.variants.forEach(function(variant) {

				var
				printers = variant.getPrintersCount();

				if(skipNoPrinters&&printers===0) {
					return;
				};

				items += ROCK.STRING.replacer('<div class="size">{size} ({printers} printers)</div>', {
					size: variant.getSize(),
					printers: printers
				});

			});

			template = ROCK.STRING.replacer(template, {
				name: name,
				items: items,
				style: style
			});

			out += template;

		});

		root.innerHTML = out;

	},
	test = function() {

		tests.forEach(function(test) {

			var
			ratio = ratios[test],
			name = ratio.getName();

			console.group(name);

			ratio.variants.forEach(function(variant) {

				console.log(variant.getLongSide());

			});

			console.groupEnd(name);

		});

	};

	makeRatio('three_two', 3, 2, 0);
	makeRatio('seven_five', 7, 5, 0);
	makeRatio('four_three', 4, 3, 0);
	makeRatio('five_three', 5, 3, 0);
	makeRatio('five_four', 5, 4, 0);
	makeRatio('two_one', 2, 1, 0);
	makeRatio('six_five', 6, 5, 0);
	makeRatio('square', 1, 1, 1);
	makeRatio('sixteen_nine', 16, 9, 0);

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

	makeVariant('sixbyfour', 'three_two', 2);
	makeVariant('ninebysix', 'three_two', 3);
	makeVariant('twelevebyeight', 'three_two', 4);
	makeVariant('eighteenbytweleve', 'three_two', 5);
	makeVariant('thirtybytwenty', 'three_two', 6);
	makeVariant('thirtysixbytwentyfour', 'three_two', 6);

	setPrinter('sixbyfour', 'jessops');
	setPrinter('sixbyfour', 'photobox');
	setPrinter('sixbyfour', 'truprint');
	setPrinter('sixbyfour', 'boots');
	setPrinter('sixbyfour', 'snapfish');
	setPrinter('sixbyfour', 'tesco');
	setPrinter('sixbyfour', 'asda');

	makeVariant('sevenbyfive', 'seven_five', 1);

	makeVariant('eightbysix', 'four_three', 2);

	ratios.three_two.setVariant(3).setPrinter('jessops').setPrinter('asda');
	ratios.three_two.setVariant(4).setPrinter('jessops').setPrinter('truprint').setPrinter('boots').setPrinter('tesco').setPrinter('asda');
	ratios.three_two.setVariant(5);
	ratios.three_two.setVariant(6).setPrinter('asda');
	ratios.three_two.setVariant(10).setPrinter('asda');
	ratios.three_two.setVariant(12).setPrinter('asda');

	ratios.seven_five.setVariant(1).setPrinter('jessops').setPrinter('photobox').setPrinter('truprint').setPrinter('tesco').setPrinter('boots').setPrinter('snapfish').setPrinter('asda');
	ratios.seven_five.setVariant(2);
	ratios.seven_five.setVariant(3);
	ratios.seven_five.setVariant(4);

	ratios.four_three.setVariant(2).setPrinter('jessops').setPrinter('photobox').setPrinter('snapfish').setPrinter('truprint').setPrinter('boots').setPrinter('tesco').setPrinter('asda');
	ratios.four_three.setVariant(3);
	ratios.four_three.setVariant(4).setPrinter('asda');
	ratios.four_three.setVariant(5);

	ratios.five_four.setVariant(2).setPrinter('jessops').setPrinter('photobox').setPrinter('truprint').setPrinter('snapfish').setPrinter('boots').setPrinter('tesco').setPrinter('asda');
	ratios.five_four.setVariant(3);
	ratios.five_four.setVariant(4).setPrinter('asda');
	ratios.five_four.setVariant(5);

	ratios.five_three.setVariant(1);
	ratios.five_three.setVariant(2);
	ratios.five_three.setVariant(3);
	ratios.five_three.setVariant(4);

	ratios.two_one.setVariant(1);
	ratios.two_one.setVariant(2);
	ratios.two_one.setVariant(3);
	ratios.two_one.setVariant(4);

	ratios.six_five.setVariant(2).setPrinter('asda');

	ratios.square.setVariant(4).setPrinter('snapfish').setPrinter('boots').setPrinter('truprint').setPrinter('asda');
	ratios.square.setVariant(5).setPrinter('photobox').setPrinter('snapfish').setPrinter('boots').setPrinter('truprint').setPrinter('asda');
	ratios.square.setVariant(6).setPrinter('asda');
	ratios.square.setVariant(8).setPrinter('photobox').setPrinter('snapfish').setPrinter('boots').setPrinter('truprint').setPrinter('asda');
	ratios.square.setVariant(10).setPrinter('asda');
	ratios.square.setVariant(12).setPrinter('asda');
	ratios.square.setVariant(16).setPrinter('jessops').setPrinter('asda');
	ratios.square.setVariant(20).setPrinter('asda');
	ratios.square.setVariant(24).setPrinter('jessops');
	ratios.square.setVariant(32).setPrinter('jessops');

	ratios.sixteen_nine.setVariant(1);
	ratios.sixteen_nine.setVariant(2);
	ratios.sixteen_nine.setVariant(3);
	ratios.sixteen_nine.setVariant(4);

	// test();
	render();

	// console.log(ratios);

})();
