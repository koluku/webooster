var browserSync = require('browser-sync').create();
var gulp = require('gulp');
var ejs = require('gulp-ejs');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var pleeease = require('gulp-pleeease');
var sass = require('gulp-sass');

var paths = {
  ejs: './src/ejs/',
  scss: './src/scss/'
};

gulp.task('browser-sync', function() {
   browserSync.init({
     server: {
       baseDir: './src/'
     }
   });
});
gulp.task('ejs:develop', function() {
  gulp.src([paths.ejs + '**/!(_)*.ejs'])
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(ejs('',{'ext': '.html'}))
    .pipe(gulp.dest('./src/'))
    .pipe(browserSync.stream());
});
gulp.task('ejs:release', function() {
  gulp.src([paths.ejs + '**/!(_)*.ejs'])
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(ejs('',{'ext': '.html'}))
    .pipe(gulp.dest('./build/'));
});
gulp.task('sass:develop', function() {
  gulp.src(paths.scss + '**/*.scss')
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(sass())
    .pipe(pleeease())
    .pipe(gulp.dest('./src/'))
    .pipe(browserSync.stream());
});
gulp.task('sass:release', function() {
  gulp.src(paths.scss + '**/*.scss')
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(sass())
    .pipe(pleeease({
      browsers: ['last 2 versions'],
      minifier: true
    }))
    .pipe(gulp.dest('./build/'));
});

gulp.task('default', ['ejs:develop','sass:develop','browser-sync'], function() {
  gulp.watch([paths.ejs + '**/*.ejs'], ['ejs:develop']);
  gulp.watch([paths.scss + '**/*.scss'], ['sass:develop']);
});
gulp.task('release', ['ejs:release','sass:release']);
