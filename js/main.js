(function() {

	var app = {
		init: function () { // Инициализация
            app.eventListeners();
            app.modules();
            app.vars.curData = app.vars.defaults; // Текущие свойства по умолчанию
            app.changeCSSBlock(); // Запуск функции обновление CSS
            app.changeHTMLBlock(); // Запуск функции обновление HTML
		},
        vars: {
            text: "Button",
            class: "button",
            objects: {
                $uiSlider: $('.ui-slider'),
                $uiBorderRadius: $('.ui-radius'),
                $uiBorderWidth: $('.ui-border_width'),
                $uiBorderStyle: $('.ui-border_style'),
                $uiBorderColor: $('.ui-border_color'),
                $uiPaddingY: $('.ui-padding_y'),
                $uiPaddingX: $('.ui-padding_x'),
                $uiBgColor: $('.ui-background_color'),
                $uiFontColor: $('.ui-font_color'),
                $uiText: $('.ui-text'),
                $uiClass: $('.ui-class'),


                $resultBtn: $('.result-btn'),
                $resultHTMLBlock: $('#result-html'),
                $resultCSSBlock: $('#result-css'),

                $uiBtn: $('.button'),
                $buttonStyles: $('.button-styles')
            },
            defaults: {       // Значения по умолчанию
                'border-radius': '8px',
                'border': '1px solid #000',
                'padding': '10px',
                'font-size': '16px',
                'background-color': '#272822',
                'color': '#fff'
            },
            helpers: {
                paddingX: 0,
                paddingY: 0,
                borderR : 0,
                borderW : 0,
                borderS : 'solid',
                borderC : '#eee',
                fontSz : 0
            },
            curData: {},     // Текущие значения
        },
        modules: function() { // Инициализация ползунков, колорпикеров
            app.vars.objects.$uiSlider.each(function() {
                var $min = $(this).data('min'),
                   $max = $(this).data('max'),
                   $css = $(this).data('css');

                $(this).slider({
                    min: $min, max: $max,
                    slide: function(event, ui) {
                        if(ui.value == 0) {
                            app.vars.helpers[$css] = 0;
                        } else {
                            app.vars.helpers[$css] = ui.value + 'px';
                        }
                        app.fontSize();   // Обновление Размера шрифта
                        app.buttonBorder();   // Обновление стиля границы
                        app.buttonPaddings(); // Обновление данных об отступах
                        app.changeCSSBlock(); // Обновление CSS кода
                    }
                })
            });
            app.vars.objects.$uiBorderStyle.change(function() { // Граница Стиль
                app.vars.helpers.borderS = $(this).val(); // Значение стиля границы
                app.buttonBorder();   // Обновление стиля границы
                app.changeCSSBlock(); // Обновление CSS кода
            })

            // ColorPickers
            app.vars.objects.$uiBorderColor.ColorPicker({ // Кнопка цвет границы
                color: app.vars.curData['background-color'], // Цвет по умолчанию
                onChange: function (hsb, hex, rgb) {
                    app.vars.objects.$uiBorderColor.css('backgroundColor', '#' + hex);
                    app.vars.helpers.borderC = '#' + hex;
                    app.buttonBorder();   // Обновление стиля границы
                    app.changeCSSBlock(); // Обновление CSS кода
                }
            });
            app.vars.objects.$uiBgColor.ColorPicker({ // Кнопка фон Колорпикер
                color: app.vars.curData['background-color'], // Цвет по умолчанию
                onChange: function (hsb, hex, rgb) {
                    app.vars.objects.$uiBgColor.css('backgroundColor', '#' + hex);
                    app.vars.curData['background-color'] = '#' + hex;
                    app.changeCSSBlock(); // Обновление CSS кода
                }
            });
            app.vars.objects.$uiFontColor.ColorPicker({ // Кнопка цвет текста Колорпикер
                color: app.vars.curData['color'], // Цвет по умолчанию
                onChange: function (hsb, hex, rgb) {
                    app.vars.objects.$uiFontColor.css('backgroundColor', '#' + hex);
                    app.vars.curData['color'] = '#' + hex;
                    app.changeCSSBlock(); // Обновление CSS кода
                }
            });
        },

        eventListeners: function() {
            app.vars.objects.$uiText.keyup(function() {
                app.vars.text = $(this).val();
                app.changeHTMLBlock();
                app.changeBtn();
            });
            app.vars.objects.$uiClass.keyup(function() {
                app.vars.class = $(this).val();
                app.changeHTMLBlock();
                app.changeCSSBlock();
                app.changeBtn();
            });
        },

        fontSize: function() {  // Функция обновления размера шрифта
            app.vars.curData['font-size'] = app.vars.helpers.fontSz;
        },
        buttonPaddings: function() { // Функция обновления ширины и высоты (отступы)
            if(app.vars.helpers.paddingY == 0 && app.vars.helpers.paddingX == 0) { // Если значение ширины == 0 и значение высоты  == 0
                app.vars.curData['padding'] = false; // Убираем свойство padding в CSS
            } else if(app.vars.helpers.paddingY === app.vars.helpers.paddingX) {
                app.vars.curData['padding'] = app.vars.helpers.paddingY;
            } else {
                app.vars.curData['padding'] = app.vars.helpers.paddingY + ' ' + app.vars.helpers.paddingX;
            }
        },

        buttonBorder: function() { // Функция обновления границы(Border)

            if(app.vars.helpers.borderR == 0) { // Если значение радиуса границы == 0
                app.vars.curData['border'] = false; // Убираем свойство border-radius в CSS
            } else {
                app.vars.curData['border-radius'] = app.vars.helpers.borderR;
            }

            if(app.vars.helpers.borderW == 0) { // Если значение ширины границы == 0
                app.vars.curData['border'] = false; // Убираем свойство border в CSS
            } else {
                app.vars.curData['border'] = app.vars.helpers.borderW + ' ' + app.vars.helpers.borderS + ' ' + app.vars.helpers.borderC;
            }
        },

        changeHTMLBlock: function() { // обновление текста кнопки
            app.vars.objects.$resultHTMLBlock.text('<button class="' + app.vars.class + '">'+ app.vars.text +'</button>'); // Обновляет html Блок
            app.vars.objects.$resultBtn.html('<button class="' + app.vars.class + '">'+ app.vars.text +'</button>'); // Обновляет Кнопку html
            app.vars.objects.$uiBtn.text(app.vars.text); // Обновляет текст кнопки
            Prism.highlightAll();
        },
        changeCSSBlock: function() {
            var outputCSS = '';
            outputCSS += '.'+ app.vars.class +' {\n'
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