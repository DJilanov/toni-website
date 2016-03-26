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

        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'build/',
                    src: 'css/styles.css',
                    dest: 'build/css/'
                }]
            }
        },

        uglify: {
            dist: {
                options: {
                    mangle: true,
                    compress: true
                },
                files: {
                    'build/js/scripts.js': [
                        'js/angular.min.js',
                        'js/*.js',
                        'language/*.js',
                        'third-party/bootstrap-3.1.1-dist/js/bootstrap.min.js',
                        'js/angular-resource/angular-resource.min.js', 
                        'js/angular-route/angular-route.min.js',
                        'third-party/angular-animate/angular-animate.min.js',
                        'third-party/angular-bootstrap/ui-bootstrap.min.js',
                        'third-party/angular-bootstrap/ui-bootstrap-tpls.min.js',
                        'angular/carousel/carousel.js',  
                        'angular/cart/cart.js',  
                        'angular/contacts/contacts.js',  
                        'angular/header/header.js',  
                        'angular/home/home.js',  
                        'angular/login/login.js',  
                        'angular/order/order.js',  
                        'angular/product/product.js',  
                        'angular/view/view.js', 
                        'angular/modal/modal.js', 
                        'angular/**/*.js',  
                        '!angular/app.js',
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
                        dest: 'build/please-wait/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        cwd: './',
                        src: 'img/*',
                        dest: 'build/img/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        cwd: './',
                        src: 'package.json',
                        dest: 'build/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        cwd: './',
                        src: 'robots.txt',
                        dest: 'build/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        cwd: './',
                        src: 'sitemap.xml',
                        dest: 'build/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        cwd: './',
                        src: 'README.md',
                        dest: 'build/'
                    },
                    {
                        expand: true,
                        flatten: false,
                        cwd: './angular/',
                        src: '*/views/*.html',
                        dest: 'build/angular/'
                    },
                    {
                        expand: true,
                        flatten: false,
                        cwd: './third-party/bootstrap-3.1.1-dist/fonts/',
                        src: '*.*',
                        dest: 'build/fonts/'
                    }
                ]
                
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
                    from: '<!-- Develop js file -->',
                    to: '<script src="./please-wait/please-wait.min.js"></script>'+
                        '<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDBbPzFEwNVTHNoZ-bz7YYqO1eMRPqTyUA"></script>'+
                        '<script async defer src="https://www.google.com/recaptcha/api.js?onload=vcRecaptchaApiLoaded&render=explicit&hl=bg"></script>'+
                        '<script src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-56c639435b6223f9"></script>'+
                        '<script src="./js/scripts.js"></script>' +
                        '<script> window.loading_screen.finish(); </script>'+
                        '<script>'+
                        "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o), m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m) })(window,document,'script','//www.google-analytics.com/analytics.js','ga'); ga('create', 'UA-74039352-1', 'auto'); ga('set', 'userId', 'storeUser'); ga('send', 'pageview'); </script>"+
                        '<scripttype="application/ld+json">{"@context":"http://schema.org","@type":"Organization","name":"Жиланов ЕООД","alternateName":"Онлайн магазин на Жиланов ЕООД","url":"http://www.jilanov.eu","logo":"http://www.jilanov.eu/img/logo2.png","contactPoint":[{"@type":"ContactPoint","telephone":"+359878466180","contactType":"sales","areaServed":"BG","availableLanguage":["Bulgarian","English"]}],"sameAs":["https://www.facebook.com/Jilanovltd"],"address":{"@type":"PostalAddress","streetAddress":"Bulgaria, Sofia, Levski G","addressLocality":"Sofia","addressRegion":"Sofia","postalCode":"1836","addressCountry":"BG"},"potentialAction":{"@type":"SearchAction","target":"https://jilanov.eu/#/search?q={search_term_string}","query-input":"required name=search_term_string"}}</script><scripttype="application/ld+json">{"@context":"http://schema.org","@type":"Store","@id":"http://jilanov.eu","name":"Жиланов ЕООД","address":{"@type":"PostalAddress","streetAddress":"Bulgaria, Sofia, Levski G","addressLocality":"Sofia","addressRegion":"Sofia","postalCode":"1836","addressCountry":"BG"},"geo":{"@type":"GeoCoordinates","latitude":42.711330,"longitude":23.375995}}    </script>'
                }, {
                    from: '<!-- Develop css file -->',
                    to: '<link rel="stylesheet" type="text/css" href="./css/styles.css">'+
                        '<link rel="stylesheet" type="text/css" href="./please-wait/please-wait.css">'+
                        '<link rel="shortcut icon" href="./img/logo2.png" />'+
                        '<link rel="alternate" hreflang="bg" href="http://jilanov.eu"/>'
                }]
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
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Test tasks below can also be executed with the command line option `--build debug` to generate debug builds.

    grunt.registerTask ('build', ['clean', 'concat', 'cssmin', 'uglify', 'copy', 'replace']);

};