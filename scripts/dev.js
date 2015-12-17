'use strict';

const async = require('async');

const clean = require('./tasks/clean.js');
const styles = require('./tasks/styles.js');
const scripts = require('./tasks/scripts.js');
const copy = require('./tasks/copy.js');
const styleguide = require('./tasks/styleguide.js');

// Build dev files, the default task
const startTime = Date.now();

async.series([
  clean.build,
  done => async.parallel([
    styles.compile,
    scripts.bundle,
    copy.build
  ], done),
  styleguide.generate,
  styleguide.applyStyles,
  done => async.parallel([styleguide.open, styleguide.watch], done)
], () => {
  const diff = Date.now() - startTime;
  console.log('Build finished in ' + diff + 'ms');
});
