'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const config = require('../config');
const bowerDir = require('path').resolve(process.cwd(), 'bower_components');

gulp.task('styles:compile', stylesCompile);
gulp.task('styles:minify', stylesMinify);

// Compile and automatically prefix stylesheets
function stylesCompile() {
  return gulp.src(config.styles.entry, {base: './src/'})
    .pipe($.newer('build/styles'))
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      precision: 10,
      includePaths: [
        bowerDir
      ]
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer(config.styles.autoprefixer))
    .pipe($.sourcemaps.write('.', {includeContent: true, sourceRoot: '../src/'}))
    .pipe(gulp.dest('build/styles'));
}

// Minify CSS
function stylesMinify() {
  return gulp.src('build/styles/**/*.css', {base: ''})
    .pipe($.sourcemaps.init({loadMaps: true}))
    .pipe($.if('*.css', $.minifyCss()))
    .pipe($.sourcemaps.write('.', {includeContent: true, sourceRoot: '/src/'}))
    .pipe(gulp.dest('dist/styles'));
}
