'use strict';

const async = require('async');
const gulp = require('gulp');
const styleguide = require('sc5-styleguide');
const sass = require('gulp-sass');
const open = require('opn');
const watch = require('chokidar').watch;
const resolve = require('path').resolve;
const notifier = require('node-notifier');

const config = require('../../src/theme/config');
const srcDir = resolve(__dirname, '../../src');
const bowerDir = resolve(__dirname, '../../bower_components');
const outputPath = 'build';

module.exports = {
  open: styleguideOpen,
  generate: styleguideGenerate,
  applyStyles: styleguideApplystyles,
  watch: styleguideWatch
};

function styleguideGenerate(done) {
  return gulp.src('src/**/*.scss', {base: 'src'})
    .pipe(styleguide.generate({
      title: 'Next Europa Styleguide',
      server: true,
      rootPath: outputPath,
      overviewPath: 'docs/styleguide.md'
    }))
    .pipe(gulp.dest(outputPath))
    .on('end', done);
}

function styleguideApplystyles(done) {
  return gulp.src(config.styles.entry, {base: 'src'})
    .pipe(sass({
      precision: 10,
      includePaths: [
        bowerDir,
        srcDir
      ]
    }).on('error', sass.logError))
    .pipe(styleguide.applyStyles())
    .pipe(gulp.dest(outputPath))
    .on('end', done);
}

function styleguideOpen() {
  return open('http://localhost:3000');
}

function styleguideWatch() {
  let watcher = watch('src/**/*.scss', {
    cwd: process.cwd(),
    persistent: true
  });

  watcher.on('change', () => {
    async.series([
      styleguideGenerate,
      styleguideApplystyles
    ], () => {
      console.log('Styles compiled');
      notifier.notify({
        title: 'Styles compiled',
        message: 'We have noticed some changed in your styles and recompiled them.',
        sound: true
      });
    });
  });
}
