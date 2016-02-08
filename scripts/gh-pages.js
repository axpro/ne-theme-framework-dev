#!/usr/bin/env node

'use strict';

const async = require('async');
const gulp = require('gulp');
const del = require('del');
const ghpages = require('gh-pages');

// Array of tasks
const tasks = [];

// Framework version
const version = require('../package.json').version;

function cleanDist(done) {
  return del(['docs/**/*']).then(done());
}
function cleanTmp(done) {
  return del(['.tmp/**/*']).then(done());
}

function prepareAssets(done) {
  return gulp.src(['./build/styleguide/**', './build/framework/**'], { dot: true })
    .pipe(gulp.dest('.tmp/'))
    .on('end', done);
}

function copyLatest(done) {
  return gulp.src(['.tmp/**', './README.md'], { dot: true })
    .pipe(gulp.dest(`./docs/`))
    .on('end', done);
}

function copyRev(done) {
  return gulp.src('.tmp/**', { dot: true })
    .pipe(gulp.dest(`./docs/${version}`))
    .on('end', done);
}

function publish(done) {
  console.log('Start uploading...');
  ghpages.publish('./docs', { add: true }, () => {
    console.log('Upload finished!');
    done();
  });
}

tasks.push(done => async.parallel([
  cleanTmp,
  cleanDist,
], done));
tasks.push(prepareAssets);

tasks.push(done => async.parallel([
  copyLatest,
  copyRev,
], done));

tasks.push(publish);
tasks.push(cleanTmp);

async.series(tasks, () => {
  console.log('GH Pages done');
});
