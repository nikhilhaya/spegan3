var gulp = require('gulp'),
	gutil = require('gulp-util'),
	nodemon = require('gulp-nodemon'),
	uglify = require('gulp-uglify'),	// minification
	concat = require('gulp-concat'),	// concats files into one
	coffee = require('gulp-coffee'),	// converts coffeescripts to js files
	jshint = require('gulp-jshint'),	// provides error report in console
	changed = require('gulp-changed'),
	plumber = require('gulp-plumber'),	// lets gulp run even after errors might stop it running
	sourcemaps = require('gulp-sourcemaps'),
	imagemin = require('gulp-imagemin'),
	minifyCSS = require('gulp-minify-css'),
	sass = require('gulp-sass'),
	less = require('gulp-less'),
	es = require('event-stream'),		// merges sources in memory
	browserSync = require('browser-sync').create();

// npm set registry http://registry.npmjs.org/

// doesnt require file name to be provided in cli
gulp.task('default', ['browser-sync'], function(){
	return gutil.log('Gulp is running ..');
});

gulp.task('start', function () {
  	var stream = nodemon({
    				script: 'server.js', 
    				ext: 'js html', 
    				env: { 'NODE_ENV': 'development' },
    				ignore: [
            			'node_modules/',
            			'bower_components/',
            			'coverage/'
            			 ],
    				// tasks: ['jshint']
    			});
  		
  		stream
      		// .on('start', function () {
        // 		console.log('restarted!');
      		// })
      		.on('crash', function() {
        		console.error('Application has crashed!\n');
        
        stream.emit('restart', 10);	// restart the server in 10 seconds 
    });
});

gulp.task('browser-sync', function() {
	browserSync.init(null, {
		proxy: "http://localhost:3000",
        files: ["spegan/**/*.*"],
        // browser: "google chrome",
        port: 3000,
	});
});

// gulp.task('browser-sync2', ['start'], function() {
gulp.task('browser-sync2', function() {
	browserSync.init({
		server: {
	  		baseDir: 'spegan' },
	});
});

gulp.task('jshint', function(){
	return gulp.src('./index.js')
			.pipe(jshint())
			.pipe(jshint.reporter('jshint-stylish'))
			.pipe(gulp.dest('dist/'));
});

gulp.task('changed', function(){
    return gulp.src('./index.js')
        	.pipe(changed('dist'))
        	.pipe(plumber())
        	// .pipe(ngAnnotate())			// ngAnnotate will only get the files that changed since the last time it was run 
        	.pipe(gulp.dest('dist'));
});

gulp.task('watch', ['browserSync', 'jshint', 'sass', 'minifyCSS'], function(){
	// gulp.watch('./index.js', [changed]);
	gulp.watch('./index.js', ['jshint']);
	gulp.watch('client/app/stylesheets/scss/*.+(scss|sass)', ['sass']);
	gulp.watch('client/app/stylesheets/css/style.css', ['minifyCSS']); 
	gulp.watch('client/app/views/**/*.html', browserSync.reload); 
  	gulp.watch('client/app/**/*.js', browserSync.reload);
  	// gulp.watch('src/*.{js,coffee}', [scripts]);
});



gulp.task('minifyCSS', function(){
	return gulp.src('client/app/stylesheets/css/style.css')
			.pipe(sourcemaps.init())  // Process the original sources
			.pipe(minifyCSS({keepSpecialComments: true, keepBreaks:true}))
			.pipe(gulp.dest('dist/stylesheets/css/'))
			.pipe(sourcemaps.write()) // Add the map to modified source.
			.pipe(browserSync.reload({
      			stream: true
    		}));
});
gulp.task('sass', function(){
	return gulp.src('client/app/stylesheets/scss/*.+(scss|sass)')
			.pipe(sourcemaps.init())  // Process the original sources
      		.pipe(sass({keepSpecialComments: true, keepBreaks:true}))
    		.pipe(sourcemaps.write()) // Add the map to modified source.
			.pipe(gulp.dest('dist/stylesheets/css/'))
			.pipe(browserSync.reload({
      			stream: true
    		}));
});

gulp.task('imagemin', function(){
	return gulp.src('public/images/*.*')
			.pipe(imagemin({progressive:true, optimizationLevel: 10}))
			.pipe(gulp.dest('dist/images/'));
});

gulp.task('coffee', function(){
	return gulp.src('src/*.coffee')
			.pipe(coffee())
			.pipe(gulp.dest('src'));
});

gulp.task('scripts', ['coffee'], function(){
	return gulp.src('src/*.js')
			.pipe(concat('all.min.js'))
			.pipe(uglify())
			.pipe(gulp.dest('dist'));
});


gulp.task('scriptsUsingES', function(){
	var jsFromCoffeeScript = gulp.src('src/*.js')
			.pipe(coffee());
	var js = gulp.src('src/*.js');

	return es.merge(jsFromCoffeeScript, js)
			.pipe(concat('all.min.js'))
			.pipe(uglify())
			.pipe(gulp.dest('dist'));
});

gulp.task('mocha', function () {
    return gulp.src('./test/testSpec.js')
      // Right there
      // .pipe(istanbul({includeUntested: true}))
      .on('finish', function () {
        gulp.src('./dist/js/test/testMocha.js')
          .pipe(mocha({reporter: 'spec'}))
          .pipe(istanbul.writeReports({
            dir: './coverage/UTcoverageFromGulp',
            reporters: [ 'lcov' ],
            reportOpts: { dir: './coverage/UTcoverageFromGulp'}
          }));
      });
  });

// gulp.task('nodemon', function (cb) {
	
// 	var started = false;
	
// 	return nodemon({
// 		script: 'server.js'
// 	}).on('start', function () {
// 		if (!started) {
// 			cb();
// 			started = true; 
// 		} 
// 	});
// });