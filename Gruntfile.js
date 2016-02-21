module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig ({

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['build', 'build/js']
        },

        concat: {
            'test-assets': {
                src: [
                    'third-party/bootstrap-3.1.1-dist/css/bootstrap.min.css',
                    'third-party/font-awesome-4.0.3/css/font-awesome.min.css',
                    'css/*.css'
                ],
                dest: 'build/css/styles.css'
            }
        },

        replace: {
            replaceHtml: {
                src: ['index.html'],
                dest: 'build/',
                replacements: [{
                    from: /<script([^<]*)<\/script>/g,
                    to: ''
                }, {
                    from: /<link([^<]*)>/g,
                    to: ''
                }, {
                    from: '<!-- Angular js file -->',
                    to: '<script src="js/angular.js"></script>'
                }, {
                    from: '<!-- Develop js file -->',
                    to: '<script src="js/scripts.js"></script><script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDBbPzFEwNVTHNoZ-bz7YYqO1eMRPqTyUA&signed_in=true&libraries=places&maxResults=10"async defer></script>'
                }, {
                    from: '<!-- Develop css file -->',
                    to: '<link rel="stylesheet" type="text/css" href="css/styles.css">'
                }]
            }
        },

        uglify: {
            dist: {
                options: {
                    mangle: false,
                    compress: false,
                    beautify: true
                },
                files: {
                    'build/js/scripts.js': [
                        'js/*.js',
                        'language/*.js',
                        'third-party/bootstrap-3.1.1-dist/js/bootstrap.min.js',
                        'js/angular-resource/angular-resource.min.js', 
                        'js/angular-route/angular-route.min.js',
                        'third-party/angular-animate/angular-animate.min.js', 
                        'third-party/angular-bootstrap/ui-bootstrap.min.js', 
                        'angular/**/*.js', 
                        'angular/app.js'
                    ]
                }
            }
        },
        // used to copy the please wait into the folder so we can render it first
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        cwd: 'third-party/',
                        src: 'please-wait/build/*',
                        dest: 'build/js/please-wait/'
                    }
                ]
                
            }
        }

    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks ('grunt-contrib-jshint');
    grunt.loadNpmTasks ('grunt-contrib-clean');
    grunt.loadNpmTasks ('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks ('grunt-angular-builder');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Test tasks below can also be executed with the command line option `--build debug` to generate debug builds.


    grunt.registerTask ('release', ['clean', 'jshint', 'concat', 'replace', 'angular-builder', 'uglify', 'copy']);
    grunt.registerTask ('debug', ['clean', 'concat', 'uglify', 'copy']);

};