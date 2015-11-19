'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

// Build dev files, the default task
gulp.task('default', ['clean:process'], cb =>
  runSequence(
    ['styles:compile', 'scripts:bundle', 'copy:build'],
    cb
  )
);

// Build production files
gulp.task('dist', ['default'], cb =>
  runSequence(
    ['copy:dist', 'scripts:uglify', 'images', 'styles:minify'],
    cb
  )
);

// Load custom tasks from the `tasks` directory
try {
  require('require-dir')('./tools/tasks');
} catch (err) {
  console.error(err);
}