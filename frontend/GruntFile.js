module.exports = function (grunt) {
    'use strict';
      grunt.initConfig({
          
        babel: {
            options: {
                sourceMap: false,
                presets: ["@babel/env", "@babel/react"],
                plugins: ["transform-es2015-modules-amd"]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: './src',
                    src: ['*.js'],
                    dest: './generated',
                    ext: '.js'
                }]
            }
        },

        war: {
            target: {
                options: {
                    war_verbose: true,
                    war_dist_folder: 'build',           // Folder path seperator added at runtime.
                    war_name: 'grunt-magic',            // .war will be appended if omitted
                    webxml_welcome: 'index.html',
                    webxml_display_name: 'Grunt WAR'
                },
                files: [
                    {
                        expand: true,
                        cwd: 'src',
                        src: ['**'],
                        dest: ''
                    }
                ]
            }
        }
      });

      
      grunt.loadNpmTasks('grunt-babel');
      grunt.loadNpmTasks( 'grunt-war' );
      grunt.registerTask('default', ['babel','war']);
    };
