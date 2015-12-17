'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const config = require('../../src/theme/config');
const resolve = require('path').resolve;

const srcDir = resolve(__dirname, '../../src');
const bowerDir = resolve(__dirname, '../../bower_components');

module.exports = {
  compile: stylesCompile,
  minify: stylesMinify
};

// Compile and automatically prefix stylesheets
function stylesCompile(done) {
  const startTime = Date.now();
  console.log('Compile SCSS: started');
  gulp.src(config.styles.entry, {base: './src/'})
    .pipe($.newer('build'))
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      precision: 8,
      includePaths: [
        bowerDir,
        srcDir
      ]
    }).on('error', $.sass.logError))
    // .pipe($.autoprefixer(config.styles.autoprefixer))
    .pipe($.sourcemaps.write('.', {includeContent: true, sourceRoot: '../src/'}))
    .pipe(gulp.dest('build'))
    .on('end', () => {
      const diff = Date.now() - startTime;
      console.log('Compile SCSS: done (' + diff + 'ms)');
      done();
    });
}

// Minify CSS
function stylesMinify(done) {
  const startTime = Date.now();
  console.log('Minify SCSS: started');
  return gulp.src('build/**/*.css', {base: ''})
    .pipe($.sourcemaps.init({loadMaps: true}))
    .pipe($.if('*.css', $.minifyCss()))
    .pipe($.sourcemaps.write('.', {includeContent: true, sourceRoot: '/src/'}))
    .pipe(gulp.dest('dist'))
    .on('end', () => {
      const diff = Date.now() - startTime;
      console.log('Minify SCSS: done (' + diff + 'ms)');
      done();
    });
}
