const gulp = require('gulp');
const del = require('del');
const config = require('../config');

gulp.task('clean:process', cleanProcess);
gulp.task('clean:bower', cleanBower);

// Clean process directories
function cleanProcess() {
  return del([
    config.buildDir,
    config.distDir
  ], {dot: true});
}

// Clean Bower directories
function cleanBower() {
  return () => del([
    config.bowerMainDir,
    config.bowerDevDir
  ], {dot: true});
}
