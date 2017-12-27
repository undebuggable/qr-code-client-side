//https://gruntjs.com/sample-gruntfile

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: ';'
            },
            dist: {
                // the files to concatenate
                //src: ['client/**/*.js'],
                src: [
                    'src/qr-generator.js',
                    'src/qr-config.js',
                    'src/qr-app.js'
                ],
                // the location of the resulting JS file
                //dest: 'static/<%= pkg.name %>.concat.js'
                dest: 'qr.max.js'
            }
        },
         uglify: {
             options: {
                 banner: '/*Paweł Owczarek*/\n/*Client side QR codes*/\n/*<%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %>*/\n'
             },
             dist: {
                 files: {
                     //'static/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                     'qr.js': ['<%= concat.dist.dest %>']
                 }
             }
         },
         jshint: {
             // define the files to lint
             files: ['Gruntfile.js', 'src/**/*.js'],
             // configure JSHint (documented at http://www.jshint.com/docs/)
             options: {
                 // more options here if you want to override JSHint defaults
                 globals: {
                     console: true,
                     module: true
                 }
             }
         }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
    //grunt.registerTask('default', ['concat', 'uglify']);
};
