(function() {

	var app = {
		init: function () {
			$( ".slider" ).slider({ animate: "fast" });
            $('.ui-radius').slider({
                min: 0,
                max: 50,
                slide: function(event, ui) {
                    $('.changed').html(ui.value);
                }
            });
            $('.ui-border_size').slider({
                min: 0,
                max: 50,
                slide: function(event, ui) {
                    $('.changed').html(ui.value);
                }
            });
            $('.ui-padding_x').slider({
                min: 0,
                max: 50,
                slide: function(event, ui) {
                    $('.changed').html(ui.value);
                }
            });
            $('.ui-padding_y').slider({
                min: 0,
                max: 50,
                slide: function(event, ui) {
                    $('.changed').html(ui.value);
                }
            });
		}
	};

	app.init();

}());