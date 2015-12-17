'use strict';

const async = require('async');

const clean = require('./tasks/clean.js');
const styles = require('./tasks/styles.js');
const scripts = require('./tasks/scripts.js');
const copy = require('./tasks/copy.js');
const images = require('./tasks/images.js');

// Build production files
const startTime = Date.now();

async.series([
  clean.build,
  done => async.parallel([
    cb => async.series([styles.compile, styles.minify], cb),
    cb => async.series([scripts.bundle, scripts.uglify], cb),
    cb => async.series([copy.build, copy.dist, images.optimize], cb)
  ], done)
], () => {
  const diff = Date.now() - startTime;
  console.log('Dist finished in ' + diff + 'ms');
});
