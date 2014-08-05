// Обязательная обёртка
module.exports = function(grunt) {

    // Задачи
    grunt.initConfig({
        // Склеиваем
        concat: {
            main: {
                src: [
                    'js/vendor/jquery-ui.min.js',
                    'js/vendor/jquery.*.js',
                    'js/*.js'  // Все JS-файлы в папке
                ],
                dest: 'js/build/scripts.js'
            }
        },
        // Сжимаем
        uglify: {
            main: {
                files: {
                    // Результат задачи concat
                    'js/build/scripts.min.js': '<%= concat.main.dest %>'
                }
            }
        },
        watch: {
            concat: {
                files: '<%= concat.main.src %>',
                tasks: ['concat', 'uglify']  // Можно несколько: ['lint', 'concat']
            }
        }
    });

    // Загрузка плагинов, установленных с помощью npm install
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Задача по умолчанию
    grunt.registerTask('default', ['concat', 'uglify', 'watch']);
};