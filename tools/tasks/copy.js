'use strict';

const gulp = require('gulp');
const config = require('../config');

gulp.task('copy:build', copyBuild);
gulp.task('copy:dist', copyDist);

// Copy files during build phase
function copyBuild() {
  return gulp.src(config.copyBuildFiles, {dot: true})
    .pipe(gulp.dest(config.buildDir));
}

// Copy files during dist phase
function copyDist() {
  return gulp.src(config.copyDistFiles, {dot: true})
    .pipe(gulp.dest(config.distDir));
}
