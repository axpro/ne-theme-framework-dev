'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

// Optimize images
function optimize(done) {
  const startTime = Date.now();
  console.log('Optimize images: started');
  return gulp.src('build/**/*.{jpg,jpeg,gif,png}')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist'))
    .on('end', res => {
      const diff = Date.now() - startTime;
      console.log(`Optimize images: done (${diff}ms)`);
      return done(res);
    });
}

module.exports = {
  optimize
};
