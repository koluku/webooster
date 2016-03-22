var browserSync = require('browser-sync').create();
var gulp        = require('gulp');
var jade        = require('gulp-jade');
var notify      = require('gulp-notify');
var plumber     = require('gulp-plumber');
var pleeease    = require('gulp-pleeease');
var sass        = require('gulp-sass');
var sourcemaps  = require('gulp-sourcemaps');

paths = {
  jade: ['./jade/'],
  scss: ['./scss/']
};

gulp.task('browser-sync', function() {
   browserSync.init({
     server: {
       baseDir: './'
     }
   });
});
gulp.task('jade', function() {
  gulp.src([paths.jade + '**/*.jade', '!' + paths.jade + '**/_*.jade'])
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream());
});
gulp.task('sass', function() {
  gulp.src(paths.scss + '**/*.scss')
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(sourcemaps.init())
    .pipe(pleeease({
      browsers: ['last 2 versions'],
      minifier: false
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['jade','sass','browser-sync'], function() {
  gulp.watch([paths.jade + '**/*.jade'], ['jade']);
  gulp.watch([paths.scss + '**/*.scss'], ['sass']);
});
