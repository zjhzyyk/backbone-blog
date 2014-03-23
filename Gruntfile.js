module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
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
      "app/dist/*",
      "app/templates/templates.js"
    ],
    watch: {
      gruntfile: {
        files: ['Gruntfile.js']
      },
      jst: {
        files: ['app/templates/{,*/}*.html'],
        tasks: ['jst']
      },
      compass: {
        files: ['app/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:dev']
      },
      browserify: {
        files: ['app/client/{,*/}*.js'],
        tasks: ['browserify']
      }
    },
    jst: {
      compile: {
        options: {
          prettify: true,
          commonjs: true,
          processName: function(filepath) {
            return filepath.slice("app/templates/".length, -".html".length);
          }
        },
        files: {
          "app/templates/templates.js": ["app/templates/**/*.html"]
        }
      }
    },
    browserify: {
      app: {
        src: ['app/client/**/*.js'],
        dest: 'app/dist/main.js',
        options: {
          // external: ['underscore']
        }
      }
    }
  });
  
  grunt.registerTask('nodemon', function () {
    grunt.util.spawn({
      cmd: 'node',
      args: [
        './node_modules/nodemon/bin/nodemon.js',
        'app/server/server.js',
        '--ignore "node_modules/**"',
        'NODE_ENV=development'
      ],
      opts: {
        stdio: 'inherit'
      }
    }, function () {
      grunt.fail.fatal(new Error("nodemon quit"));
    });
  });

  // Default task(s).
  grunt.registerTask('default', [
    'clean',
    'compass:dev',
    'jst',
    'browserify',
    'nodemon',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'compass:dist',
    'jst',
    'browserify'
  ]);
};