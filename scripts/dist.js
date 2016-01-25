#!/usr/bin/env node

'use strict';

const startTime = Date.now();

const program = require('commander');
const async = require('async');

program
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
const clean = require('./tasks/clean.js');

tasks.push(clean.build);

tasks.push(done => async.parallel([
  gitbook.prepare,
  gitbook.prepareBase,
  styles.compile,
  scripts.bundle,
  copy.build,
  template.compile
], done));

tasks.push(gitbook.build);

// Concat styles & scripts, minify, compress images, move fonts
tasks.push(done => async.parallel([
  styles.dist
], done));

// Run tasks
async.series(tasks, () => {
  const diff = Date.now() - startTime;
  console.log('Build finished in ' + diff + 'ms');
  console.log('Everything\'s available in `dist` directory!');
});
