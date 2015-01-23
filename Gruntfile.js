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
  		}
  });
  
   // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');

 
  // Default task(s).
  grunt.registerTask('default', ['uglify','qunit:all']);
  
 }