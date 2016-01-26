'use strict';

const async = require('async');
const gulp = require('gulp');

const config = global.config;

function copy(file, done) {
  return gulp.src(file.src, { dot: true })
    .pipe(gulp.dest(file.dest))
    .on('end', done);
}

function extractTasks(mappings, done) {
  return async.each(mappings, copy, done);
}

// Copy files during build phase
function copyBuild(done) {
  const startTime = Date.now();
  console.log('Copy `build`: started');

  return extractTasks(config.assets, res => {
    const diff = Date.now() - startTime;
    console.log(`Copy 'build': done (${diff}ms)`);
    return done(res);
  });
}

module.exports = {
  build: copyBuild
};
