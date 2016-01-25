'use strict';

const gulp = require('gulp');
const connect = require('gulp-connect');
const spawn = require('child_process').spawn;
const open = require('opn');

const buildRef = (process.argv.indexOf('--ref') !== -1);

gulp.task('nightmare:test', ['default'], cb => {
  connect.server({
    root: ['build', 'templates'],
    livereload: false,
    port: 8888
  });

  const args = ['test/visual/nightmare.js'];
  if (buildRef) {
    args.push('--ref');
  }

  return spawn('node', args, { stdio: 'inherit' })
    .on('close', code => {
      connect.serverClose();
      return cb(code);
    });
});

// Use nightmare -- --ref to create reference screenshots
gulp.task('nightmare', ['nightmare:test'], () => {
  if (buildRef) {
    console.log('Reference created.');
    return 0;
  }

  // Build site

  // Start server
  connect.server({
    root: ['build', 'templates'],
    livereload: false,
    port: 8080
  });

  // Open the browser
  open('http://localhost:8080');
});
