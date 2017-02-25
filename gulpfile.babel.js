const browserSync = require('browser-sync').create();
const gulp = require('gulp');
const ejs = require('gulp-ejs');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const pleeease = require('gulp-pleeease');
const sass = require('gulp-sass');

const paths = {
  ejs: './src/ejs',
  scss: './src/scss'
};

gulp.task('browser-sync', () => {
   browserSync.init({
     server: {
       baseDir: './src/'
     }
   });
});
gulp.task('ejs:develop', () => {
  gulp.src(['${paths.ejs}/**/!(_)*.ejs'])
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(ejs('',{'ext': '.html'}))
    .pipe(gulp.dest('./src/'))
    .pipe(browserSync.stream());
});
gulp.task('ejs:release', () => {
  gulp.src(['${paths.ejs}/**/!(_)*.ejs'])
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(ejs('',{'ext': '.html'}))
    .pipe(gulp.dest('./build/'));
});
gulp.task('sass:develop', () => {
  gulp.src('${paths.scss}/**/*.scss')
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(sass())
    .pipe(pleeease())
    .pipe(gulp.dest('./src/'))
    .pipe(browserSync.stream());
});
gulp.task('sass:release', () => {
  gulp.src('${paths.scss}/**/*.scss')
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

gulp.task('default', ['ejs:develop','sass:develop','browser-sync'], () => {
  gulp.watch(['${paths.ejs}/**/*.ejs'], ['ejs:develop']);
  gulp.watch(['${paths.scss}/**/*.scss'], ['sass:develop']);
});
gulp.task('release', ['ejs:release','sass:release']);
