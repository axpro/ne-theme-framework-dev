'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

// Optimize images
function optimize(done) {
  const startTime = Date.now();
  console.log('Optimize images: started');
  return gulp.src('dist/images/**/*.{jpg,jpeg,gif,png,svg}')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true,
    })))
    .pipe(gulp.dest('dist/images'))
    .on('end', res => {
      const diff = Date.now() - startTime;
      console.log(`Optimize images: done (${diff}ms)`);
      return done(res);
    });
}

// Optimize sprites
function optimizeSprites(done) {
  const startTime = Date.now();
  console.log('Optimize sprites: started');
  return gulp.src('dist/images/**/*.sprite.{jpg,jpeg,gif,png,svg}')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true,
    })))
    .pipe(gulp.dest('dist/images'))
    .on('end', res => {
      const diff = Date.now() - startTime;
      console.log(`Optimize sprites: done (${diff}ms)`);
      return done(res);
    });
}

module.exports = {
  optimize,
  optimizeSprites,
};
