(function() {

	var app = {
		init: function () { // Инициализация
            app.eventListeners();
            app.modules();
            app.vars.curData = app.vars.defaults; // Текущие свойства по умолчанию
            app.changeCSSBlock(); // Запуск функции обновление CSS
            app.changeHTMLBlock(); // Запуск функции обновление HTML
            app.wells();
		},
        vars: {
            text: "Button",
            class: "button",
            objects: {
                $uiSlider: $('.ui-slider'),
                $uiSelect: $('.ui-select'),
                $uiColor: $('.ui-color'),
                $uiShadow: $('.ui-shadow'),
                $uiCheckbox: $('.checkbox'),
                $uiText: $('.ui-text'),
                $uiClass: $('.ui-class'),

                $wells: $('.well'),

                $resultBtn: $('.result-btn'),
                $resultHTMLBlock: $('#result-html'),
                $resultCSSBlock: $('#result-css'),

                $uiBtn: $('.button'),
                $buttonStyles: $('.button-styles'),


                $formSubmit: $('.form-email')
            },
            defaults: {       // Значения по умолчанию
                'border-radius': '8px',
                'border': '1px solid #000',
                'padding': '10px',
                'font-size': '16px',
                'background': '#eee',
                'color': '#000'
            },
            helpers: {
                paddingX: '10px',         // Ширина отступы
                paddingY: '10px',         // Высота отступы
                borderR : '8px',          // Радиус границы
                borderW : '1px',          // Ширина границы
                borderS : 'solid',        // Тип границы
                borderC : '#000',         // Цвет границы
                fontSz : '16px',          // шрифт размер
                fontC : '#fff',           // шрифт цвет
                backgroundC : '#eee',  // Фон цвет
                backgroundGs : '#0F8BFF', // Начало цвета градиента
                backgroundGe : '#F7FF00', // Конец цвета градиента
                backgroundGor : 'to top', // Ориентация градиента
                backgroundGsp : '50%',     // Начало позиции градиента
                backgroundGep : '50%',   // Конец Позиции градиента
                gradientOn:    false      // Статус градиента
            },
            curData: {},     // Текущие значения
        },
        modules: function() { // Инициализация ползунков, колорпикеров
            var $min,$max,$def,$css,$unit;
            app.vars.objects.$uiSlider.each(function() {
                $(this).slider({
                    min: $(this).data('min'), max: $(this).data('max'), value: $(this).data('def'),
                    slide: function(event, ui) {
                        $unit = $(this).data('unit');
                        $unit == undefined ? $unit = "px": $unit = $unit;
                        if(ui.value == 0) {
                            app.vars.helpers[$(this).data('css')] = 0;
                        } else {
                            app.vars.helpers[$(this).data('css')] = ui.value + $unit;
                        }
                        $(this).find('span').html(app.vars.helpers[$(this).data('css')]);
                        app.fontSize();   // Обновление Размера шрифта
                        app.buttonBorder();   // Обновление стиля границы
                        app.buttonPaddings(); // Обновление данных об отступах
                        app.changeCSSBlock(); // Обновление CSS кода
                    }
                })
            });
            app.vars.objects.$uiSelect.each(function() {
                var $css  = $(this).data('css');
                $(this).change(function() { // Граница Стиль
                    app.vars.helpers[$css] = $(this).val(); // Значение стиля границы
                    app.buttonBorder();   // Обновление стиля границы
                    app.changeCSSBlock(); // Обновление CSS кода
                })
            })

            // ColorPickers
            app.vars.objects.$uiColor.each(function() {
                var $this = $(this),
                    $css  = $this.data('css');
                $this.ColorPicker({ // Кнопка цвет границы
                    color: app.vars.curData['background-color'], // Цвет по умолчанию
                    onChange: function (hsb, hex) {
                        $this.css('backgroundColor', '#' + hex);
                        app.vars.helpers[$css] = '#' + hex;
                        app.buttonColors();   // Обновление стиля границы
                        app.buttonBorder();   // Обновление стиля границы
                        app.changeCSSBlock(); // Обновление CSS кода
                    }
                });
            });
        },

        eventListeners: function() {
            app.vars.objects.$uiText.keyup(function() { // Текст кнопки
                app.vars.text = $(this).val();
                app.changeHTMLBlock();
                app.changeBtn();
            });
            app.vars.objects.$uiClass.keyup(function() {
                if($(this).val() == '') {
                    app.vars.class = 'button'
                } else {
                    app.vars.class = $(this).val()
                }
                app.changeHTMLBlock(); // Обновление HTML кода
                app.changeCSSBlock(); // Обновление CSS кода
                app.changeBtn();
            });
            app.vars.objects.$uiCheckbox.each(function() {
                var $helper = $(this).data('helper'),
                    $toggle = $(this).data('toggle'),
                    $toggle2 = $(this).data('toggle2'),
                    $status = '';
                $(this).change(function() {
                    $(this).next('div').toggle();
                    $($toggle).slideToggle();
                    $($toggle2).slideToggle();
                    app.vars.helpers[$helper] == true ? app.vars.helpers[$helper] = false: app.vars.helpers[$helper] = true;
                    app.changeCSSBlock(); // Обновление CSS кода
                })
            });

            app.vars.objects.$formSubmit.submit(function() {
                app.sendEmail();
                return false;
            })
        },

        fontSize: function() {  // Функция обновления размера шрифта
            app.vars.curData['font-size'] = app.vars.helpers.fontSz;
        },

        buttonColors: function() { // Обновление цветов(Фон/Текст)

            app.vars.curData['background'] = app.vars.helpers.backgroundC;

            app.vars.curData['color'] = app.vars.helpers.fontC;
        },

        buttonGradient: function() {
            return [
                "-o-linear-gradient(" + app.vars.helpers.backgroundGor +", " + app.vars.helpers.backgroundGs + ' ' + app.vars.helpers.backgroundGsp + ', ' + app.vars.helpers.backgroundGe + ' ' + app.vars.helpers.backgroundGep + " )",
                "-moz-linear-gradient(" + app.vars.helpers.backgroundGor +", " + app.vars.helpers.backgroundGs + ' ' + app.vars.helpers.backgroundGsp + ', ' + app.vars.helpers.backgroundGe + ' ' + app.vars.helpers.backgroundGep + " )",
                "-webkit-linear-gradient(" + app.vars.helpers.backgroundGor +", " + app.vars.helpers.backgroundGs + ' ' + app.vars.helpers.backgroundGsp + ', ' + app.vars.helpers.backgroundGe + ' ' + app.vars.helpers.backgroundGep + " )",
                "linear-gradient(" + app.vars.helpers.backgroundGor +", " + app.vars.helpers.backgroundGs + ' ' + app.vars.helpers.backgroundGsp + ', ' + app.vars.helpers.backgroundGe + ' ' + app.vars.helpers.backgroundGep + " )"
            ]
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
                app.vars.curData['border-radius'] = false; // Убираем свойство border-radius в CSS
            } else {
                app.vars.curData['border-radius'] = app.vars.helpers.borderR;
            }

            if(app.vars.helpers.borderW == 0) { // Если значение ширины границы == 0
                app.vars.curData['border'] = app.vars.helpers.borderW;
            } else {
                app.vars.curData['border'] = app.vars.helpers.borderW + ' ' + app.vars.helpers.borderS + ' ' + app.vars.helpers.borderC;
            }

        },

        textShadow: function() {

        },
        changeHTMLBlock: function() { // обновление текста кнопки
            app.vars.objects.$resultHTMLBlock.text('<button class="' + app.vars.class + '">'+ app.vars.text +'</button>'); // Обновляет html Блок
            app.vars.objects.$resultBtn.html('<button class="' + app.vars.class + '">'+ app.vars.text +'</button>'); // Обновляет Кнопку html
            app.vars.objects.$uiBtn.text(app.vars.text); // Обновляет текст кнопки
            Prism.highlightAll();
        },
        changeCSSBlock: function() { // обновление css кнопки
            var outputCSS = '';
            outputCSS += '.'+ app.vars.class +' {\n'
            $.each(app.vars.curData, function(index, element) { // проходимся по всем свойствам
                if(element !== false) {                          // если значение != false
                    if(index == 'background' && app.vars.helpers.gradientOn == true) { // Если свойство Background и градиент включен
                        for(i=0; i<4; i++) {
                            outputCSS += '\t' + index + ': ' + app.buttonGradient()[i] + '; \n'; // используем свойство
                        }
                    }
                    else {
                        outputCSS += '\t' + index + ': ' + element + '; \n'; // используем свойство
                    }
                }
            });
            outputCSS += '}';
            app.vars.objects.$resultCSSBlock.text(outputCSS);
            app.vars.objects.$buttonStyles.html(outputCSS);
            Prism.highlightAll();
        },
        wells: function() {
            var $wellP = [], $wellC = [];
            app.vars.objects.$wells.each(function(index) {
                $wellP[index] = $('p', $(this)).first();
                $wellC[index] = $('.container-fluid', $(this));
                $wellP[index].click(function() {
                    $('.container-fluid').slideUp();
                    $wellC[index].slideDown();
                })
            })
        },

        sendEmail: function() {
            var html = app.vars.objects.$resultBtn.html(),
                css  = app.vars.objects.$buttonStyles.html(),
                email = app.vars.objects.$formSubmit.find('input').val();
            $.ajax( {
                type: 'POST',
                url: 'mailer.php',
                dataType: 'json',
                data: {
                    html: html,
                    css: css,
                    email: email
                },
                success: function(data) {
                    alert(data.msg);
                }
            })
        }


	};

	app.init();

}());