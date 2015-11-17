'use strict';

import gulp from 'gulp';
import runSequence from 'run-sequence';

// Build production files, the default task
gulp.task('default', ['clean'], cb =>
  runSequence(
    ['bower', 'bower:dev'],
    ['styles', 'scripts:babel', 'images', 'copy'],
    'scripts:browserify',
    cb
  )
);

// Load custom tasks from the `tasks` directory
try {
  require('require-dir')('./tools/tasks', {recurse: true});
} catch (err) {
  console.error(err);
}
