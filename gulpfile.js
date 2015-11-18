'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

// Build dev files, the default task
gulp.task('default', ['clean'], cb =>
  runSequence(
    ['bower', 'bower:dev'],
    ['styles', 'scripts:bundle', 'images', 'copy'],
    cb
  )
);

// Build production files
gulp.task('dist', ['default'], cb =>
  runSequence(
    ['scripts:uglify'],
    cb
  )
);

// Load custom tasks from the `tasks` directory
try {
  require('require-dir')('./tools/tasks');
} catch (err) {
  console.error(err);
}
