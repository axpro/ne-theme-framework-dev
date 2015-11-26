'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

gulp.task('images', images);

// Optimize images
function images() {
  return gulp.src('build/**/*.{jpg,jpeg,gif,png}')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist'));
}
