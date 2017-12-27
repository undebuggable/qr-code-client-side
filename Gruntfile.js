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
                    'client/analyze-dom-config.js',
                    'client/analyze-dom-ui.js',
                    'client/analyze-dom-app.js'
                ],
                // the location of the resulting JS file
                dest: 'static/<%= pkg.name %>.concat.js'
            }
        },
         uglify: {
             options: {
                 banner: '/*Paweł Owczarek*/\n/*Analyze DOM*/\n/*<%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %>*/\n'
             },
             dist: {
                 files: {
                     'static/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                 }
             }
         },
         jshint: {
             // define the files to lint
             files: ['Gruntfile.js', 'client/**/*.js', 'server/**/*.js'],
             // configure JSHint (documented at http://www.jshint.com/docs/)
             options: {
                 // more options here if you want to override JSHint defaults
                 globals: {
                     jQuery: true,
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
