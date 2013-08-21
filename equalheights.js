(function ($) {
	"use strict";

	function applyHeights(elems) {
		var height = -1;

		$(elems).each(function() {
			if ($(this).outerHeight() > height) {
				height = $(this).outerHeight();
			}
		});

		$(elems).each(function() {
			$(this).css('min-height', height);
		});
	}

	function getColumns($targets) {
		var offset = -1,
			columns,
			currentOffset; 

		for (columns = 0; columns < $targets.length; columns += 1) {
			currentOffset = $($targets[columns]).offset().top;

			if(currentOffset > offset && offset !== -1) {
				return columns;
			}

			offset = currentOffset;
		}
		return columns;
	}

	var equalHeights = function ($elems) {
		$elems.each(function (index, elem) {
			var $elem = $(elem),
				targetDiv = '.' + $elem.data('equalHeightsTarget'),
				$targets,
				setHeights;

			$targets = $(targetDiv, $elem);

			setHeights = function () {
				var columns = getColumns($targets),
					i;
				// reset min-height
				$targets.css('min-height', '0');

				if(columns > 1) {
					for(i = 0; i < Math.ceil($targets.length / columns); i += 1) {
						applyHeights($targets.slice(columns * i, (columns * i) + columns));
					}
				}
			};
			
			$(window).resize(setHeights);
			setHeights();
		});
	};

	return equalHeights($('.equal-heights'));
	
})(jQuery);

