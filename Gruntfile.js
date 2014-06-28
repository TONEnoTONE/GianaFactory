module.exports = function(grunt) {
  	
  	var buildNumber;
  	if ( !process.env.TRAVIS_BUILD_NUMBER ) {
  		console.log("we are not using travis");
  		var keys = require('./keys.json');
  		process.env['AWS_S3_KEY'] = keys.AWS_S3_KEY;
  		process.env['AWS_S3_SECRET'] = keys.AWS_S3_SECRET;
  		buildNumber = 'dev';
	} else {
		console.log("we ARE using travis, yo: " + process.env.AWS_S3_KEY);
		buildNumber = process.env.TRAVIS_BUILD_NUMBER;
	}
  	
  	// Project configuration.
  	grunt.initConfig({
  	  	copy: {
		  	assets: {
		    	src: [
		    		'./index.html',
		    		'./images/**',
		    		'./audio/**',
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
		},
		concat: {
			staging: {
				options: {
		        	// Replace all 'use strict' statements in the code with a single one at the top
		        	process: function(src, filepath) {
		        		// maybe not the best use of the concat lib....
		        		return returnPrettyVersionFile(buildNumber, 'UA-48335391-4');
		        	}
		        },
		      	files: {
		        	'./app/data/Version.js': ['./app/data/Stars.js'] // pointing at Stars.js, but not doing anything with that data. TODO: Don't do it this way.
		      	}
			},
			production: {
				options: {
		        	// Replace all 'use strict' statements in the code with a single one at the top
		        	process: function(src, filepath) {
		        		// maybe not the best use of the concat lib....
		        		return returnPrettyVersionFile('0.1', 'UA-48335391-5');
		        	}
		        },
		      	files: {
		        	'./app/data/Version.js': ['./app/data/Stars.js'] // pointing at Stars.js, but not doing anything with that data. TODO: Don't do it this way.
		      	}
			},
		}
	});

  	grunt.config( 'aws_s3', {
	  	options: {
	    	accessKeyId: process.env.AWS_S3_KEY, // Use the variables
	    	secretAccessKey: process.env.AWS_S3_SECRET // You can also use env variables
	    },
	  	dev: {
	    	options: {
	      		bucket: 'dev.tonenotone.com',
	      		differential: true // Only uploads the files that have changed
	    	},
	    	files: [
	      		{expand: true, cwd: './build/release/www/', src: ['**'], dest: 'GianaFactory/'}
	    	]
	  	}
	});

	grunt.config( 'writeVersion', {

	});

  	// Load the plugin that provides the "uglify" task.
  	//grunt.loadNpmTasks('grunt-contrib-uglify');
  	grunt.loadNpmTasks('grunt-contrib-copy');
  	grunt.loadNpmTasks('grunt-contrib-clean');
  	grunt.loadNpmTasks('grunt-contrib-cssmin');
  	grunt.loadNpmTasks('grunt-contrib-concat');
  	grunt.loadNpmTasks('grunt-aws-s3');

  	// Default task(s).
  	//grunt.registerTask('default', ['clean:release','copy:assets', 'cssmin','clean:releaseFiles']);
  	grunt.registerTask('default', ['clean:release','copy:assets','copy:cordova']);
  	grunt.registerTask('deployS3', ['concat:staging','clean:release','copy:assets','clean:releaseFiles','aws_s3:dev']);

  	function returnPrettyVersionFile( version, googleAnalyticsId ) {
		var versionJs = '\
define({ \n\
	version : "' + version +'", \n\
	googleAnalyticsId : "' + googleAnalyticsId + '" \n\
});';
		return versionJs;
  	}

};