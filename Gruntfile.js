module.exports = function(grunt) {
  // show elapsed time at the end
  // require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);
  // Project configuration.
  grunt.initConfig({
    compass: {                  
      dist: {                   
        options: {              
          sassDir: 'app/styles',
          cssDir: 'app/dist',
          imagesDir: 'app/images',
          // importPath: 'app/bower_components',
          environment: 'production'
        }
      },
      dev: {                    
        options: {
          sassDir: 'app/styles',
          cssDir: 'app/dist',
          // importPath: 'app/bower_components',
          imagesDir: 'app/images'
        }
      }
    },
    clean: [
      "app/dist/*"
    ],
    connect: {
      options: {
        port: 9000,
        hostname: "localhost",
        livereload: 35729
      },
      server: {
        options: {
          base: ['app']
        }
      }
    },
    watch: {
      gruntfile: {
        files: ['Gruntfile.js'],
        options: {
          livereload: true
        }
      },
      jst: {
        files: ['app/templates/{,*/}*.html'],
        tasks: ['jst']
      },
      compass: {
        files: ['app/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:dev'],
      },
      neuter: {
        files: ['app/scripts/{,*/}*.js'],
        tasks: ['neuter']
      },
      livereload: {
        options: {
          livereload: 35729
        },
        files: [
          'app/{,*/}*.html',
          'app/dist/{,*/}*.{js,css}',
          'app/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },
    // neuter: {
    //   application: {
    //     src: 'app/scripts/app.js',
    //     dest: 'app/dist/main.js',
    //   }
    // },
    jst: {
      compile: {
        options: {
          prettify: true,
          processName: function(filepath) {
            return filepath.slice("app/templates/".length, -".html".length);
          }
        },
        files: {
          "app/views/templates.js": ["app/templates/**/*.html"]
        }
      }
    }
  });

  // Default task(s).
  grunt.registerTask('default', [
    'clean',
    'compass:dev',
    'jst',
    // 'neuter',
    'connect:server',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'compass:dist',
    'jst',
    // 'neuter'
  ]);
};