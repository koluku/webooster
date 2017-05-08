var browserSync = require('browser-sync').create();
var gulp        = require('gulp');
var ejs         = require('gulp-ejs');
var notify      = require('gulp-notify');
var plumber     = require('gulp-plumber');
var pleeease    = require('gulp-pleeease');
var rimraf      = require('rimraf');
var sass        = require('gulp-sass');

paths = {
  ejs   : './src/ejs/',
  scss  : './src/scss/',
  build : './build/'
};

gulp.task('browser-sync', function() {
   browserSync.init({
     server: {
       baseDir: paths.build
     }
   });
});
gulp.task('clean', function(cb) {
  rimraf(paths.build, cb);
});
gulp.task('ejs', function() {
  gulp.src(paths.ejs + '**/!(_)*.ejs')
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(ejs({},{},{'ext': '.html'}))
    .pipe(gulp.dest(paths.build))
    .pipe(browserSync.stream());
});
gulp.task('sass', function() {
  gulp.src(paths.scss + '**/*.scss')
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(sass())
    .pipe(pleeease({
      browsers: ['last 2 versions'],
      minifier: true
    }))
    .pipe(gulp.dest(paths.build))
    .pipe(browserSync.stream());
});

gulp.task('default', ['clean', 'ejs', 'sass', 'browser-sync'], function() {
  gulp.watch([paths.ejs + '**/*.ejs'], ['ejs']);
  gulp.watch([paths.scss + '**/*.scss'], ['sass']);
});
