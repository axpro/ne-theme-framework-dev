'use strict';

const gulp = require('gulp');
const styleguide = require('sc5-styleguide');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const open = require('opn');

const bowerDir = require('path').resolve(process.cwd(), 'bower_components');
const outputPath = 'docs/styleguide';

gulp.task('styleguide:generate', function () {
  return gulp.src('src/core/styles/**/*.scss')
    .pipe(styleguide.generate({
      title: 'Next Europa Styleguide',
      server: true,
      rootPath: outputPath,
      overviewPath: 'docs/styleguide/overview.md'
    }))
    .pipe(gulp.dest(outputPath));
});

gulp.task('styleguide:applystyles', function () {
  return gulp.src('src/core/styles/theme.scss')
    .pipe(sass({
      precision: 10,
      includePaths: [
        bowerDir
      ]
    }).on('error', sass.logError))
    .pipe(styleguide.applyStyles())
    .pipe(gulp.dest(outputPath));
});

gulp.task('styleguide:copyAssets', function () {
  return gulp.src('build/core/images,fonts}/**')
    .pipe(styleguide.applyStyles())
    .pipe(gulp.dest(outputPath));
});

gulp.task('styleguide:build', ['styleguide:copyAssets', 'styleguide:generate', 'styleguide:applystyles']);

gulp.task('styleguide:open', function () {
  return open('http://localhost:3000');
});

gulp.task('styleguide:watch', function () {
  gulp.watch(['src/**/*.scss'], ['styleguide:build']);
});

gulp.task('styleguide', ['default'], function (callback) {
  return runSequence(
    'styleguide:build',
    'styleguide:open',
    'styleguide:watch',
    callback
  );
});
