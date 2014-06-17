module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    //pkg: grunt.file.readJSON('package.json'),
    copy: {
	  assets: {
	    src: [
	    	'./index.html',
	    	'./images/**',
	    	'./deps/**',
	    	'./style/**',
	    	'./app/**'
	    ],
	    dest: './build/release/www/',
	  },
	  cordova: {
	    cwd: './build/release/www/',
	    src: '**',
	    dest: './cordova/www/'
	  }
	},
	clean: {
	  release: [ './build/release/'],
	  releaseFiles: [ './release/*.wav','./release/*.scss','./release/*.DS_STORE', './release/www/assets/images/deviceAssets/', './release/www/build/grid.js']
	},
	cssmin: {
		minify: {
		    src: './release/www/style/main.css',
		    dest: './release/www/style/main.min.css'
		}
	}

  });

  // Load the plugin that provides the "uglify" task.
  //grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task(s).
  //grunt.registerTask('default', ['clean:release','copy:assets', 'cssmin','clean:releaseFiles']);
  grunt.registerTask('default', ['clean:release','copy:assets','copy:cordova']);
  
};

// cordova create ./cordova com.tonenotone.gianafactorystaging "Giana Factory"
// 967572