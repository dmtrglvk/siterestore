var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var LessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefix({ browsers: ['last 30 versions'] });
var pugInheritance = require('gulp-pug-inheritance');
var jade = require('gulp-pug');
var changed = require('gulp-changed');
var cached = require('gulp-cached');
var gulpif = require('gulp-if');
var filter = require('gulp-filter');
var imagemin = require('gulp-imagemin');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var browserSync = require('browser-sync').create();
var watch = require('gulp-watch');

var reload = browserSync.reload;

gulp.task('imagemin', function() {
	return gulp.src('./src/images/*')
		.pipe(imagemin([
			imagemin.gifsicle({interlaced: true}),
			imagemin.jpegtran({progressive: true}),
			imagemin.optipng({optimizationLevel: 5}),
			imagemin.svgo({
				plugins: [
					{removeViewBox: true},
					{cleanupIDs: true}
				]
			})
		]))
		.pipe(gulp.dest('./web/images'))
		.pipe(reload({stream:true}));
});

gulp.task('copy', function () {
	gulp.src(config.fontsSrc)
		.pipe(gulp.dest('./web/fonts/'));
});

gulp.task('svg', function() {
	function transformSvg($svg, done) {
		// remove all fill attributes
		$svg.find('[fill]').removeAttr('fill');
		done(null, $svg)
	}
	return gulp.src('./src/images/svg/*.svg')
		.pipe(svgmin())
		.pipe(svgstore({
			fileName: 'icons.svg',
			prefix: 'icon-',
			transformSvg: transformSvg
		}))
		.pipe(gulp.dest('./web/images/svg/'))
});

gulp.task('copyFonts', function () {
	gulp.src('./src/fonts/*')
		.pipe(gulp.dest('./web/fonts/'));
});

gulp.task('copyLess', function () {
	gulp.src('./src/less/**/*.less')
		.pipe(gulp.dest('./web/less/'));
});

gulp.task('copyCss', function () {
	gulp.src('./src/css/**/*.css')
		.pipe(gulp.dest('./web/css/'));
});

gulp.task('js', function () {
	gulp.src('./src/js/**/*.js')
		.pipe(gulp.dest('./web/js/'));
});

gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: "./web/",
			index: '/index.html'
		}
	});
});


gulp.task('pug', function() {
	return gulp.src('./src/views/*.pug')
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest('./web/'))
});

gulp.task('less', function () {
	return gulp.src('./src/less/main.less')
		.pipe(less({
			paths: [ path.join(__dirname, 'less', 'includes') ],
			plugins: [autoprefix]
		}))
		.pipe(gulp.dest('./web/css'))
		.pipe(reload({stream:true}));
});

gulp.task('watch', function() {
	gulp.watch('./src/less/**/*.less', ['less']);
	gulp.watch('./src/views/**/*.pug', ['pug']);
	gulp.watch('./src/js/**/*.js', ['js']);
	gulp.watch('./src/images/*.{jpg,png,gif,svg}', ['imagemin']);
});

gulp.task('default', ['pug', 'less', 'svg', 'imagemin', 'copyFonts', 'copyLess', 'copyCss', 'js', 'watch', 'browser-sync']);