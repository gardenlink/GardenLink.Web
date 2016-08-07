module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        stringreplace: {
            inline: {
                files: {
                  'views/': 'views/**',
                },
                options: {
                  replacements: [
                    // place files inline example
                    {
                      pattern:  'http://gardenlink.cl:9000/api/',
                      replacement: 'http://localhost:9000/api/'
                    }
                  ]
                }
              }
        },
        bower: {
   		 install: {
       		//just run 'grunt bower:install' and you'll see files from your Bower packages in lib directory
       		options: {
		        targetDir: './public/lib/js',
		        //layout: 'byType',
		        install: true,
		        verbose: true,
		        cleanTargetDir: false,
		        cleanBowerDir: false,
		        bowerOptions: {}
		      }
    	  }
  		},
        concat: {
            css: {
                src: [
                    'lib/css/thirdparty/*.css',
                    'lib/css/freeboard/styles.css'
                ],
                dest: 'css/freeboard.css'
            },
            thirdparty : {
                src : [
                    [
                        'lib/js/thirdparty/head.js',
                        'lib/js/thirdparty/jquery.js',
                        'lib/js/thirdparty/jquery-ui.js',
                        'lib/js/thirdparty/knockout.js',
                        'lib/js/thirdparty/underscore.js',
                        'lib/js/thirdparty/jquery.gridster.js',
                        'lib/js/thirdparty/jquery.caret.js',
						'lib/js/thirdparty/jquery.xdomainrequest.js',
                        'lib/js/thirdparty/codemirror.js',
                    ]
                ],
                dest : 'js/freeboard.thirdparty.js'
            },
			fb : {
				src : [
					'lib/js/freeboard/DatasourceModel.js',
					'lib/js/freeboard/DeveloperConsole.js',
					'lib/js/freeboard/DialogBox.js',
					'lib/js/freeboard/FreeboardModel.js',
					'lib/js/freeboard/FreeboardUI.js',
					'lib/js/freeboard/JSEditor.js',
					'lib/js/freeboard/PaneModel.js',
					'lib/js/freeboard/PluginEditor.js',
					'lib/js/freeboard/ValueEditor.js',
					'lib/js/freeboard/WidgetModel.js',
					'lib/js/freeboard/freeboard.js',
				],
				dest : 'js/freeboard.js'
			},
            plugins : {
                src : [
                    'plugins/freeboard/*.js'
                ],
                dest : 'js/freeboard.plugins.js'
            },
            'fb+plugins' : {
                src : [
                    'js/freeboard.js',
                    'js/freeboard.plugins.js'
                ],
                dest : 'js/freeboard+plugins.js'
            }
        },
        cssmin : {
            css:{
                src: 'css/freeboard.css',
                dest: 'css/freeboard.min.css'
            }
        },
        uglify : {
            fb: {
                files: {
                    'js/freeboard.min.js' : [ 'js/freeboard.js' ]
                }
            },
            plugins: {
                files: {
                    'js/freeboard.plugins.min.js' : [ 'js/freeboard.plugins.js' ]
                }
            },
            thirdparty :{
                options: {
                    mangle : false,
                    beautify : false,
                    compress: true
                },
                files: {
                    'js/freeboard.thirdparty.min.js' : [ 'js/freeboard.thirdparty.js' ]
                }
            },
            'fb+plugins': {
                files: {
                    'js/freeboard+plugins.min.js' : [ 'js/freeboard+plugins.js' ]
                }
            }
        }
      
    });
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-bower-task'); //copio archivos BOWER a la ruta correcta
    //grunt.loadNpmTasks('grunt-contrib-concat');
    //grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks('grunt-contrib-watch');
    //grunt.loadNpmTasks('grunt-contrib-cssmin');

    //grunt.registerTask('default', [ 'concat:css', 'cssmin:css', 'concat:fb', 'concat:thirdparty', 'concat:plugins', 'concat:fb+plugins', 'uglify:fb', 'uglify:plugins', 'uglify:fb+plugins', 'uglify:thirdparty', 'string-replace:css' ]);
    grunt.registerTask('default', [ 'bower','string-replace-local' ]);
};