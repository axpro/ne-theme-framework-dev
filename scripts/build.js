'use strict';

const async = require('async');

const clean = require('./tasks/clean.js');
const styles = require('./tasks/styles.js');
const scripts = require('./tasks/scripts.js');
const copy = require('./tasks/copy.js');

// Build dev files, the default task
const startTime = Date.now();
let tasks = [];

if (process.argv[2] === '--clean' || process.argv[2] === '-c') {
  tasks.push(clean.build);
}

tasks.push(done => async.parallel([
  styles.compile,
  scripts.bundle,
  copy.build
], done));

async.series(tasks, () => {
  const diff = Date.now() - startTime;
  console.log('Build finished in ' + diff + 'ms');
});
