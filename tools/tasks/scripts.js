'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const babel = require('rollup-plugin-babel');
const config = require('../config');
const path = require('path');
const fs = require('fs');

gulp.task('scripts:bundle', scriptsBundle);
gulp.task('scripts:uglify', scriptsUglify);

// Concatenate and minify JavaScript. Transpiles ES2015 code to ES5.
// See https://babeljs.io/docs/usage/options/ for more informations on Babel options
// Note: "comments: false" is very heavy
function scriptsBundle() {
  return gulp.src(config.bundlesScriptsFiles, {base: './src/scripts/', read: false})
    .pipe($.newer(config.buildScriptsDir))
    .pipe($.sourcemaps.init())
    .pipe($.rollup({
      sourceMap: true,
      format: 'iife',
      indent: false,
      plugins: [
        {
          resolveId: function (importee, importer) {
            importee = importee.replace(/\.js$/, '') + '.js';
            let resolvedFile = null;

            if (isFile(importee)) {
              // Absolute
              resolvedFile = importee;
            } else if (isFile(path.resolve(path.dirname(importer), importee))) {
              // Relative to importer
              resolvedFile = path.resolve(path.dirname(importer), importee);
            } else if (isFile(path.resolve(process.cwd(), importee))) {
              // Relative to process working directory
              resolvedFile = path.resolve(process.cwd(), importee);
            } else if (isFile(path.resolve(process.cwd(), 'bower_components', importee))) {
              // Relative to bower_components
              resolvedFile = path.resolve(process.cwd(), 'bower_components', importee);
            } else if (isFile(path.resolve(process.cwd(), 'node_modules', importee))) {
              // Relative to node_modules
              resolvedFile = path.resolve(process.cwd(), 'node_modules', importee);
            }
            return resolvedFile;
          }
        },
        babel({
          presets: ['es2015-rollup'],
          compact: true
        })
      ]
    }))
    .pipe($.sourcemaps.write('.', {includeContent: true, sourceRoot: '../../src/scripts/'}))
    .pipe(gulp.dest(config.buildScriptsDir));
}

// UglifyJS
function scriptsUglify() {
  return gulp.src(config.uglifyScriptsFiles, {base: config.buildScriptsDir})
    .pipe($.sourcemaps.init({loadMaps: true}))
    .pipe($.uglify())
    .pipe($.sourcemaps.write('.', {includeContent: true, sourceRoot: '../../src/scripts/'}))
    .pipe(gulp.dest(config.distScriptsDir));
}

function isFile(file) {
  try {
    const stats = fs.statSync(file);
    return stats.isFile();
  } catch (err) {
    return false;
  }
}
