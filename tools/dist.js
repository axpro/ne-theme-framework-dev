#!/usr/bin/env node

'use strict';

const startTime = Date.now();

const program = require('commander');
const async = require('async');

program.parse(process.argv);

// Array of tasks
const tasks = [];

const styles = require('./tasks/styles');
const scripts = require('./tasks/scripts');
const copy = require('./tasks/copy');
const images = require('./tasks/images');

// Copy assets and optimize images
tasks.push(copy.dist);
tasks.push(images.optimize);

// Concat styles & scripts, minify, compress images, move fonts
tasks.push(done => async.parallel([
  styles.dist,
  scripts.dist,
], done));

// Optimize sprites
tasks.push(images.optimizeSprites);

// Run tasks
async.series(tasks, () => {
  const diff = Date.now() - startTime;
  console.log(`Build finished in ${diff}ms`);
  console.log('Everything\'s available in `dist` directory!');
});
