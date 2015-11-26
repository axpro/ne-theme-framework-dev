'use strict';

const gulp = require('gulp');
const merge = require('merge-stream');
const config = require('../config');

gulp.task('copy:build', copyBuild);
gulp.task('copy:dist', copyDist);

// Copy files during build phase
function copyBuild() {
  return merge(extractTasks(config.copy.build));
}

// Copy files during dist phase
function copyDist() {
  return merge(extractTasks(config.copy.dist));
}

function extractTasks(mappings) {
  let tasks = [];
  mappings.forEach(obj => {
    tasks.push(
      gulp.src(obj.src, {dot: true})
        .pipe(gulp.dest(obj.dest))
    );
  });

  return tasks;
}
