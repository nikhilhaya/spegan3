var gulp = require('gulp');
var uglify = require('gulp-uglify');	// minification
var concat = require('gulp-concat');	// concats files into one
var coffee = require('gulp-coffee');	// converts coffeescripts to js files
var jshint = require('gulp-jshint');	// provides error report in console
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');	// lets gulp run even after errors might stop it running
var imagemin = require('gulp-imagemin');
var minifyCSS = require('gulp-minify-css');
var sass = require('gulp-sass');
var less = require('gulp-less');
var es = require('event-stream');		// merges sources in memory
var browsify = require('browser-sync').create();
var reload = browser-sync.reload;

// doesnt require file name to be provided in cli
gulp.task('default', function(){
	console.log("running gulp file ..");
});

gulp.task('jshint', function(){
	return gulp.src('./index.js')
			.pipe(jshint())
			.pipe(jshint.reporter('default'))
			.pipe(gulp.dest('dist'));
});

gulp.task('changed', () => {
    return gulp.src('./index.js')
        	.pipe(changed('dist'))
        	.pipe(plumber())
        	// .pipe(ngAnnotate())			// ngAnnotate will only get the files that changed since the last time it was run 
        	.pipe(gulp.dest('dist'));
});

gulp.task('watch', function(){
	gulp.watch('./index.js', [changed]);
});

gulp.task('imagemin', function(){
	return gulp.src('public/images/*.*')
			.pipe(imagemin({progressive:true, optimizationLevel: 10}))
			.pipe(gulp.dest('dist'))
});

gulp.task('minifyCSS', function(){
	return gulp.src('client/app/stylesheets/css/style.css')
			.pipe(minifyCSS({keepSpecialComments: true, keepBreaks:true}))
			.pipe(gulp.dest('dist'));
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
})


gulp.task('scriptsUsingES', function(){
	var jsFromCoffeeScript = gulp.src('src/*.js')
			.pipe(coffee());
	var js = gulp.src('src/*.js');

	return es.merge(jsFromCoffeeScript, js)
			.pipe(concat('all.min.js'))
			.pipe(uglify())
			.pipe(gulp.dest('dist'));
});

gulp.task('watch2', function(){
	gulp.watch('src/*.{js,coffee}', [scripts]);
});