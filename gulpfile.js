/**
 * Created by kurpav on 2/14/16.
 */
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

// ... variables
var autoprefixerOptions = {
	browsers: ['last 2 versions']
};

var sassOptions = {
	errLogToConsole: true,
	outputStyle: 'expanded'
};

var inputStyles = './app/src/sass/**/*.sass';
var outputStyles = './app/src/css';
var inputJs = './app/src/js/**/*.js';

gulp.task('sass', function () {
	return gulp
		.src(inputStyles)
		.pipe(sourcemaps.init())
		.pipe(sass(sassOptions).on('error', sass.logError))
		.pipe(sourcemaps.write())
		//.pipe(autoprefixer(autoprefixerOptions))
		.pipe(gulp.dest(outputStyles))
		.pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function () {

	browserSync.init({
		server: './'
	});

	gulp.watch(inputStyles, ['sass']);
	gulp.watch(inputJs).on('change', browserSync.reload);
	gulp.watch('*.html').on('change', browserSync.reload);
});

gulp.task('default', ['serve']);