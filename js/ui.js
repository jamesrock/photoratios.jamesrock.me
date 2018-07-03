(function() {

	var
	root = document.getElementById('app'),
	ppu = 30,
	skipNoPrinters = true,
	tests = [
		'3:2',
		'7:5',
		'4:3',
		'5:4',
		'6:5',
		// '16:9',
		// '5:3',
		// '2:1',
		'1:1'
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
			width = ratio.getExampleWidth(ppu),
			height = ratio.getExampleHeight(ppu),
			style = `width: ${width}px; height: ${height}px`;

			ratio.variants.forEach(function(variant) {

				var
				printers = variant.getPrintersCount(),
				size = variant.getSize();

				if(skipNoPrinters&&printers===0) {
					return;
				};

				items += ROCK.STRING.replacer('<div class="size">{size} ({printers} printers)</div>', {
					size,
					printers
				});

			});

			template = ROCK.STRING.replacer(template, {
				name,
				items,
				style
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

			if(name!==key) {
				console.log([key, name].join(' > '));
			};

		});

	};

	// test();
	render();
	getNames();

})();
