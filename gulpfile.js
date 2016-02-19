/**
 * Created by kurpav on 2/14/16.
 */
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var processhtml = require('gulp-processhtml');

// ... variables
var autoprefixerOptions = {
	browsers: ['last 2 versions']
};

var sassOptionsDev = {
	errLogToConsole: true,
	outputStyle: 'expanded'
};

var sassOptions = {
	errLogToConsole: true,
	outputStyle: 'compressed'
};

var inputStyles = './app/src/sass/**/*.sass';
var outputStyles = './app/src/css';
var inputJsDev = './app/src/js/**/*.js';

var inputJs = [
	'./app/src/js/constants/consts.js',
	'./app/src/js/model/task.js',
	'./app/src/js/model/taskList.js',
	'./app/src/js/utils/utils.js',
	'./app/src/js/view/task.js',
	'./app/src/js/view/taskList.js',
	'./app/src/js/index.js'
];
var distJs = './app/dist/js/';
var distCss = './app/dist/css/';
var distHtml = './app/dist/';

gulp.task('sass-dev', function () {
	return gulp
		.src(inputStyles)
		.pipe(sourcemaps.init())
		.pipe(sass(sassOptionsDev).on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(outputStyles))
		.pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass-dev'], function () {

	browserSync.init({
		server: './'
	});

	gulp.watch(inputStyles, ['sass-dev']);
	gulp.watch(inputJsDev).on('change', browserSync.reload);
	gulp.watch('*.html').on('change', browserSync.reload);
});

gulp.task('html', function () {
	return gulp
		.src('./index.html')
		.pipe(processhtml({}))
		.pipe(gulp.dest(distHtml));
});

gulp.task('sass', function () {
	return gulp
		.src(inputStyles)
		.pipe(sass(sassOptions).on('error', sass.logError))
		.pipe(autoprefixer(autoprefixerOptions))
		.pipe(gulp.dest(distCss));
});

gulp.task('compress', function () {
	return gulp
		.src(inputJs)
		.pipe(concat("app.min.js"))
		.pipe(uglify({mangle: true}))
		.pipe(gulp.dest(distJs));
});

gulp.task('default', ['html', 'compress', 'sass']);