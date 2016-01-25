'use strict';

const gitbook = require('gitbook');
const gulp = require('gulp');
const data = require('gulp-data');
const path = require('path');

// Helper
function setAbsolutePath(base) {
  return (match, originalPath) => `styleguide tpl='${path.resolve(base, originalPath)}'`;
}

// Copy Markdown files and replace relative paths with absolute
function prepare(done) {
  const startTime = Date.now();
  console.log('Generate styleguide: started');

  return gulp.src('src/{components,core,vendor,utilities}/**/*.md')
    .pipe(data(file => {
      let content = String(file.contents);
      const absolutePath = path.dirname(file.path);
      content = content.replace(
        /styleguide tpl='(.*)'/g,
        setAbsolutePath(absolutePath)
      );
      file.contents = new Buffer(content);
      return true;
    }))
    .pipe(gulp.dest('.tmp'))
    .on('end', res => {
      const diff = Date.now() - startTime;
      console.log(`Generate styleguide: done (${diff}ms)'`);
      return done(res);
    });
}

// Copy Markdown files and replace relative paths with absolute
function prepareBase(done) {
  const startTime = Date.now();
  console.log('Prepare styleguide: started');

  return gulp.src(['scripts/tasks/gitbook/**', 'docs/**'])
    .pipe(gulp.dest('.tmp'))
    .on('end', res => {
      const diff = Date.now() - startTime;
      console.log(`Generate styleguide: done (${diff}ms)`);
      return done(res);
    });
}

// Generate the book
function build(done) {
  const startTime = Date.now();
  console.log('Build styleguide: started');

  const input = '.tmp';
  const output = 'build/styleguide/';
  const book = new gitbook.Book(input, {
    logLevel: gitbook.LOG_LEVELS.INFO,
    config: { output }
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
  gulp.watch('src/{components,core,vendor,utilities}/**/*.{md,scss,html,js}', event => {
    console.log(`File ${path.relative(process.cwd(), event.path)} was ${event.type}`);
    prepare(() => {
      if (global.browserSyncServer && global.browserSyncServer.active === true) {
        global.browserSyncServer.reload('*.html');
      }
      console.log('Waiting for changes...');
    });
  });

  gulp.watch(['scripts/tasks/gitbook/**', 'docs/**'], event => {
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
  prepare,
  prepareBase,
  build,
  watch
};
