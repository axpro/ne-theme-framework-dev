'use strict';

const async = require('async');
const gulp = require('gulp');

let config = global.config;

module.exports = {
  build: copyBuild,
  dist: copyDist
};

// Copy files during build phase
function copyBuild(done) {
  const startTime = Date.now();
  console.log('Copy `build`: started');

  return extractTasks(config.assets, res => {
    const diff = Date.now() - startTime;
    console.log('Copy `build`: done (' + diff + 'ms)');
    return done(res);
  });
}

// Copy files during dist phase
function copyDist(done) {
  const startTime = Date.now();
  console.log('Copy `dist`: started');
  return extractTasks(config.copy.dist, res => {
    const diff = Date.now() - startTime;
    console.log('Copy `dist`: done (' + diff + 'ms)');
    return done(res);
  });
}

function extractTasks(mappings, done) {
  return async.each(mappings, copy, done);
}

function copy(file, done) {
  return gulp.src(file.src, {dot: true})
    .pipe(gulp.dest(file.dest))
    .on('end', done);
}
