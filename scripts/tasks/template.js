'use strict';

const nunjucks = require('nunjucks');
const path = require('path');
// const fs = require('fs');
// const mkdirp = require('mkdirp');
const gulp = require('gulp');
const fm = require('front-matter');
const change = require('gulp-change');

// const StyleguideExtension = require('./nunjucks/StyleguideExtension');

module.exports = {
  compile: compile,
  watch: watch
};

const env = new nunjucks.Environment(new nunjucks.FileSystemLoader(), {autoescape: false});

function processTemplate(fileContent, done) {
  let content = fm(fileContent);

  let styles = [];
  if (content.attributes && content.attributes.demo && content.attributes.demo.styles) {
    styles = content.attributes.demo.styles;
  }

  let tpl = env.render(path.resolve(__dirname, './nunjucks/frame.html'), {
    content: content.body,
    styles: styles
  });
  done(null, tpl);
}

function compile(done) {
  const startTime = Date.now();
  console.log('Processing templates: started');
  gulp.src(global.config.templates)
    .pipe(change(processTemplate))
    .pipe(gulp.dest('build/templates'))
    .on('end', () => {
      const diff = Date.now() - startTime;
      console.log('Processing templates: done (' + diff + 'ms)');
      done();
    });
}

function watch() {
  gulp.watch('./src/**/*.html', event => {
    console.log('File ' + path.relative(process.cwd(), event.path) + ' was ' + event.type);
    compile(() => {
      if (global.browserSyncServer && global.browserSyncServer.active === true) {
        global.browserSyncServer.reload('*.html');
      }
      console.log('Waiting for changes...');
    });
  });
}
