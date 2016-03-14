#!/usr/bin/env node

'use strict';

const startTime = Date.now();

const program = require('commander');
const async = require('async');

program
  .option('-c, --clean', 'Clean directory before build')
  .option('-s, --server', 'Run a local server')
  .option('-w, --watch', 'Watch for changes')
  .parse(process.argv);

// Array of tasks
const tasks = [];

const styles = require('./tasks/styles');
const scripts = require('./tasks/scripts');
const copy = require('./tasks/copy');
const gitbook = require('./tasks/gitbook');

if (program.clean) {
  const clean = require('./tasks/clean.js');
  tasks.push(clean.build);
}

tasks.push(done => async.parallel([
  gitbook.prepare,
  gitbook.prepareBase,
  styles.compile,
  scripts.bundle,
  scripts.bundleVendors,
  copy.build,
], done));

tasks.push(gitbook.build);

if (program.server) {
  // Lauch server
  tasks.push(require('./tasks/server.js').generate);
}

// Run tasks
async.series(tasks, () => {
  const diff = Date.now() - startTime;
  console.log(`Build finished in ${diff}ms`);

  if (program.watch) {
    // Start watching for changes
    styles.watch();
    gitbook.watch();
    console.log('Now let\'s make some magic!');
    console.log('Files are being watched for changes...');
  }
});
