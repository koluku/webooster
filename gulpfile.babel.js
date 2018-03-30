import autoprefixer from 'gulp-autoprefixer';
const browserSync = require('browser-sync').create();
import cleanCSS from 'gulp-clean-css';
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import pug from 'gulp-pug';
import rimraf from 'rimraf';
import sass from 'gulp-sass';

const paths = {
  src: {
    html: './src/html/**/*.pug',
    css: './src/css/**/*.scss'
  },
  build: './build/'
};

export function browser_sync() {
  browserSync.init({
    server: {
      baseDir: paths.build
    }
  });
};

const build = gulp.parallel(compile_html, compile_css);

export function clean(cb) {
  rimraf(paths.build, cb);
};

export function compile_html() {
  return gulp.src(paths.src.html)
    .pipe(plumber())
    .pipe(pug())
    .pipe(gulp.dest(paths.build))
    .pipe(browserSync.stream());
};

export function compile_css() {
  return gulp.src(paths.src.css)
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.build))
    .pipe(browserSync.stream());
};

export function watch() {
  gulp.watch(paths.src.html, compile_html);
  gulp.watch(paths.src.css, compile_css);
}

export default gulp.series(build, gulp.parallel(browser_sync, watch));
