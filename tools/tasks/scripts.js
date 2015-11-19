const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const babel = require('rollup-plugin-babel');
const config = require('../config');

gulp.task('scripts:bundle', scriptsBundle);
gulp.task('scripts:uglify', scriptsUglify);

// Concatenate and minify JavaScript. Transpiles ES2015 code to ES5.
// See https://babeljs.io/docs/usage/options/ for more informations on Babel options
// Note: "comments: false" is very heavy
function scriptsBundle() {
  return gulp.src(config.bundlesScriptsFiles, {read: false})
    .pipe($.newer(config.buildScriptsDir))
    .pipe($.sourcemaps.init())
    .pipe($.rollup({
      sourceMap: true,
      format: 'iife',
      indent: false,
      plugins: [
        babel({
          only: 'src/**',
          presets: ['es2015-rollup'],
          compact: true
        })
      ]
    }))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(config.buildScriptsDir));
}

// UglifyJS
function scriptsUglify() {
  return gulp.src(config.uglifyScriptsFiles)
    .pipe($.uglify())
    .pipe(gulp.dest(config.distScriptsDir));
}
