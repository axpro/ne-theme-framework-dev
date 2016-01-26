'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const babel = require('rollup-plugin-babel');
const path = require('path');
const fs = require('fs');

const config = global.config;

// Helpers
function isFile(file) {
  try {
    const stats = fs.statSync(file);
    return stats.isFile();
  } catch (err) {
    return false;
  }
}

function resolver(importee, importer) {
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
  } else if (isFile(path.resolve(process.cwd(), 'src', importee))) {
    // Relative to src
    resolvedFile = path.resolve(process.cwd(), 'src', importee);
  } else if (isFile(path.resolve(process.cwd(), importee))) {
    // Relative to bower_components
    resolvedFile = path.resolve(process.cwd(), importee);
  }

  return resolvedFile;
}

// Concatenate and minify JavaScript. Transpiles ES2015 code to ES5.
// See https://babeljs.io/docs/usage/options/ for more informations on Babel options
// Note: "comments: false" is very heavy
function scriptsBundle(done) {
  const startTime = Date.now();
  console.log('Bundle JS: started');
  gulp.src(config.scripts, { read: false, base: 'src' })
    .pipe($.newer('build/framework'))
    .pipe($.sourcemaps.init())
    .pipe($.rollup({
      sourceMap: true,
      format: 'iife',
      indent: false,
      plugins: [
        {
          resolveId: resolver
        },
        babel({
          compact: true
        })
      ]
    }))
    .pipe($.sourcemaps.write('.', { includeContent: true, sourceRoot: '../src/' }))
    .pipe(gulp.dest('build/framework'))
    .on('end', () => {
      const diff = Date.now() - startTime;
      console.log(`Bundle JS: done (${diff}ms)`);
      done();
    });
}

// UglifyJS
function scriptsUglify(done) {
  const startTime = Date.now();
  console.log('Uglify JS: started');
  return gulp.src('build/framework/**/*.js', { base: 'build/framework' })
    .pipe($.sourcemaps.init({ loadMaps: true }))
    .pipe($.uglify())
    .pipe($.sourcemaps.write('.', { includeContent: true, sourceRoot: '../src/' }))
    .pipe(gulp.dest('dist'))
    .on('end', () => {
      const diff = Date.now() - startTime;
      console.log(`Uglify JS: done (${diff}ms)`);
      done();
    });
}

function watch() {
  gulp.watch('./src/**/*.js', event => {
    console.log(`File ${path.relative(process.cwd(), event.path)} was ${event.type}`);
    scriptsBundle(() => console.log('Waiting for changes...'));
  });
}

module.exports = {
  bundle: scriptsBundle,
  uglify: scriptsUglify,
  watch
};
