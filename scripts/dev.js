#!/usr/bin/env node

'use strict';

const startTime = Date.now();

const program = require('commander');
const async = require('async');

program
  .option('-c, --clean', 'Clean directory before build')
  .parse(process.argv);

// Array of tasks
let tasks = [];

// Load config
global.config = require('./tasks/config.js')();

const styles = require('./tasks/styles');
const scripts = require('./tasks/scripts');
const copy = require('./tasks/copy');
const gitbook = require('./tasks/gitbook');
const template = require('./tasks/template');

if (program.clean) {
  const clean = require('./tasks/clean.js');
  tasks.push(clean.build);
}

tasks.push(done => async.parallel([
  gitbook.prepare,
  gitbook.prepareBase,
  styles.compile,
  scripts.bundle,
  copy.build,
  template.compile
], done));

tasks.push(gitbook.build);

// Lauch server, open styleguide and watch for changes
tasks.push(require('./tasks/server.js').generate);

// Run tasks
async.series(tasks, () => {
  const diff = Date.now() - startTime;
  console.log('Build finished and server started in ' + diff + 'ms');
  console.log('Now let\'s make some magic!');

  // Start watching for changes
  styles.watch();
  template.watch();
  gitbook.watch();
});
