(function() {

	var
	root = document.getElementById('app'),
	ppu = 30,
	skipNoPrinters = true,
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
			style = 'width: ' + ratio.getExampleWidth(ppu) + 'px; height: ' + ratio.getExampleHeight(ppu) + 'px';

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

	},
	getNames = function() {

		Object.entries(variants).forEach(function([key, item]) {

			var
			name = item.getName();

			console.log([name, key].join(' > '));

		});

	};

	// test();
	render();
	// getNames();

})();
