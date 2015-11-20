const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const babel = require('rollup-plugin-babel');
const config = require('../config');
const bowerDir = require('path').resolve(process.cwd(), 'bower_components');
const replace = require('rollup-plugin-replace');

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
        replace({
          __BOWER__: bowerDir
        }),
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
