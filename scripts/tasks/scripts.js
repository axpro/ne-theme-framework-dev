'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const babel = require('rollup-plugin-babel');
const path = require('path');
const fs = require('fs');

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
  const resolvedFile = `${importee.replace(/\.js$/, '')}.js`;

  if (isFile(path.resolve(resolvedFile))) {
    // Absolute
    return path.resolve(resolvedFile);
  } else if (isFile(path.resolve(path.dirname(importer), resolvedFile))) {
    // Relative to importer
    return path.resolve(path.dirname(importer), resolvedFile);
  } else if (isFile(path.resolve(__dirname, '../../bower_components', resolvedFile))) {
    // Relative to bower_components
    return path.resolve(__dirname, '../../bower_components', resolvedFile);
  }

  if (path.basename(resolvedFile) !== 'index.js') {
    return resolver(path.join(importee, 'index.js'), importer);
  }

  throw new Error(`File ${importee} not found`);
}

// Concatenate and minify JavaScript. Transpiles ES2015 code to ES5.
// See https://babeljs.io/docs/usage/options/ for more informations on Babel options
// Note: "comments: false" is very heavy
function scriptsBundle(done) {
  const startTime = Date.now();
  console.log('Bundle JS: started');
  gulp.src('src/themes/default/scripts/europa.js', { base: 'src/themes/default' })
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
function dist(done) {
  const startTime = Date.now();
  console.log('Uglify JS: started');
  return gulp.src('build/framework/scripts/**/*.js')
    .pipe($.sourcemaps.init({ loadMaps: true }))
    .pipe($.uglify())
    .pipe($.sourcemaps.write('.', { includeContent: true, sourceRoot: '../src/' }))
    .pipe(gulp.dest('dist/scripts'))
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
  dist,
  watch
};
