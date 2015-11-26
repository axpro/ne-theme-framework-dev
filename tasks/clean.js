'use strict';

const gulp = require('gulp');
const del = require('del');

gulp.task('clean:process', cleanProcess);

// Clean process directories
function cleanProcess() {
  return del(['build', 'dist'], {dot: true});
}
