module.exports = function(grunt){
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),

		join: {
			src: 'src',
			dist: 'dist'
		},

		copy: {
			dev: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= join.src %>',
					dest: '<%= join.dist %>',
					src: [
						'**/*.{js,html,ico,png,jpg,jpeg,gif,txt}',
						'.htaccess'
					]
				}]
			},
			images : {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= join.src %>/images',
					dest: '<%= join.dist %>/images',
					src: ['**/*.{ico, png, jpg, jpeg, gif}']	
				}]
			},
			html : {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= join.src %>',
					dest: '<%= join.dist %>',
					src: ['**/*.html']
				}]
			},
			js : {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= join.src %>/scripts',
					dest: '<%= join.dist %>/scripts',
					src: ['**/*.js']
				}]
			},
			prod: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= join.src %>',
					dest: '<%= join.dist %>',
					src: [
						'**/*.{ico,txt}',
						'.htaccess',
					]
				}]	
			}
		},

		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'<%= join.dist %>',
						'!<%= join.dist %>/.git*'
					]
				}]
			},
			images: {
				files: [{
					dot: true,
					src: ['<%= join.dist %>/images/**/*.{ico, png, jpg, jpeg, gif}']
				}]
			},
			html: {
				files: [{
					dot: true,
					src: ['<%= join.dist %>/**/*.html']
				}]
			},
			js: {
				files: [{
					dot: true,
					src: ['<%= join.dist %>/scripts/**/*.js']
				}]
			}
		},

		htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= join.src %>',
                    src: '**/*.html',
                    dest: '<%= join.dist %>'
                }]
            }
        },

		imagemin: {
		   dist: {
		      options: {
		        optimizationLevel: 5
		      },
		      files: [{
			        expand: true,
			        cwd: '<%= join.src %>/images',
			        src: ['**/*.{png,jpg,gif}'],
			        dest: '<%= join.dist %>/images'
		      }]
		   }
		},

		uglify: {
			dist: {
				options: {
					banner: '/*! script.js 1.0.0 | Utkarsh Gupta | MIT Licensed */'
				},
				files : [{
					expand: true,
					cwd: '<%= join.src %>/scripts',
					src: ['**/*.js', '!*.min.js'],
					dest: '<%= join.dist %>/scripts'
				}]
		    }
		},

		sass: {
			dist: {
				files : [{
					expand: true,
					cwd: 'src/styles',
					src: ['**/*.scss'],
					dest: 'dist/styles',
					ext: '.css'
				}]
			}
		},

		cssmin: {
			dist: {
				options: {
					banner: '/*! style.css 1.0.0 | Utkarsh Gupta | MIT Licensed */'
				},
				files: [{
					expand: true,
					cwd: '<%= join.dist %>/styles',
					src: ['**/*.css', '!*.min.css'],
					dest: '<%= join.dist %>/styles'
				}]
			}
		},

		connect: {
            options: {
                port: 5000,
                livereload: 35729,
                hostname: '127.0.0.1',
            },
            livereload: {
                options: {
                    open: true,
                    base: ['<%= join.dist %>'],
                    middleware: function (connect, options) {
                        if (!Array.isArray(options.base)) {
                            options.base = [options.base];
                        }
                        var serveStatic = require('serve-static');
                        var middlewares = [require('connect-livereload')()];
                        options.base.forEach(function(base) {
                            middlewares.push(serveStatic(base));
                        });
                        return middlewares;
                    }
                }
            }
        },    

		watch: {
			scss: {
				files: 'src/styles/**/*.scss',
				tasks : ['sass'],
				options: {
      				livereload: '<%= connect.options.livereload %>',
    			}
			},
			images: {
				files: 'src/images/**/*',
				tasks : ['clean:images','copy:images'],
				options: {
      				livereload: '<%= connect.options.livereload %>',
    			}
			},
			html: {
				files: 'src/**/*.html',
				tasks: ['clean:html','copy:html'],
				options: {
      				livereload: '<%= connect.options.livereload %>',
    			}
			},
			js: {
				files: 'src/scripts/**/*.js',
				tasks: ['clean:js','copy:js'],
				options: {
      				livereload: '<%= connect.options.livereload %>',
    			}
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.registerTask('default',[ "clean:dist", "sass", "copy:dev", "connect:livereload", "watch" ]);
	grunt.registerTask('build', [ "clean:dist", "sass", "cssmin", "uglify", "imagemin", "htmlmin", "copy:prod" ]);
}
