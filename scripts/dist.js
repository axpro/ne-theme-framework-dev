#!/usr/bin/env node

'use strict';

const startTime = Date.now();

const program = require('commander');
const async = require('async');

program
  .parse(process.argv);

// Array of tasks
const tasks = [];

// Load config
global.config = require('./tasks/config.js')('prod');

const styles = require('./tasks/styles');
const scripts = require('./tasks/scripts');
const copy = require('./tasks/copy');
const images = require('./tasks/images');
const clean = require('./tasks/clean.js');

tasks.push(clean.build);

tasks.push(done => async.parallel([
  styles.compile,
  scripts.bundle,
  copy.build
], done));

tasks.push(images.optimize);

// Concat styles & scripts, minify, compress images, move fonts
tasks.push(done => async.parallel([
  styles.dist,
  scripts.dist
], done));

// Run tasks
async.series(tasks, () => {
  const diff = Date.now() - startTime;
  console.log(`Build finished in ${diff}ms`);
  console.log('Everything\'s available in `dist` directory!');
});
