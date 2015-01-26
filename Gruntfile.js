module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %>  eduzol _at _ gmail */\n'
      },
      build: {
      
        		src: 'src/**.js',
        		dest: 'dist/sudoku.min.js'
      
      }
    }, 
   qunit: {
    		all: ['test/*.html']
  		} ,
  		
   sass: {                              // Task
  		    dist: {                            // Target
  		      options: {                       // Target options
  		        style: 'expanded'
  		      },
  		      files: {                         // Dictionary of files
  		    	
  		        'src/main.css': 'src/main.scss',       // 'destination': 'source'
  		      }
  		    }
  		  }

  });
  
   // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-sass');
 
  // Default task(s).
  grunt.registerTask('default', ['uglify','qunit:all', 'sass']);
  
 }