module.exports = function(grunt) {

  	// Project configuration.
  	grunt.initConfig({
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
		  	releaseFiles: [ './build/release/*.wav','./build/release/*.scss','./build/release/*.DS_STORE', './build/release/www/assets/images/deviceAssets/', './build/release/www/images/coverPlaceholder_orig.png']
		},
		cssmin: {
			minify: {
			    src: './release/www/style/main.css',
			    dest: './release/www/style/main.min.css'
			}
		}	
	});

  	if ( !process.env.TRAVIS_BUILD_NUMBER ) {
  		console.log("we are not using travis");
  		var keys = require('./keys.json');
  		process.env['AWSAccessKeyId'] = keys.AWSAccessKeyId;
  		process.env['AWSSecretKey'] = keys.AWSSecretKey;
	} else {
		console.log("we ARE using travis");
	}
  
  
  	grunt.config(
		'aws_s3', {
	  	options: {
	    	//process.env.BUILD_DIR
	    	//accessKeyId: '<%= keys.AWSAccessKeyId %>', // Use the variables
	    	//secretAccessKey: '<%= keys.AWSSecretKey %>' // You can also use env variables
	    	accessKeyId: process.env.AWSAccessKeyId, // Use the variables
	    	secretAccessKey: process.env.AWSSecretKey // You can also use env variables
	    },
	  	dev: {
	    	options: {
	      		bucket: 'dev.tonenotone.com',
	      		differential: true // Only uploads the files that have changed
	    	},
	    	files: [
	      		{expand: true, cwd: './build/release/www/', src: ['**'], dest: 'GianaFactory/'},
	    	]
	  	}
	});

  	// Load the plugin that provides the "uglify" task.
  	//grunt.loadNpmTasks('grunt-contrib-uglify');
  	grunt.loadNpmTasks('grunt-contrib-copy');
  	grunt.loadNpmTasks('grunt-contrib-clean');
  	grunt.loadNpmTasks('grunt-contrib-cssmin');
  	grunt.loadNpmTasks('grunt-aws-s3');

  	// Default task(s).
  	//grunt.registerTask('default', ['clean:release','copy:assets', 'cssmin','clean:releaseFiles']);
  	grunt.registerTask('default', ['clean:release','copy:assets','copy:cordova']);
  	grunt.registerTask('deployS3', ['clean:release','copy:assets','clean:releaseFiles','aws_s3:dev']);
};