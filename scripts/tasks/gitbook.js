'use strict';

const gitbook = require('gitbook');
const gulp = require('gulp');
const data = require('gulp-data');
const path = require('path');

module.exports = {
  prepare: prepare,
  prepareBase: prepareBase,
  build: build,
  watch: watch
};

// Copy Markdown files and replace relative paths with absolute
function prepare(done) {
  const startTime = Date.now();
  console.log('Generate styleguide: started');

  return gulp.src('src/{components,core,vendor,utilities}/**/*.md')
    .pipe(data(file => {
      let content = String(file.contents);
      let absolutePath = path.dirname(file.path);
      content = content.replace(
        /styleguide tpl='(.*)'/g,
        setAbsolutePath(absolutePath)
      );
      file.contents = new Buffer(content);
      return true;
    }))
    .pipe(gulp.dest('build/_tmp'))
    .on('end', res => {
      const diff = Date.now() - startTime;
      console.log('Generate styleguide: done (' + diff + 'ms)');
      return done(res);
    });
}

// Copy Markdown files and replace relative paths with absolute
function prepareBase(done) {
  const startTime = Date.now();
  console.log('Prepare styleguide: started');

  return gulp.src(['scripts/tasks/gitbook/base/**', 'docs/**'])
    .pipe(gulp.dest('build/_tmp'))
    .on('end', res => {
      const diff = Date.now() - startTime;
      console.log('Generate styleguide: done (' + diff + 'ms)');
      return done(res);
    });
}

// Generate the book
function build(done) {

  const startTime = Date.now();
  console.log('Build styleguide: started');

  var input = 'build/_tmp';
  var output = 'build/_server/';
  var book = new gitbook.Book(input, {
    logLevel: gitbook.LOG_LEVELS.INFO,
    config: {
      output: output
    }
  });

  return book.parse()
    .then(() => {
      return book.generate('website');
    })
    .then(() => {
      const diff = Date.now() - startTime;
      console.log('Build styleguide: done (' + diff + 'ms)');
      return done();
    });
}

function watch() {
  gulp.watch('src/{components,core,vendor,utilities}/**/*.md', event => {
    console.log('File ' + path.relative(process.cwd(), event.path) + ' was ' + event.type);
    prepare(() => {
      if (global.browserSyncServer && global.browserSyncServer.active === true) {
        global.browserSyncServer.reload('*.html');
      }
      console.log('Waiting for changes...');
    });
  });

  gulp.watch(['scripts/tasks/gitbook/base/**', 'docs/**'], event => {
    console.log('File ' + path.relative(process.cwd(), event.path) + ' was ' + event.type);
    prepareBase(() => {
      if (global.browserSyncServer && global.browserSyncServer.active === true) {
        global.browserSyncServer.reload('*.html');
      }
      console.log('Waiting for changes...');
    });
  });
}

/*
 * Helpers
 */
function setAbsolutePath(base) {
  return function(match, originalPath) {
    return 'styleguide tpl=\'' + path.resolve(base, originalPath) + '\'';
  };
}
