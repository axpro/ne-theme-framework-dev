'use strict';

const path = require('path');
const gitbook = require('gitbook');
const gulp = require('gulp');
const replace = require('gulp-replace');

// Prepare base
function prepareBase(done) {
  const startTime = Date.now();
  console.log('Prepare styleguide (base): started');

  return gulp.src(['docs/**', 'scripts/tasks/gitbook/**'])
    .pipe(replace('../src/', './'))
    .pipe(gulp.dest('.tmp'))
    .on('end', res => {
      const diff = Date.now() - startTime;
      console.log(`Prepare styleguide (base): done (${diff}ms)`);
      return done(res);
    });
}

// Prepare framework documentation
function prepareFramework(done) {
  const startTime = Date.now();
  console.log('Prepare styleguide (framework): started');

  return gulp.src(['src/**/*.md'])
    .pipe(gulp.dest('.tmp'))
    .on('end', res => {
      const diff = Date.now() - startTime;
      console.log(`Prepare styleguide (framework): done (${diff}ms)`);
      return done(res);
    });
}

// Generate the book
function build(done) {
  const startTime = Date.now();
  console.log('Build styleguide: started');

  const input = '.tmp';
  const output = 'build/styleguide';

  const book = new gitbook.Book(input, {
    logLevel: gitbook.LOG_LEVELS.INFO,
    config: { output },
  });

  return book.parse()
    .then(() => book.generate('website'))
    .then(() => {
      const diff = Date.now() - startTime;
      console.log(`Build styleguide: done (${diff}ms)`);
      return done();
    });
}

function watch() {
  gulp.watch('src/**/*.{md,html}', event => {
    console.log(`File ${path.relative(process.cwd(), event.path)} was ${event.type}`);
    prepareFramework(() => {
      if (global.browserSyncServer && global.browserSyncServer.active === true) {
        global.browserSyncServer.reload('*.html');
      }
      console.log('Waiting for changes...');
    });
  });

  gulp.watch(['scripts/tasks/gitbook/**'], event => {
    console.log(`File ${path.relative(process.cwd(), event.path)} was ${event.type}`);
    prepareBase(() => {
      if (global.browserSyncServer && global.browserSyncServer.active === true) {
        global.browserSyncServer.reload('*.html');
      }
      console.log('Waiting for changes...');
    });
  });
}

module.exports = {
  prepareBase,
  prepareFramework,
  build,
  watch,
};
