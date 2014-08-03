(function() {

	var app = {
		init: function () { // Инициализация
            app.eventListeners();
            app.modules();
            app.vars.curData = app.vars.defaults; // Текущие свойства по умолчанию
		},
        modules: function() { // Инициализация ползунков, колорпикеров
            app.vars.objects.$uiBorderRadius.slider({ // Border-radius Ползунок
                min: 0, max: 50,
                slide: function(event, ui) {
                    if(ui.value == 0) {
                        app.vars.curData['border-radius'] = false;
                    } else {
                        app.vars.curData['border-radius'] = ui.value + 'px';
                    }
                    app.changeCSSBlock();
                }
            });
            app.vars.objects.$uiBorderWidth.slider({ // Border-width Ползунок
                min: 0, max: 50,
                slide: function(event, ui) {
                    $('.changed').html(ui.value);
                }
            });
            $('.ui-padding_x').slider({ // Ширина (paddings) -- Ползунок
                min: 0, max: 50,
                slide: function(event, ui) { // При изменении ползунка
                    app.vars.helpers.paddingX = ui.value; // Горизонтальный отступ равен значению ползунка
                    app.buttonPaddings(); // Обновление данных об отступах
                    app.changeCSSBlock(); // Обновление CSS кода
                }
            });
            $('.ui-padding_y').slider({ // Высота (paddings) -- Ползунок
                min: 0, max: 50,
                slide: function(event, ui) {
                    app.vars.helpers.paddingY = ui.value; // Вертикальный отступ равен значению ползунка
                    app.buttonPaddings(); // Обновление данных об отступах
                    app.changeCSSBlock(); // Обновление CSS кода
                }
            });
            app.vars.objects.$uiBgColor.ColorPicker({ // Кнопка фон Ползунок
                color: '#0000ff', // Цвет по умолчанию
                onChange: function (hsb, hex, rgb) {
                    $('.ui-background_color').css('backgroundColor', '#' + hex);
                }
            });
        },
        vars: {
            objects: {
                $uiBorderRadius: $('.ui-radius'),
                $uiBorderWidth: $('.ui-border_width'),
                $uiBgColor: $('.ui-background_color'),
                $uiBgColor: $('.ui-font_color'),
                $uiText: $('.ui-text'),

                $resultHTMLBlock: $('#result-html'),
                $resultCSSBlock: $('#result-css'),

                $uiBtn: $('.button'),
                $buttonStyles: $('.button-styles')
            },
            defaults: {       // Значения по умолчанию
                'border-radius': '8px',
                'border': '1px solid #000',
                'padding': '5px',
                'font-size': '16px'
            },
            helpers: {
                paddingX: 0,
                paddingY: 0
            },
            curData: {},     // Текущие значения
            values: {
                $borderRadius: '',
                $borderWidth: '',
                $paddingX: '',
                $paddingY: ''
            }
        },

        eventListeners: function(prop, value) {
            app.vars.objects.$uiText.keydown(function() {
                app.changeHTMLBlock($(this).val());
                app.changeBtn();
            });
            app.changeCSSBlock();
        },

        buttonPaddings: function() { // Функция обновления ширины и высоты (отступы)
            if(app.vars.helpers.paddingY == 0 && app.vars.helpers.paddingX == 0) { // Если значение ширины == 0 и значение высоты  == 0
                app.vars.curData['padding'] = false; // Убираем свойство padding в CSS
            } else {
                app.vars.curData['padding'] = app.vars.helpers.paddingY + 'px ' + app.vars.helpers.paddingX + 'px';
            }
        },

        changeHTMLBlock: function(value) {
            app.vars.objects.$resultHTMLBlock.text('<button>'+ value +'</button>');
            Prism.highlightAll();
        },
        changeCSSBlock: function() {
            var outputCSS = '';
            outputCSS += '.button {\n'
            $.each(app.vars.curData, function(index, element) {
                if(element != false) {
                    outputCSS += '\t' + index + ': ' + element + '; \n';
                }
            });
            outputCSS += '}';
            app.vars.objects.$resultCSSBlock.text(outputCSS);
            app.vars.objects.$buttonStyles.html(outputCSS);
            Prism.highlightAll();
        },
        changeBtn: function() {

        }


	};

	app.init();

}());