var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var cleanCSS = require('gulp-clean-css');
var gulp = require('gulp');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var pug = require('gulp-pug');
var rimraf = require('rimraf');
var sass = require('gulp-sass');

paths = {
  html: './src/html/',
  css: './src/css/',
  build: './build/'
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

gulp.task('compile-html', function(cb) {
  gulp.src(paths.html + '**/*.pug')
  .pipe(plumber({
    errorHandler: notify.onError('Error: <%= error.message %>')
  }))
  .pipe(pug())
  .pipe(gulp.dest(paths.build))
  .pipe(browserSync.stream());
});

gulp.task('compile-css', function() {
  gulp.src(paths.css + '**/*.scss')
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.build))
    .pipe(browserSync.stream());
});

gulp.task('default', ['clean', 'compile-html', 'compile-css', 'browser-sync'], function() {
  gulp.watch([paths.ejs + '**/*.pug'], ['compile-html']);
  gulp.watch([paths.scss + '**/*.scss'], ['compile-css']);
});
